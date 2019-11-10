/* eslint-disable @typescript-eslint/no-var-requires */
const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('./tsconfig.json');

// Set baseUrl to ./dist so all customs paths will be resolved from there eg. @app/* => ./dist/app/*
const baseUrl = './dist';

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
