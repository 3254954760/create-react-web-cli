#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'node:fs';
import { downloadRemoteRepo } from './utils/download.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let json = fs.readFileSync(join(__dirname, './package.json'), 'utf-8');
json = JSON.parse(json);
// commander 内部会自动帮你生成一个 --version 命令
program.version(json.version);

//添加create 命令 和 别名crt 以及描述 以及 执行完成之后的动作
program
    .command('create <Project>')
    .alias('crp')
    .description('create a new project')
    .action(project => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'project name',
                    default: project
                }
            ])
            .then(ans => {
                downloadRemoteRepo('master', ans.projectName);
            });
    });
// 在使用 commander 时，定义完命令后必须调用 否则 CLI 不会解析命令行参数，也不会触发 .action()。
program.parse(process.argv);
