<template>
  <div class="container text-center">
    <form
      class="text-center border border-info bg-light p-5" style="display:inline-block; text-align: center" v-on:submit="createCitizen">
      <p class="h4 mb-4">Citizen Registration</p>

      <div class="form-row mb-4">
        <div class="form-group col-md-6">
          <!-- First name -->
          <input type="text" id="firstName" class="form-control" placeholder="First name" v-model="citizenData.firstname"/>
        </div>
        <div class="form-group col-md-6">
          <!-- Last name -->
          <input type="text" id="lastName" class="form-control" placeholder="Last name" v-model="citizenData.lastname"/>
        </div>
      </div>
      <div class="form-row mb-4">
        <div class="form-group col-md-6">
          <select class="form-control" id="gender" v-model="citizenData.gender">
            <option>--Gender--</option>
            <option>MALE</option>
            <option>FEMALE</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <!-- Last name -->
          <input type="Date" id="dob" class="form-control" placeholder="Last name" v-model="citizenData.dob"
          />
        </div>
      </div>
      <div class="form-row mb-4">
        <div class="form-group col-md-6">
          <!-- First name -->
          <input
            type="text"
            id="nationalId"
            class="form-control"
            placeholder="National-ID"
            v-model="citizenData.nationalId"
          />
        </div>
        <div class="form-group col-md-6">
          <!-- Last name -->
          <input
            type="text"
            id="phone"
            class="form-control"
            placeholder="Phone"
            v-model="citizenData.phone"
          />
        </div>
      </div>
      <div class="form-row mb-4">
        <div class="form-group col-md-6">
          <select
            class="form-control"
            id="district"
            v-model="district"
            @change="fetchSector($event)"
          >
            <option value="0">--District--</option>
            <option
              v-bind:key="district.id"
              v-for="district in districts"
              :value="district.id"
              >{{ district.name }}</option
            >
          </select>
        </div>
        <div class="form-group col-md-6">
          <select
            class="form-control"
            id="sector"
            v-model="sector"
            @change="fetchCell($event)"
          >
            <option value="0">--Sector--</option>
            <option
              v-bind:key="sector.id"
              v-for="sector in sectors"
              :value="sector.id"
              >{{ sector.name }}</option
            >
          </select>
        </div>
      </div>
      <div class="form-row mb-4">
        <div class="form-group col-md-6">
          <select
            class="form-control"
            id="cell"
            v-model="cell"
            @change="fetchVillage($event)"
          >
            <option value="0">--Cell--</option>
            <option
              v-bind:key="cell.id"
              v-for="cell in cells"
              :value="cell.id"
              >{{ cell.name }}</option
            >
          </select>
        </div>
        <div class="form-group col-md-6">
          <select class="form-control" id="village" v-model="village">
            <option value="0">--Village--</option>
            <option v-bind:key="village.id" v-for="village in villages" :value="village.id">{{ village.name }}</option>
          </select>
        </div>
      </div>

      <button
        class="btn btn-info my-4 btn-block col-md-6" style="margin-left:25%" type="submit">
        Register
      </button>
      

      <hr class="border-info" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addcitizens",
  data() {
    return {
      districts: [],
      district: 0,
      sectors: [],
      sector: 0,
      villages: [],
      village: 0,
      cells: [],
      cell: 0,
      citizenData: {},
      alert: "",
    };
  },
  methods: {

    //Save tne citizens
  createCitizen(){
    if (!this.citizenData.firstname || 
        !this.citizenData.lastname || 
        !this.citizenData.gender ||
        !this.citizenData.nationalId ||
        !this.citizenData.dob ||
        !this.citizenData.phone ||
        !this.citizenData.village) {
     this.alert = "fill the gaps";
    } else {
      let newCitizen = {
        firstname:this.citizenData.firstname,
        lastname:this.citizenData.lastname,
        Gender:this.citizenData.gender,
        nationalId:this.citizenData.nationalId,
        dob:this.citizenData.dob,
        phone:this.citizenData.phone,
        village:this.citizenData.village
      }
      console.log(newCitizen)
      axios.post('http://localhost:8088/citizen/save', newCitizen)
      .then(response=>{
        console.log(response.data.OBJECT)
      }).catch(err=>{
        console.error(err)
      })
    }
  },

    fetchDistrict() {
      axios
        .get("http://localhost:8088/District/all")
        .then((response) => {
          this.districts = response.data.OBJECT;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchSector(event) {
      axios
        .get("http://localhost:8088/Sector/" + event.target.value)
        .then((response) => {
          this.sectors = response.data.OBJECT;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchCell(event) {
      axios
        .get("http://localhost:8088/Cell/" + event.target.value)
        .then((response) => {
          this.cells = response.data.OBJECT;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchVillage(event) {
      axios
        .get("http://localhost:8088/Village/" + event.target.value)
        .then((response) => {
          this.villages = response.data.OBJECT;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created: function() {
    this.fetchDistrict();
  },
}
</script>

<style scoped></style>
