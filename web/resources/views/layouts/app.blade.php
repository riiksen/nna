<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">    
    
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} - @yield('title')</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Styles -->
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css"  media="screen,projection"/>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
  </head>
  <body>
    {{-- @include('shared.nav') --}}
    <nav role="navigation">
      <div class="nav-wrapper container">
        <a id="logo-container" class="brand-logo" href="#">VGOscam</a>
        <ul class="right-hide-on-med-and-down">
          @guest
            <li><a href="/signin">Sign in with steam</a></li>
          @else
            <li><a href="/logout">Logout</a></li>
          @endguest
        </ul>

        <ul id="nav-mobile" class="sidenav">
          <div class="divider"></div>
            @guest
              <li><a href="/login">Sign in with steam</a></li>
            @else
              <li><a href="/logout">Logout</a></li>
            @endguest
        </ul>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col s3">
          Chat
          {{-- @include('shared.chat') --}}
        </div>
        <div class="col s9">
          @yield('content')
        </div>
      </div>
    </div>
    
    <!-- Scripts -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>
    <script src="{{ asset('js/app.js') }}" defer></script>
  </body>
</html>
