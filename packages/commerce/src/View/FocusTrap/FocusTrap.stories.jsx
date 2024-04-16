/**
 * @package     BlueAcorn/View
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import FocusTrap from '.';

/* eslint jsx-a11y/no-noninteractive-tabindex: off */
const childrenMapping = {};

export default {
    title: 'View/Focus Trap',
    tags: ['autodocs'],
    component: FocusTrap,
    argTypes: {
        children: {
            control: false,
            description: 'focus trap items',
            mapping: childrenMapping,
        },
        onEscape: {
            description: 'when Escape button is pressed',
            action: 'onEscape',
        },
        className: {
            description: 'focus trap div class',
        },
        initialIndex: {
            description: 'what element should be focused initially',
            control: 'number',
        },
    },
    decorators: [
        (Story) => (
            <div className="focus-trap-test">
                <style>{`.focus-trap-test input { appearance: auto }`}</style>
                <div>
                    <input type="text" placeholder="Text Input" />
                </div>
                <div>
                    <label>
                        <input type="checkbox" />
                        <span>Checkbox</span>
                    </label>
                </div>
                <div style={{ border: '2px solid #f00', padding: '10px' }}>
                    <Story />
                </div>
                <div>
                    <button>Click Me</button>
                </div>
                <div>
                    <a href="/">Clickable Link</a>
                </div>
            </div>
        ),
    ],
    parameters: {
        docs: {
            story: {
                inline: false,
                height: 400,
            },
        },
    },
};

export const Trap = (
    <FocusTrap
        className="test"
        onEscape={() => {
            alert('Exit');
        }}
        initialIndex={3}
    >
        <div>
            <label>
                <input type="checkbox" />
                <span>Checkbox</span>
            </label>
        </div>
        <div>
            <label>
                <input type="radio" name="radio" value="1" />
                <span>Radio Button 1</span>
            </label>
            <label>
                <input type="radio" name="radio" value="2" />
                <span>Radio Button 2</span>
            </label>
        </div>
        <div>
            <button>Click Me</button>
        </div>
        <div>
            <a href="/">Clickable Link</a>
        </div>
        <div>
            <textarea placeholder="Enter text here" />
        </div>
        <div>
            <div contentEditable="true" style="border: 1px solid black; padding: 10px;">
                Editable Content
            </div>
        </div>
        <div>
            <div tabindex="0">Tabindex Div</div>
        </div>
        <div>
            <input type="text" placeholder="Disabled Input" disabled />
            <button disabled>Disabled Button</button>
        </div>
        <div>
            <input type="text" style="display: none;" />
            <div style="visibility: hidden;">Invisible Div</div>
        </div>
    </FocusTrap>
);

childrenMapping.Trap = Trap.props.children;
Trap.args = {
    ...Trap.props,
    children: 'Trap',
};
