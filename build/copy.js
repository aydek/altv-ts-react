import fs from 'fs-extra';
import * as glob from 'glob';

const startTime = Date.now();
const files = glob.sync(['src/**/*.!(ts)', 'src-webviews/**/*.toml']);

let filesCopied = 0;
for (let file of files) {
    const filePath = normalizeFilePath(file);

    if (filePath.endsWith('tsconfig.json') || filePath.endsWith('.d.ts')) {
        continue;
    }

    if (filePath.includes('src/')) {
        const finalPath = filePath.replace('src/', 'resources/core/');
        fs.copySync(filePath, finalPath, { overwrite: true });
    }

    if (filePath.includes('src-webviews')) {
        const finalPath = filePath.replace('src-webviews/', 'resources/webviews/');
        fs.copySync(filePath, finalPath, { overwrite: true });
    }

    filesCopied += 1;
}

export function normalizeFilePath(filePath) {
    return filePath.replace(/\\/gm, '/');
}

console.log(`${filesCopied} Files Moved | ${Date.now() - startTime}ms`);
