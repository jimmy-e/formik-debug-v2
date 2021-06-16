'use strict';

process.env.NODE_ENV = 'production';

const chalk = require('chalk');
const argv = require('yargs').argv;
const CLIEngine = require('eslint').CLIEngine;
const ALLOW_WARNINGS = argv.allow_warnings || true;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const cli = new CLIEngine({
  useEslintrc: true,
  extensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
  ],
});

const report = cli.executeOnFiles([
  'src',
]);

const {
  results,
  errorCount,
  warningCount,
} = report;

const writeErr = (num, label) => `${num} ${label}${num === 1 ? '' : 's'}`;

const getSeverity = severity => {
  if (severity === 1) {
    return chalk.yellow('warning');
  }
  if (severity === 2) {
    return chalk.red('error');
  }

  return '';
};

const TAB = '  ';
const getMessage = ({
  line,
  column,
  message,
  severity,
  ruleId,
}) => TAB + [
  `${line}:${column}`,
  getSeverity(severity),
  message,
  ruleId,
].join(TAB);

const error = results.filter(result => {
  if (result.errorCount > 0) {
    return true;
  }

  return ALLOW_WARNINGS ? result.warningCount > 0 : false;
}).map(result => {
  return [
    chalk.underline(result.filePath),
    ...result.messages.map(getMessage),
  ].join('\n');
}).join('\n\n');

const color = errorCount > 0 ? chalk.red.bold : chalk.yellow.bold;
let total = '';
if (errorCount > 0 || warningCount > 0) {
  total = color([
    `✖ ${writeErr(errorCount + warningCount, 'problem')}`,
    `${writeErr(errorCount, 'error')} and ${writeErr(warningCount, 'warning')}`,
  ].join('\n'));
}

const msg = [
  error,
  total,
].filter(m => m).join('\n\n') + '\n';
console.log(msg);

if (ALLOW_WARNINGS) {
  if (report.errorCount === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
} else {
  if (report.errorCount === 0 && report.warningCount === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}
