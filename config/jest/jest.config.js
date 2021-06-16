module.exports = {
  rootDir: '../../',
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    },
  },
  collectCoverageFrom: [`src/**/*.{js,jsx,ts,tsx}`, '!src/**/*.d.ts'],
  modulePathIgnorePatterns: ['node_modules'],
  resolver: 'jest-pnp-resolver',
  setupFiles: ['react-app-polyfill/jsdom', 'jest-useragent-mock', 'jest-localstorage-mock'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
  reporters: ['default'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/assetTransform.js',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^config(.*)$': '<rootDir>/src/config$1',
    '^containers(.*)$': '<rootDir>/src/containers$1',
    '^contexts(.*)$': '<rootDir>/src/contexts$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^queries(.*)$': '<rootDir>/src/queries$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^storybook(.*)$': '<rootDir>/.storybook$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
