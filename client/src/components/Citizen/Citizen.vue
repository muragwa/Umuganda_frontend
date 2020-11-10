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
      <div class="container text-center">
    <h6 style="padding-top:3%">CITIZEN REGISTRATION FORM</h6>
    <form class="text-center border border-info p-5" style="display:inline-block; text-align: center" v-on:submit="addCitizen">
        
            
        <div class="form-row">
        <div class="form-group col-md-6">
            <input type="text" class="form-control" placeholder="Firstname" v-model="citizenData.firstname">
        </div>
        <div class="form-group col-md-6">
            <input type="text" class="form-control" placeholder="Lastname" v-model="citizenData.lastname">
            
        </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-6">
            <select class="form-control" v-model="citizenData.gender">
                <option>--Gender--</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
            </select>
        </div>
        <div class="form-group col-md-6">
            <input type="text" class="form-control" placeholder="Phone" v-model="citizenData.phone">
            
        </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-6">
            <input type="Date" class="form-control" placeholder="DOB" v-model="citizenData.dob">
        </div>
        <div class="form-group col-md-6">
            <input type="text" class="form-control" placeholder="National-ID" v-model="citizenData.nationalId">
            
        </div>
        </div>
        
        
        <div class="form-row">
        <div class="form-group col-md-6">
                          <select class="form-control" id="district" v-model="district" @change="fetchSector($event)">
                            <option value="0">--Choose District--</option>
                            <option v-bind:key="district.id" v-for='district in districts' :value='district.id'>{{district.name}}</option>
                          </select>
                      </div>
        <div class="form-group col-md-6">
                          <select class="form-control" id="sector" v-model="sector" @change="fetchCell($event)">
                            <option value="0">--Choose Sector--</option>
                            <option v-bind:key="sector.id" v-for="sector in sectors" :value="sector.id">{{sector.name}}</option>
                          </select>
                      </div>
        </div>
        
        <div class="form-row">
        <div class="form-group col-md-6">
                          <select class="form-control" id="cell" v-model="cell" @change="fetchVillage($event)">
                            <option value="0">--Choose Cell--</option>
                            <option v-bind:key="cell.id" v-for="cell in cells" :value="cell.id">{{cell.name}}</option>
                          </select>
                      </div>
        <div class="form-group col-md-6">
                          <select class="form-control" id="village" v-model="citizenData.village">
                            <option value="0">--Choose Village--</option>
                            <option v-bind:key="village.id" v-for="village in villages" :value="village.id">{{village.name}}</option>
                          </select>
                      </div>
        </div>
        
        <div style="padding-bottom:3%">
        <button class="btn btn-info btn-block col-md-6 align-items-center"  style="margin-left:25%" type="submit">SAVE</button>
        </div>
        <hr class="border-info" />
    </form>
    
 
</div>

    </div>
    
  </div>
</template>

<script>
import navigation from '../Citizen/navigation.vue'
import axios from "axios";
export default {
    name:'citizen',
    components:{
        navigation,
    },
  data(){
    return{
            districts:[],
            district:0,
            sectors:[],
            sector:0,
            villages:[],
            village:0,
            cells:[],
            cell:0,
            citizenData:{}
    }
  },
methods:{

addCitizen(e){
    if(!this.citizenData.firstname || 
        !this.citizenData.lastname || 
        !this.citizenData.gender ||
        !this.citizenData.nationalId ||
        !this.citizenData.dob ||
        !this.citizenData.phone ||
        !this.citizenData.village)
        {
            this.alert = "fill the field";

    }else{
        let newCitizen = {
            firstname: this.citizenData.firstname,
            lastname: this.citizenData.lastname,
            gender: this.citizenData.gender,
            nationalId:this.citizenData.nationalId,
            dob:this.citizenData.dob,
            phone:this.citizenData.phone,
            village: this.citizenData.village
        };
        console.log(newCitizen);
        axios.post('http://localhost:8088/citizen/save',newCitizen)
        .then(response=>{
            this.$swal({
                    icon: "success",
                    position: "top-right",
                    showConfirmButton: false,
                    toast: "true",
                    timer: 5000,
                    text: "successful saved"
                    });
                    this.$router.push({path:'/', query: {alert: response.data.DESCRIPTION}})
        });
        e.preventDefault();
    }
    e.preventDefault();
},

  fetchDistrict(){
            axios.get('http://localhost:8088/District/all')
            .then(response=>{
                this.districts = response.data.OBJECT;
            }).catch(err=>{
                console.error(err);
            })
        },
        fetchSector(event){
            axios.get('http://localhost:8088/Sector/' + event.target.value)
            .then(response=>{
                this.sectors = response.data.OBJECT;
               
            }).catch(error=>{
                console.error(error);
            })
        },
        fetchCell(event){
            axios.get('http://localhost:8088/Cell/' + event.target.value)
            .then(response=>{
                this.cells = response.data.OBJECT;
            }).catch(error=>{
                console.error(error);
            })
        },
        fetchVillage(event){
            axios.get('http://localhost:8088/Village/' + event.target.value)
            .then(response=>{
                this.villages = response.data.OBJECT;
            }).catch(error=>{
                console.error(error);
            })
        }
},
created: function(){
        this.fetchDistrict();
    }

}
</script>
<style scoped>
html {
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