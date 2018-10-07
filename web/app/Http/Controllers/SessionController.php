<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Invisnik\LaravelSteamAuth\SteamAuth;
use App\Models\User;
use Auth;

class SessionController extends Controller {
  /**
   * The SteamAuth instance
   *
   * @var string
   */
  protected $steam;
  
  /**
   * The redirect URL
   *
   * @var string
   */
  protected $redirectURL = '/';
  
  /**
   * Controller constructor
   *
   * @param SteamAuth $steam
   */
  public function __construct(SteamAuth $steam) {
    $this->steam = $steam;
  }

  /**
   * Reditrect the user to the authentication page
   *
   * @return \Illuminate\Http\RedirectResponse\Illuminate\Routing\Redirector
   */
  public function redirectToSteam() {
    return $this->steam->redirect();
  }

  /**
   * Get user info and log in
   *
   * @return \Illuminate\Http\RedirectResponse\Illuminate\Routing\Redirector
   */
  public function handle() {
    if ($this->steam->validate()) {
      $info = $this->steam->getUserInfo();

      if (!is_null($info)) {
        $user = $this->findOrNewUser($info);

        Auth::login($user, true);

        return redirect($this->redirectURL); // Redirect to site
      }
    }
    return $this->redirectToSteam();
  }

  /**
   * Getting user by info or created if not exists
   *
   * @param $info
   * @return User
   */
  protected function findOrNewUser($info) {
    $user = User::where('steamid', $info->steamID64)->first();

    if (!is_null($user)) {
      return $user;
    }

    return User::create([
      'username' => $info->personaname,
      'avatar' => $info->avatarfull,
      'steamid' => $info->steamID64
    ]);
  }
  
  public function login() {

  }

  public function logout() {
    
  }
}
