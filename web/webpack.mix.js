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
mix.js('resources/assets/js/app.js', 'public/js/app.js')
   .js('resources/assets/js/socket.js', 'public/js/socket.js')
   .js('resources/assets/js/trade.js', 'public/js/trade.js')

   .sass('resources/assets/sass/app.scss', 'public/css/app.css')
   // Admin assets
   // TODO:
   .copy('resources/assets/js/admin/libs/adminlte.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/bootstrap-datepicker.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/bootstrap.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/bootstrap3-wysihtml5.all.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/daterangepicker.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/fastclick.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/jquery-jvectormap-1.2.2.min.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/jquery-jvectormap-world-mill-en.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/jquery-ui.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/jquery.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/jquery.knob.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/jquery.slimscroll.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/jquery.sparkline.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/moment.min.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/morris.js', 'public/js/admin')
   .copy('resources/assets/js/admin/libs/raphael.js', 'public/js/admin')

   .copy('resources/assets/sass/admin/libs/AdminLTE.css', 'public/css/admin')
   .copy('resources/assets/sass/admin/libs/bootstrap-datepicker.css', 'public/css/admin')
   // .copy('resources/assets/sass/admin/libs/bootstrap.css', 'public/css/admin')
   .copy('resources/assets/sass/admin/libs/bootstrap3-wysihtml5.css', 'public/css/admin')
   .copy('resources/assets/sass/admin/libs/daterangepicker.css', 'public/css/admin')
   // .copy('resources/assets/sass/admin/libs/font-awesome.css', 'public/css/admin')
   // .copy('resources/assets/sass/admin/libs/ionicons.css', 'public/css/admin')
   .copy('resources/assets/sass/admin/libs/jquery-jvectormap.css', 'public/css/admin')
   .copy('resources/assets/sass/admin/libs/morris.css', 'public/css/admin')
   .copy('resources/assets/sass/admin/skins/_all-skins.css', 'public/css/admin')


   // .js('resources/assets/js/admin/app.js', 'public/js/admin.js')
   .sass('resources/assets/sass/admin/app.scss', 'public/css/admin/app.css')
   .version();

if (mix.config.inDevelpoment) {
  mix.sourceMaps();
}

if (mix.config.inProduction) {
  mix.minify();
}
