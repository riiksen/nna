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
   // TODO:
   .copy('resources/assets/js/backstage/libs/adminlte.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/bootstrap-datepicker.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/bootstrap.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/bootstrap3-wysihtml5.all.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/daterangepicker.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/fastclick.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/jquery-jvectormap-1.2.2.min.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/jquery-jvectormap-world-mill-en.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/jquery-ui.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/jquery.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/jquery.knob.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/jquery.slimscroll.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/jquery.sparkline.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/moment.min.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/morris.js', 'public/js/bs')
   .copy('resources/assets/js/backstage/libs/raphael.js', 'public/js/bs')

   .copy('resources/assets/sass/backstage/libs/AdminLTE.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/libs/bootstrap-datepicker.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/libs/bootstrap.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/libs/bootstrap3-wysihtml5.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/libs/daterangepicker.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/libs/font-awesome.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/libs/ionicons.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/libs/jquery-jvectormap.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/libs/morris.css', 'public/css/bs')
   .copy('resources/assets/sass/backstage/skins/_all-skins.css', 'public/css/bs')


   // .js('resources/assets/js/backstage/app.js', 'public/js/backstage.js')
   .sass('resources/assets/sass/backstage/app.scss', 'public/css/bs/app.css')
   // .version();

// if (mix.config.inDevelpoment) {
//   mix.sourceMaps();
// }
// 
// if (mix.config.inProduction) {
//   mix.minify();
// }