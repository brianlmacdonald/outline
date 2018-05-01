#!/usr/bin/env node
'use strict';

const chalk = require('chalk')
  , fs = require('fs')
  , { resolve } = require('path')

  , appLink = resolve(__dirname, '..', 'node_modules', 'APP')

  , symlinkError = error =>
    `*******************************************************************
     ${appLink} must point to '..'
     This symlink lets you require('APP/some/path') rather than
     ../../../some/path
     I tried to create it, but got this error:
     ${error.message}
     You might try this:
       rm ${appLink}
     Then run me again.
     ********************************************************************`;

function makeAppSymlink() {
  console.log(`Linking '${appLink}' to '..'`);
  try {
    try { fs.unlinkSync(appLink); } catch (swallowed) { 's'; }
    const linkType = process.platform === 'win32' ? 'junction' : 'dir';
    fs.symlinkSync('..', appLink, linkType);
  } catch (error) {
    console.error(chalk.red(symlinkError(error)));
    process.exit(1);
  }
  console.log(`Ok, created ${appLink}`);
}

function ensureAppSymlink() {
  try {
    const currently = fs.readlinkSync(appLink);
    if (currently !== '..') {
      throw new Error(
        `${appLink} is pointing to '${currently}' rather than '..'`
        );
    }
  } catch (error) {
    makeAppSymlink();
  }
}

if (module === require.main) {
  ensureAppSymlink();
}
