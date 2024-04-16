import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import presetVite from '@blueacorn/preset-vite';

const directory = dirname(fileURLToPath(import.meta.url));
const root = dirname(dirname(directory));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        root,
        base: '',
        plugins: [
            ...presetVite({
                host: 'app.lvs.test',
                target: process.env.COMMERCE_URL || 'https://staging3.lovesac.com/',
                schema: `${directory}/schema/*.graphql`,
                operations: `${directory}/src/**/*.gql`,
            }),
        ],
        resolve: {
            mainFields: ['browser', 'module'],
            dedupe: ['@dropins/tools'],
            extensions: ['.js', '.jsx'],
            alias: {
                '~': `${directory}/src`,
                ttag: fileURLToPath(import.meta.resolve('ttag/dist/mock')),
                'preact-html-converter': 'preact-html-converter/dist/preact-html-converter.browser',
                'react-dom': fileURLToPath(import.meta.resolve('preact/compat')),
                react: fileURLToPath(import.meta.resolve('preact/compat')),
                'preact/jsx-runtime': fileURLToPath(import.meta.resolve('preact/jsx-runtime')),
                'preact/jsx-dev-runtime': fileURLToPath(import.meta.resolve('preact/jsx-dev-runtime')),
                'preact/devtools': fileURLToPath(import.meta.resolve('preact/devtools')),
                'preact/debug': fileURLToPath(import.meta.resolve('preact/debug')),
            },
        },
        build: {
            reportCompressedSize: false,
            modulePreload: { polyfill: false },
            rollupOptions: {
                input: {
                    head: `${root}/head.html`,
                    404: `${root}/404.html`,
                },
                preserveEntrySignatures: 'strict',
            },
        },
        test:
            mode === 'production'
                ? {}
                : {
                      globals: true,
                      environment: 'jsdom',
                      setupFiles: [
                          `${directory}/test/setup.js`,
                          fileURLToPath(import.meta.resolve('fake-indexeddb/auto')),
                      ],
                      css: true,
                  },
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode),
            'process.env.COMMERCE_URL': JSON.stringify(process.env.COMMERCE_URL || '/'),
            'process.env.EDGE_URL': JSON.stringify(process.env.EDGE_URL || '/'),
        },
        experimental: {
            renderBuiltUrl(filename, { hostType }) {
                if (hostType === 'html') {
                    return `/${filename}`;
                }
                return { relative: true };
            },
        },
    };
});
