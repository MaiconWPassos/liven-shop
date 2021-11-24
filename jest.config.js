module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.ts', 'src/pages/**/*.ts'],
  coverageReporters: ['lcov', 'text'],
  testEnvironment: "jsdom"
};