/**
 * @package     BlueAcorn/AemCli
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import UpCommand from '@adobe/aem-cli/src/up.cmd.js';
import { createServer as createViteServer } from 'vite';

export default class ViteUpCommand extends UpCommand {
    async init() {
        this.withLiveReload(false);

        await super.init();

        const { app } = this.project.server;

        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom',
        });
        app.use(vite.middlewares);
    }

    async verifyUrl(gitUrl, inref) {
        return super.verifyUrl({ ...gitUrl, repo: 'lovesac-build', owner: 'blueacorninc' }, inref);
    }
}
