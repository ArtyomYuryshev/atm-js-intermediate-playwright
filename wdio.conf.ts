import { Options } from '@wdio/types';

export const config: Options.Testrunner = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  },
  runner: 'local',
  specs: ['./src/tests/**/**.tests.ts'],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
    },
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://cloud.google.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  reporters: ['spec'],
  framework: 'mocha',
  mochaOpts: {
    timeout: 30000,
  },

  before: function (capabilities, specs) {
    console.log('Initializing browser session');
  },

  after: function (result, capabilities, specs) {
    console.log('Ending browser session');
  },
};