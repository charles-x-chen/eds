export default class GithubReporter {
    onInit(ctx) {
        this.ctx = ctx;
    }

    async onFinished(files, errors) {
        for (const file of files) {
            if (file.result.state === 'fail') {
                const { filepath } = file;
                for (const suite of file.tasks) {
                    if (suite.result.state === 'fail') {
                        const { name: suiteName } = suite;
                        for (const task of suite.tasks) {
                            if (task.result.state === 'fail') {
                                const { name: taskName } = task;
                                const message = `::error file=${filepath},title=Vitest problem::${suiteName}: ${taskName}`;
                                this.ctx.logger.log(message);
                            }
                        }
                    }
                }
            }
        }
    }
}
