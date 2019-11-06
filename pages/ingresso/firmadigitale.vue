<template>
<div>
  <div class="bodyText">
    <div align="center">
      <digitalSignature ref="digitalSignature" @confirmSignature="confirmBadge" />
    </div>
  </div>

  <div class="footerText" style="margin-top:115px;">
    <vs-row>
      <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
          <nuxt-link to="/ingresso/stepRole">
            <b style="color:#BC1254; font-size:20px">Indietro</b>
          </nuxt-link>
      </vs-col>
      <vs-col vs-w="6"></vs-col>
      <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
          <vs-button 
          color="#BC1254" 
          size="large" 
          style="width: 100%;"
          icon="arrow_forward"
          icon-after
          @click="confirmSignature()" 
          type="filled">Conferma
          </vs-button>
      </vs-col>
    </vs-row>
  </div>
</div>
</template>
<script>
import digitalSignature from '@/components/digitalSignature'
import moment from 'moment'
  export default {
    name: 'MySignaturePad',
    middleware: 'info',
    components: {digitalSignature},
    data(){
      return{
          userDetails: {},
          MyUser :{}
      }
    },
    mounted() {
            if(Object.keys(this.$store.getters['user/getUser']).length == 0){
               this.$router.push("/ingresso")
            }
            else{
                this.MyUser = {...this.$store.getters['user/getUser']}
                if(Object.keys(this.$store.getters['userDetails/getUserDetails']).length != 0) {
                this.userDetails = {...this.$store.getters['userDetails/getUserDetails']}
            }
            else{
              this.$router.push("/ingresso/stepRole")
            }
            }
    },
    methods: {
      confirmSignature() {
        this.$refs.digitalSignature.save()
        },
      getCurrentDate(){
          this.date = moment().format("DD-MM-YYYY");
          this.time = moment().format("HH:mm:ss");
      },
      confirmBadge(image){
          this.getCurrentDate()
          this.$axios.$get('badges')
          .then(data=>{
              let allBadge = data
              allBadge.sort(function(a, b) {return a.idBadge - b.idBadge});
              let idB = ''
              if(data.length == 0){
                  idB = 1
              }else{
                  let count = 0
                  for(let i in data){
                      if(data[i].idBadge>count){
                          count = data[i].idBadge
                      }
                  }
                  idB = count + 1
                  if(idB > this.maxIdBadge){
                      for(var i = 1; i<this.maxIdBadge; i++){
                          if(allBadge[i-1].idBadge != i){
                              idB = i
                              break;
                          }
                      }
                      if(idB > this.maxIdBadge) 
                      {
                          alert("non ci sono badge disponibili, ci scusiamo per il disagio")
                          return this.$router.push("/")
                      }
                  }
              }   this.$axios.$post('users/create', {
                      nome: this.MyUser.nome,
                      cognome: this.MyUser.cognome,
                      email: this.MyUser.email,
                      numtel: this.MyUser.numtel,
                      ruolo: this.userDetails.ruoloSelect,
                      motivo: this.userDetails.motivoSelect,
                      descrizione: this.userDetails.textarea,
                      badge: idB,
                      signin: image,
                  })
                  .then(res=>{
                      this.$axios.$post('badges/create', {
                          idBadge: idB,
                          idUser: res.id,
                      })
                      .then(res=>{
                          this.$router.push({path: "/ingresso/stepConfirm" , query:{num: idB}})
                      })
                      .catch(e=>{
                          console.log(e)
                      })
                  })
                  .catch(e=>{
                      console.log(e)
                  })
          })
          .catch(e=>{
              console.log(e)
          })
      },
    }
  }
</script>
<style>
.firmadigitale{
  margin-top:20px;
  background-color: white;
  border-radius: 20px
}
</style>