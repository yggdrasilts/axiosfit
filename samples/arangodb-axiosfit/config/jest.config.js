module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/test/setup.ts',
  globalTeardown: '<rootDir>/test/teardown.ts',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  roots: ['src'],
  testRegex: '.*.spec.ts$',
  testPathIgnorePatterns: ['mockServer'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  coverageReporters: ['text', 'html'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['src/arangodb/services'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 60,
      lines: 60,
      statements: -10,
    },
  },
  reporters: ['default'],
};
