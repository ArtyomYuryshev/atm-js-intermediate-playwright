import { Options } from '@wdio/types';
import { browser } from '@wdio/globals';

export const config: Options.Testrunner = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  },
  runner: 'local',
  specs: ['./src/tests/**/**.spec.ts'],
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
  reporters: ['spec', 'allure'],
  framework: 'mocha',
  mochaOpts: {
    timeout: 30000,
  },

  before: function (capabilities, specs) {
    browser.setWindowSize(1280, 720);
    console.log('Initializing browser session');
  },

  after: function (result, capabilities, specs) {
    console.log('Ending browser session');
  },

  async afterTest(_test, _context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
