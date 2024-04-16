/**
 * @package     BlueAcorn/AemCli
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import CLI from '@adobe/aem-cli/src/cli.js';
import { checkNodeVersion, validateDotEnv } from '@adobe/aem-cli/src/config/config-utils.js';
import { config } from 'dotenv';
import { getOrCreateLogger } from '@adobe/aem-cli/src/log-common.js';
import ViteUpCommand from './up.cmd.js';

config();
(async () => {
    const argv = process.argv.slice(2);
    await checkNodeVersion();
    await validateDotEnv();
    const cli = await new CLI();
    await cli.initCommands();
    cli.withCommandExecutor('up', new ViteUpCommand(getOrCreateLogger(argv)));
    await cli.run(argv);
})();
