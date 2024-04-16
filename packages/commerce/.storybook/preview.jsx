/** @type { import('@storybook/preact').Preview } */
import './reset.css';
import App from '../src/App';

const preview = {
    parameters: {
        options: {
            storySort: {
                method: 'alphabetical',
                locales: 'en-US',
            },
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            source: {
                transform: (src) => src.replace(/^\s{4}(\s*<)/gm, '$1'),
            },
        },
    },
    decorators: [
        (Story) => (
            <App>
                <script src="https://share.lovesac.com/core.js" async />
                <Story />
            </App>
        ),
    ],
};

export default preview;
