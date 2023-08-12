import { build } from './shared';

build({
    esbuild: {
        entryPoints: ['src/client/main.ts'],
        outfile: 'resources/core/client.js',
    },
    altvEsbuild: {
        mode: 'client',
        playersReconnect: false,
    },
});
