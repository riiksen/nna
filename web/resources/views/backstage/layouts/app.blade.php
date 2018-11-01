<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags-->
    <!-- Le meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
    <!-- Fontfaces CSS-->
    {{-- <link rel="stylesheet" href="{{ mix('/css/admin.css') }}"> --}}

    <link rel="stylesheet" href="{{ mix('css/backstage.css') }}">

    <link href="css/font-face.css" rel="stylesheet" media="all">

    <!-- Bootstrap CSS-->
    <link href="vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">

    <!-- Vendor CSS-->
    <link href="vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
    <link href="vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all">
    <link href="vendor/wow/animate.css" rel="stylesheet" media="all">
    <link href="vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
    <link href="vendor/slick/slick.css" rel="stylesheet" media="all">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <link href="vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">

    <!-- Main CSS-->
    <link href="css/theme.css" rel="stylesheet" media="all">
    @yield('after-styles')

    <!-- Html5 Shim and Respond.js IE8 support of Html5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>

  <body class="animsition">
    <div class="page-wrapper">
      @include('backstage.layouts._header-mobile')
      @include('backstage.layouts._sidebar')
      <div class="page-container">
        @include('backstage.layouts._header-desktop')
        <div class="main-content">
          @yield('content')
        </div><!-- ./main-content -->
      </div><!-- ./page-container -->
    </div><!-- ./page-wrapper -->

    <!-- Le javascript -->
    @yield('before-scripts')
    <script src="{{ mix('js/backstage.js') }}"></script>
    <!-- Main JS -->
    {{-- <script src="js/main.js"></script> --}}
    @yield('after-scripts')
  </body>
</html>