import register from 'preact-custom-element';
import init from './init';

const modules = import.meta.glob('./**/register.js', { eager: true });
for (const {
    default: { component, tag, props = null, options = null },
} of Object.values(modules)) {
    register(init(component), tag, props, options);
}
