module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["jest-allure/dist/setup"],
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  rootDir: '../test',
  testRegex: 'spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverage: true,
  coverageReporters: ['text', 'html'],
  coverageDirectory: '../coverage',
  reporters: ["default", "jest-allure"],
};
