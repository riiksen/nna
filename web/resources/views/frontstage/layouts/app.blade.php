<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">    
    
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'No chyba stronka hazardowa nie') }} - @yield('title')</title>

    <!-- Fonts -->
    {{-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> --}}

    <!-- Styles -->
    {{-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"> --}}
    <link rel="stylesheet" href="{{ asset('css/fs/app.css') }}">


    {{-- <link rel="apple-touch-icon" href="/favicon.png"> --}}
    {{-- <link rel="icon" href="/favicon.png"> --}}
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
  </head>
  <body>
    <div class="masthead">
      <div class="container">
        <nav class="nav">
          @include('frontstage.layouts._nav')
        </nav>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm">
          @foreach(['danger', 'warning', 'success', 'info'] as $key)
            @if(session()->has($key))
              <div class="alert alert-{{ $key }}">
                <p>{{ session($key) }}</p>
              </div>
            @endif
          @endforeach
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 main">
          @yield('content')
        </div>
      </div>
    </div>

    <!-- Scripts -->
    {{-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> --}}
    {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script> --}}
    {{-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script> --}}
    <script src="{{ asset('js/fs/app.js') }}"></script>
  </body>
</html>
