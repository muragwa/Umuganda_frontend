<template>
  <div>
    <navigation></navigation>
    <!-- The sidebar -->
    <div class="sidebar">
      <a class="active" href="">Home</a>
      <a href="/citizen/addcitizen">Add-Citizen</a>
      <a href="/citizen/Viewcitizen">View-Citizen</a>
      <a href="">Umuganda</a>
      <a href="">View-umuganda</a>
    </div>

    <div class="content">
      
    </div>
  </div>
</template>

<script>
import navigation from "../Citizen/navigation.vue";
export default {
  name: "sider",
  components: {
    navigation,
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Lato", sans-serif;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  background-color: #4caf50;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>