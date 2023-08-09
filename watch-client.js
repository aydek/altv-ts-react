import { watch } from './watch-shared';

watch({
    esbuild: {
        entryPoints: ['./src/core/client/startup.ts'],
        outfile: './resources/core/client/startup.js',
    },
    altvEsbuild: {
        mode: 'client',
    },
});
