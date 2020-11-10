<template>
<div>
  
  <nav class="navbar navbar-expand-lg navbar-dark primary-color">
  <a class="navbar-brand" href="#">PAC</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav" style="margin-left:80%">
      <li class="nav-item active">
        <a class="nav-link"><router-link to="/" style="color:white"> Home </router-link><span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link"><router-link to="/citizen/addcitizen" style="color:white"> Add-Citizen </router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Service</a>
      </li>
      
    </ul>
  </div>
</nav>
</div>
</template>

<script>

export default {
name:"home",
data(){
  return{
    color:""
  }
}
}
</script>

<style>
  #home{
    /* background-color: blueviolet; */
    
    /* background-image: url('../assets/pk.jpg');
    height: 100vh;
    background-position: center;
    background-size: cover; */
    background: linear-gradient(rgba(0, 0, 0, 0.54),
    rgba(5, 5, 5, 0.75)), url('../assets/pk.jpg');
    background-size: cover;
    /* height: 100vh; */
    
  }
</style>