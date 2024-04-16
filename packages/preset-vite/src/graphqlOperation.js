/**
 * @package     BlueAcorn/PresetVite
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { stripIgnoredCharacters } from 'graphql';

export default function graphqlOperationPlugin() {
    return {
        name: 'ba-graphql-operation',
        transform(code, id) {
            if (!id.endsWith('.gql')) {
                return;
            }
            code = code.replace(/^#.*/g, '');
            const str = JSON.stringify(stripIgnoredCharacters(code));
            return `export default ${str};`;
        },
    };
}
