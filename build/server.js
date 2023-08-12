import { build } from './shared';

build({
    esbuild: {
        platform: 'node',
        entryPoints: ['src/server/main.ts'],
        outfile: 'resources/core/server.js',
        external: ['mongoose'],
    },
    altvEsbuild: {
        mode: 'server',
        playersReconnect: false,
    },
});
