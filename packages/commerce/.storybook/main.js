export default {
    stories: ['../docs/**/*.mdx', '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-designs', '@storybook/addon-a11y'],
    framework: {
        name: '@storybook/preact-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
        defaultName: 'Docs',
    },
    core: {
        disableWhatsNewNotifications: true,
        disableTelemetry: true,
        enableCrashReports: false,
    },
    async viteFinal(config, { configType }) {
        const { mergeConfig, resolveConfig } = await import('vite');

        const override = {
            resolve: {
                dedupe: ['@storybook/blocks', '@storybook/preact'],
            },
            build: {
                reportCompressedSize: false,
                sourcemap: false,
                minify: false,
                modulePreload: { polyfill: false },
            },
        };

        if (configType === 'DEVELOPMENT') {
            const vite = await resolveConfig({ command: 'serve' });
            override.server = {
                proxy: vite.server.proxy,
            };
        } else {
            override.experimental = {
                renderBuiltUrl() {
                    return { relative: true };
                },
            };
        }

        return mergeConfig(config, override);
    },
};
