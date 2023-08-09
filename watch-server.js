import { watch } from './watch-shared';

watch({
    esbuild: {
        platform: 'node',
        entryPoints: ['./src/core/server/startup.ts'],
        outfile: './resources/core/server/startup.js',
    },
    altvEsbuild: {
        mode: 'server',
    },
});
