import * as inquirer from 'inquirer';
import * as shelljs from 'shelljs';
import fs from 'fs';

import Logger from './logger';
import createComponentFile from './c';
import createComponentTestFile from './ctest';
import createComponentStyledFile from './cstyle';
const cwd = shelljs.pwd();

// create multiple presets for generation, including import state.

async function bootstrap(debug?: boolean) {
  Logger.warning('Checking for', '', Logger.gray('./src/components'));
  const srcdir = shelljs
    .ls('-A', cwd)
    .stdout.split('\n')
    .includes('src');
  if (!srcdir) {
    Logger.error(
      'Did not manage to find a src/ directory, do you want to create one?'
    );
    return;
  }
  const componentdir = shelljs
    .ls('-A', `${cwd}/src`)
    .stdout.split('\n')
    .includes('components');
  if (!componentdir) {
    Logger.error(
      'Did not manage to find a ./src/components/ directory, maybe try creating one.'
    );
    const answer = await inquire('create_componentdir');
    if (!answer) {
      return;
    } else {
      const createdDir = shelljs.mkdir(`${cwd}/src/components`);
      if (createdDir.stderr) {
        Logger.error(
          `Something occured while creating ${Logger.gray(
            `${cwd}/src/components`
          )}.`,
          '-',
          createdDir.stderr
        );
        return;
      }
      Logger.success(
        `Created directory ${Logger.gray(
          `${cwd}/src/components`
        )} successfully.`
      );
    }
  } else {
    Logger.success(
      `Found the ${Logger.gray('./src/components')} directory successfully.`
    );
  }
  return `${cwd}/src/components`;
}

async function main(skipBootstrap: boolean = false) {
  let dir = skipBootstrap ? `${cwd}/src/components` : '';
  if (skipBootstrap === false) {
    dir = await bootstrap();
  }
  if (!dir || dir.length < 1) return;
  const filename = await inquire('filename');
  if (!filename || filename.length < 2) {
    Logger.error('Filename has to have at least 2 characters.');
    main(true);
  } else {
    fileBuilder(filename, dir);
  }
}

function inquire(type: string): Promise<string> {
  switch (type) {
    case 'filename':
      return inquirer
        .prompt([
          {
            type: 'input',
            name: 'filename',
            message: 'Please enter a component name.',
            default: ''
          }
        ])
        .then((answers: { filename: string }) => {
          const { filename } = answers;
          return filename.charAt(0).toUpperCase() + filename.slice(1);
        });
    case 'create_componentdir':
      return inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'answer',
            message: `Do you want to create ${Logger.gray(
              './src/components'
            )} ?`
          }
        ])
        .then((a: { answer: string }) => {
          const { answer } = a;
          return answer;
        });
  }
}

function fileBuilder(filename: string, directory: string) {
  //   const component = createComponentFile(filename);
  //   const componentTest = createComponentTestFile(filename);
  //   const componentStyled = createComponentStyledFile(filename);
  const Files = [
    createComponentFile(filename),
    createComponentTestFile(filename),
    createComponentStyledFile(filename)
  ];
  Logger.warning(
    `Creating ${Logger.gray(filename)} directory in ${Logger.gray(
      './src/components'
    )}.`
  );
  const createdDir = shelljs.mkdir(`${directory}/${filename}`);
  if (createdDir.stderr) {
    Logger.error(
      `Something occured while creating ${Logger.gray(
        `${directory}/${filename}`
      )}.`,
      '-',
      createdDir.stderr
    );
    return;
  }
  Logger.success(
    `Created directory ${Logger.gray(
      `${directory}/${filename}`
    )} successfully.`,
    '-',
    'Creating the component now.'
  );

  const extensionTuple = ['.tsx', '.test.tsx', '.style.ts'];
  Files.forEach((val, index) => {
    fs.writeFile(
      `${directory}/${filename}/${filename}${extensionTuple[index]}`,
      val,
      err => {
        const tuple = ['Component', 'Test', 'Styled'];
        if (err) {
          Logger.error(
            `Something went wrong creating the ${Logger.gray(
              tuple[index]
            )} file.`,
            '-',
            err.message
          );
          return;
        } else {
          Logger.success(
            `Created the ${Logger.gray(tuple[index])} file successfully!`
          );
        }
      }
    );
  });
}
module.exports = main(false);
module.exports.default = module.exports;
