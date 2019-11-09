/* eslint-disable @typescript-eslint/no-var-requires */
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

// Set baseUrl to ./dist so all customs paths will be resolved from there eg. @app/* => ./dist/app/*
const baseUrl = './dist';

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
