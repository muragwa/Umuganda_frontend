<template>
  <nav class="navbar navbar-expand-lg navbar-dark primary-color">
    <!-- <img src="../assets/logo.png"/> -->
    <a class="navbar-brand" href="#"> Umuganda App</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav" style="margin-left: 50%">
        <li class="nav-item active">
          <router-link to="/" style="color: white" class="nav-link"
            >Home</router-link
          >
          <span class="sr-only">(current)</span>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/citizen/addcitizen" style="color:white" class="nav-link">Add-Citizen</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/citizen/Viewcitizen" style="color:white" class="nav-link">View-Citizen</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Umuganda/addumuganda" style="color:white" class="nav-link">Add-Umuganda</router-link>
        </li>-->
        <li class="nav-item">
          <router-link to="/User/Register" style="color: white" class="nav-link"
            >Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/user/login" style="color: white" class="nav-link"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/user/login" style="color: white" class="nav-link"
            >Logout</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style>
</style>