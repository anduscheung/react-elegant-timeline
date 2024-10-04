module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // For jest-dom setup
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // For jest to identify css file import
  },
};