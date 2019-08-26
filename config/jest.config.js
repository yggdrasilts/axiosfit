module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/test/setup.ts',
  globalTeardown: '<rootDir>/test/teardown.ts',
  setupFilesAfterEnv: ["jest-allure/dist/setup"],
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  rootDir: '..',
  testRegex: '.*.spec.ts$',
  testPathIgnorePatterns: ['mockServer'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverage: true,
  coverageReporters: ['text', 'html'],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: ['test/services'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  reporters: ["default", "jest-allure"],
};
