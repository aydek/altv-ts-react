import fs from 'fs-extra';
import * as glob from 'glob';
import path from 'path';
import swc from '@swc/core';
import { normalizeFilePath } from './shared.js';

const SWC_CONFIG = {
    jsc: {
        parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: true,
        },
        transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
        },
        target: 'es2020',
    },
    sourceMaps: false,
};

const startTime = Date.now();
const filesToCompile = glob.sync('./src/core/**/*.ts');

if (fs.existsSync('resources/core')) {
    fs.rmSync('resources/core', { force: true, recursive: true });
}

let compileCount = 0;
for (let i = 0; i < filesToCompile.length; i++) {
    const filePath = normalizeFilePath(filesToCompile[i]);
    const relativePath = path.relative('src/core', filePath);
    const finalPath = path.join('resources/core', relativePath).replace('.ts', '.js');
    const compiled = swc.transformFileSync(filePath, SWC_CONFIG);

    // Calculate the relative path from the source file to the shared folder
    const depth = relativePath.split(path.sep).length - 1;
    const sharedPath = Array(depth).fill('..').join('/');

    // Replace @shared with the calculated relative path
    const modifiedCode = compiled.code.replace(/@shared/g, sharedPath + '/shared');

    fs.outputFileSync(finalPath, modifiedCode, { encoding: 'utf-8' });
    compileCount += 1;
}

console.log(`${compileCount} Files Built | ${Date.now() - startTime}ms`);
