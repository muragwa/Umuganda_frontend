<template>
    <div class="container text-center">
    <h6 style="padding-top:3%">UMUGANDA REGISTRATION FORM</h6>
    <form class="text-center border border-info p-5" style="display:inline-block; text-align: center" v-on:submit="addUmuganda">

        <div class="form-row">
        <div class="form-group col-md-6">
            <input type="Date" class="form-control" placeholder="DOB" v-model="umugandaData.date">
        </div>
        <div class="form-group col-md-6">
            <input type="text" class="form-control" placeholder="VALUE" v-model="umugandaData.value">
            
        </div>
        </div>

        <div class="form-row">
        <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                        <textarea rows="10" style="width: 205%" id="description" class="form-control" v-model="umugandaData.description"></textarea>
                        
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
                          <select class="form-control" id="village" v-model="umugandaData.village">
                            <option value="0">--Choose Village--</option>
                            <option v-bind:key="village.id" v-for="village in villages" :value="village.id">{{village.name}}</option>
                          </select>
                      </div>
        </div>
        
        <div style="padding-bottom:3%">
        <button class="btn btn-info btn-block col-md-6 align-items-center" type="submit" style="margin-left:25%">SAVE</button>
        </div>
        <hr class="border-info" />
    </form>
    <div style="padding-top:5%">
    
    </div>
</div>
</template>
<script>
import axios from "axios";
export default {
    name:'umugandas',
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
            umugandaData:{}
    }
  },
methods:{

addUmuganda(e){
    if(!this.umugandaData.date ||
        !this.umugandaData.value ||
        !this.umugandaData.description ||
        !this.umugandaData.village)
        {
            this.alert = "fill the field";

    }else{
        let newUmuganda = {
            date: this.umugandaData.date,
            value: this.umugandaData.value,
            description: this.umugandaData.description,
            village: this.umugandaData.village
        };
        console.log(newUmuganda);
        axios.post('http://localhost:8088/umuganda/save',newUmuganda)
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

</style>