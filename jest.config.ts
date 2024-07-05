import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/tests'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  transform: { '.+\\.ts$': 'ts-jest' },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  testEnvironment: 'node'
}

export default config;
