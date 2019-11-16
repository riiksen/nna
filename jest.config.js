/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

delete compilerOptions.paths['*'];

const modulePaths = pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' });

module.exports = {
  moduleNameMapper: modulePaths,
  preset: 'ts-jest',
  testEnvironment: 'node',
};
