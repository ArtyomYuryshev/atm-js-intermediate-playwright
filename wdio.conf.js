exports.config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  },

  runner: 'local',

  specs: ['./src/tests/**/**.tests.ts'],
  suites: {
    smoke: ['./src/tests/smoke/**.tests.js'],
  },

  maxInstances: 1,

  capabilities: [
    {
      browserName: 'chrome',
    },
  ],

  logLevel: 'error',

  bail: 0,
  baseUrl: 'https://cloud.google.com',

  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  reporters: ['spec'],
  services: ['chromedriver'],

  framework: 'mocha',
  mochaOpts: {
    timeout: 30000,
  }
};
