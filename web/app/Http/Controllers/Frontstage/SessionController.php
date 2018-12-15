<?php

namespace App\Http\Controllers\Frontstage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Invisnik\LaravelSteamAuth\SteamAuth;
use App\Models\User;
use Auth;

use Curl\Curl;

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
  public function loginToSocket(Request $request) {
    if(!$request->has('socketId')) return;

    $curl = new Curl();

    $data = array(
      'steamid' => Auth::user()['steamid'],
      'socketId' => $request->input('socketId'),
    );
    $curl->setHeader('Content-Type', 'application/json');
    $curl->post('127.0.0.1:'.$_ENV['NODE_PORT'].'/loginToSocket', $data);
    $curl->close();

    return;
  }
}
