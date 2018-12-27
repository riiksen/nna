@extends('admin.layouts.app')
@section('title', 'No chyba admin panel nie')

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Blank page
        <small>it all starts here</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Examples</a></li>
        <li class="active">Blank page</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
    
      <div class="row">

        <div class="col col-md-3 col-sm-6 col-xs-12"> <!-- Total users count -->
          <div class="info-box">
            <div class="info-box-icon bg-aqua">
              <i class="fa fa-user"></i>
            </div>
            <div class="info-box-content">
              <div class="info-box-text">Users</div>
              <div class="info-box-number">{{ App\Models\User::count() }}</div>
            </div>
          </div>
        </div>

        <div class="col col-md-3 col-sm-6 col-xs-12"> <!-- -->
          <div class="info-box">
            <div class="info-box-icon bg-aqua">
              <i class="fa fa-user"></i>
            </div>
            <div class="info-box-content">
              <div class="info-box-text">Users</div>
              <div class="info-box-number">{{ App\Models\User::count() }}</div>
            </div>
          </div>
        </div>

        <div class="col col-md-3 col-sm-6 col-xs-12"> <!-- -->
          <div class="info-box">
            <div class="info-box-icon bg-aqua">
              <i class="fa fa-user"></i>
            </div>
            <div class="info-box-content">
              <div class="info-box-text">Users</div>
              <div class="info-box-number">{{ App\Models\User::count() }}</div>
            </div>
          </div>
        </div>

        <div class="col col-md-3 col-sm-6 col-xs-12"> <!-- -->
          <div class="info-box">
            <div class="info-box-icon bg-aqua">
              <i class="fa fa-user"></i>
            </div>
            <div class="info-box-content">
              <div class="info-box-text">Users</div>
              <div class="info-box-number">{{ App\Models\User::count() }}</div>
            </div>
          </div>
        </div>

      </div>

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@endsection
