/**
 * @package     BlueAcorn/PresetEslint
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

module.exports = function (results, context) {
    const lines = [];

    for (const result of results) {
        const { messages, filePath } = result;
        for (const message of messages) {
            const { line, endLine, column, endColumn, severity, message: mgs } = message;
            const title = `ESLint problem`;
            const errorType = severity >= 2 ? 'error' : 'warning';
            const error = `::${errorType} file=${filePath},line=${line},endLine=${endLine},col=${column},endColumn=${endColumn},title=${title}::${mgs}`;
            lines.push(error);
        }
    }

    return lines.join('\n');
};
