<template>
  <div class="views">
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
      <div class="container text-center">
<h3 style="padding-top:3%" class="page-header">Citizen Details</h3>
<input class="form-control" placeholder="Enter Names" v-model="filterInput">
    <br />
    <table class="table table-striped">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Gender</th>
            <th>Date of birth</th>
            <th>National ID</th>
            <th>Phone</th>
            <th>Village</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="citizen.uuid" v-for="citizen in citizens">
            <td>{{citizen.firstname}}</td>
            <td>{{citizen.lastname}}</td>
            <td>{{citizen.gender}}</td>
             <td>{{citizen.dob}}</td>
             <td>{{citizen.nationalId}}</td>
            <td>{{citizen.phone}}</td>
             <td>{{citizen.village.name}}</td>
            <!-- <td><router-link class="btn btn-default" v-bind:to="'/student/'+citizen.uuid">View</router-link></td> -->
          </tr>
        </tbody>
    </table>
  </div>
  </div>
  </div>
</template>

<script>
import navigation from '../Citizen/navigation.vue'
import axios from "axios";
export default {
name:'viewCitizen',
components:{
  navigation,
},
data () {
      return {
        citizens: [],
        alert:'',
        filterInput:''
      }
    },
    methods:{
        fetchCustomers(){
        axios.get('http://localhost:8088/citizen/all')
          .then(response =>{
            this.citizens = response.data.OBJECT;
           
          }).catch(err => {
          // eslint-disable-next-line
          console.error(err);
        });
      },
    //   filterBy(list, value){
    //     value = value.charAt(0).toUpperCase() + value.slice(1);
    //     return list.filter(function(citizen){
    //       return citizen.firstname.indexOf(value) > -1;
    //     });
    //   }
    },
    

      created: function(){
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      this.fetchCustomers();
    },
    updated: function(){
      this.fetchCustomers();
    },
}
</script>

<style scoped>
.views{
overflow: hidden;
}

body {
  margin: 0;
  font-family: "Lato", sans-serif;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  /* position: sticky; */
  position: absolute;
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