import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: '../resources/webviews',
        emptyOutDir: true,
        minify: 'esbuild',
        reportCompressedSize: false,
    },
    resolve: {
        alias: {
            '@events': path.resolve(__dirname, '../src/core/shared/enums/events/webviewEvents'),
        },
    },
});
