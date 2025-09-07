import fs from 'node:fs';
import download from 'download-git-repo';
import ora from 'ora';
const spinner = ora('下载中...');

export const downloadRemoteRepo = (branch, project) => {
    spinner.start();
    return new Promise((resolve, reject) => {
        download(
            `direct:https://github.com/3254954760/create-react-web.git#${branch}`,
            project,
            { clone: true },
            err => {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                resolve();
                spinner.succeed('下载完成');
            }
        );
    });
};
