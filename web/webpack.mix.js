let mix = require('laravel-mix');

// const { mix } = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

   // Frontstage assets
mix.js('resources/assets/js/frontstage/app.js', 'public/js/frontstage.js')
   .sass('resources/assets/sass/frontstage/app.scss', 'public/css/frontstage.css')
   // Backstage assets
   .js('resources/assets/js/backstage/app.js', 'public/js/backstage.js')
   .sass('resources/assets/sass/backstage/app.scss', 'public/css/backstage.css')
   .version();

if (mix.config.inDevelpoment) {
  mix.sourceMaps();
}

if (mix.config.inProduction) {
  mix.minify();
}