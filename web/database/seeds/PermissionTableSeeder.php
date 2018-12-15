<?php

use Illuminate\Database\Seeder;

use App\Models\Permission;

class PermissionTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $permissions = [
      'access-backstage' => 'View Backstage',
      
      'view-analytics' => 'View Analytics',
      'view-analytics-earnings' => 'View Earnings',
      'view-analytics-users' => 'View Users Analytics',

      'view-users' => 'View Users',
      'show-user' => 'Show User',
      'lock-user' => 'Lock User',
      'unlock-user' => 'Unlock User',

      'view-roles' => 'View Roles',
      'create-role' => 'Create Role',
      'edit-role' => 'Edit Role',
      'delete-role' => 'Delete Role',

      'view-permissions' => 'View Permissions',
      
      'view-deposits' => 'View Deposits',
      
      'view-withdraws' => 'View Withdraws',
    ];

    foreach ($permissions as $key => $value) {
      $permission = new Permission();
      $permission->name = $key;
      $permission->display_name = $value;
      $permission->save();
    }
  }
}
