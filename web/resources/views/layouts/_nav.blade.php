@php
  $current_route = Route::currentRouteName();
@endphp

{{-- <<Template>> <a href="{{ route('login') }}" class="nav-item {{ $current_route === '' ? 'active' : NULL }}"></a> --}}

@auth
  <a href="{{ route('logout') }}" class="nav-item">Sign out</a>
  <a href="#" class="nav-item nav-item-auth nav-item-auth-profile">{{ Auth::user()['username'] }}</a>
@else
  <a href="{{ route('login') }}" class="nav-item">Sign in with steam</a>
@endauth
