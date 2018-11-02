<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags-->
    <!-- Le meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no">
    <meta name="description" content="au theme template">
    <meta name="author" content="Hau Nguyen">
    <meta name="keywords" content="au theme template">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @yield('meta')

    <!-- Title Page-->
    <title>@yield('title', 'No chyba admin panel nie')</title>
    {{-- <title>No chyba panel administracyjny nie</title> --}}

    <!-- Le styles -->
    @yield('before-styles')
    
    <link rel="stylesheet" href="{{ mix('css/bs/app.css') }}">
    <!-- Bootstrap 3.3.7 -->
    {{-- <link rel="stylesheet" href="{{ mix('css/bs/bootstrap.css') }}"> --}}
    <!-- Font Awesome -->
    {{-- <link rel="stylesheet" href="{{ mix('css/bs/font-awesome.css') }}"> --}}
    <!-- Ionicons -->
    {{-- <link rel="stylesheet" href="{{ mix('css/bs/ionicons.css') }}"> --}}
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ mix('css/bs/AdminLTE.css') }}">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="{{ mix('css/bs/_all-skins.css') }}">
    <!-- Morris chart -->
    <link rel="stylesheet" href="{{ mix('css/bs/morris.css') }}">
    <!-- jvectormap -->
    <link rel="stylesheet" href="{{ mix('css/bs/jquery-jvectormap.css') }}">
    <!-- Date Picker -->
    <link rel="stylesheet" href="{{ mix('css/bs/bootstrap-datepicker.css') }}">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="{{ mix('css/bs/daterangepicker.css') }}">
    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="{{ mix('css/bs/bootstrap3-wysihtml5.css') }}">

    <!-- Main CSS-->
    {{-- <link href="css/theme.css" rel="stylesheet" media="all"> --}}
    @yield('after-styles')

    <!-- Html5 Shim and Respond.js IE8 support of Html5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

    <!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  </head>

  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
      
      @include('backstage.layouts._header')

      <!-- =============================================== -->

      @include('backstage.layouts._sidebar')

      <!-- =============================================== -->

      @yield('content')

      <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.4.0
        </div>
        <strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights
        reserved.
      </footer>

      @include('backstage.layouts._control-sidebar')
    </div>
    <!-- ./wrapper -->

    <!-- Le javascript -->
    @yield('before-scripts')
    {{-- <script src="{{ mix('js/bs.js') }}"></script> --}}
    <script src="{{ mix('js/bs/jquery.js') }}"></script>
    <script src="{{ mix('js/bs/bootstrap.js') }}"></script>
    <script src="{{ mix('js/bs/jquery-ui.js') }}"></script>
    <script src="{{ mix('js/bs/adminlte.js') }}"></script>
    <script src="{{ mix('js/bs/bootstrap-datepicker.js') }}"></script>
    <script src="{{ mix('js/bs/bootstrap3-wysihtml5.all.js') }}"></script>
    <script src="{{ mix('js/bs/daterangepicker.js') }}"></script>
    <script src="{{ mix('js/bs/fastclick.js') }}"></script>
    <script src="{{ mix('js/bs/jquery-jvectormap-1.2.2.min.js') }}"></script>
    <script src="{{ mix('js/bs/jquery-jvectormap-world-mill-en.js') }}"></script>
    <script src="{{ mix('js/bs/jquery.knob.js') }}"></script>
    <script src="{{ mix('js/bs/jquery.slimscroll.js') }}"></script>
    <script src="{{ mix('js/bs/jquery.sparkline.js') }}"></script>
    <script src="{{ mix('js/bs/moment.min.js') }}"></script>
    <script src="{{ mix('js/bs/morris.js') }}"></script>
    <script src="{{ mix('js/bs/raphael.js') }}"></script>

    <!-- Main JS -->
    {{-- <script src="js/main.js"></script> --}}
    @yield('after-scripts')
  </body>
</html>