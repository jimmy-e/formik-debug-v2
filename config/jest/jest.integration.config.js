const config = require('./jest.config');
const path = require('path');

delete config.testEnvironment;

module.exports = Object.assign({}, config, {
  testMatch: [
    `<rootDir>/test/tests/**/*.{js,jsx,ts,tsx}`,
  ],
  transform: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/assetTransform.js',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  globalSetup: '<rootDir>/config/jest/integration/setup.js',
  globalTeardown: '<rootDir>/config/jest/integration/teardown.js',
  testEnvironment: '<rootDir>/config/jest/integration/environment.js',
});
