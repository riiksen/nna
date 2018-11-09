<nav role="navigation">
  <div class="nav-wrapper container">
    <a id="logo-container" class="brand-logo" href="#">VGOscam</a>
    <ul class="right-hide-on-med-and-down">
      @auth
        <li><a href="/logout">Logout</a></li>
      @endauth
      @guest
        <li><a href="/signin">Sign in with steam</a></li>
      @endguest
    </ul>

    <ul id="nav-mobile" class="sidenav">
      <div class="divider"></div>
      @auth
        <li><a href="/logout">Logout</a></li>
      @endauth
      @guest
        <li><a href="/login">Sign in with steam</a></li>
      @endguest
    </ul>
  </div>
</nav>