<template>
  <div class="container">
    <vs-row style="min-width: 90vw;">
      <vs-col vs-w="4" style="padding: 30px;" vs-type="flex" vs-justify="center" vs-align="center">
        <vs-input 
        label="Seleziona data"
        style="width:80%;"
        size="large" 
        type="date" 
        v-model="data"></vs-input>
      </vs-col>
      <vs-col vs-w="4" style="padding: 30px;" vs-type="flex" vs-justify="center" vs-align="center">
        
        <vs-button style="margin-top:25px;margin-right:5px" @click="data=getCurrentDate()">Mostra Oggi</vs-button>
        <vs-button style="margin-top:25px;" @click="data=''">Mostra tutti gli utenti</vs-button>
      </vs-col>
      <vs-col vs-w="4" style="margin-top:25px; padding: 30px;" vs-type="flex" vs-justify="center" vs-align="center">
        <vs-button to="/administrator/createBadge">Aggiungi utente</vs-button>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12" >
        <vs-table stripe search pagination max-items="7" :data="users" style="min-width: 80vw;" ref="tableUser" >
          <template slot="header">
            <h3>Utenti</h3>
          </template>
          <template slot="thead">
            <vs-th sort-key="nome">Nome</vs-th>
            <vs-th sort-key="cognome">Cognome</vs-th>
            <vs-th sort-key="ruolo">Ruolo</vs-th>
            <vs-th sort-key="motivo">Motivo</vs-th>
            <vs-th sort-key="badge">Badge</vs-th>
            <vs-th sort-key="ts_entrata">Entrata</vs-th>
            <vs-th sort-key="ts_uscita">Uscita</vs-th>
            <vs-th>Azioni</vs-th>
          </template>
          <template v-if="users" slot-scope="{data}">
            <vs-tr ref="usersList" :key="indextr" v-for="(tr, indextr) in data" align="left">
              <vs-td >
                {{data[indextr].nome}}
              </vs-td>
              <vs-td>
                {{data[indextr].cognome}}
              </vs-td>
              <vs-td>
                {{data[indextr].ruolo}}
              </vs-td>
              <vs-td>
                {{data[indextr].motivo}}
              </vs-td>
              <vs-td>
                {{data[indextr].badge}}
              </vs-td>
              <vs-td>
                {{data[indextr].entrata.data}} {{data[indextr].entrata.ora}}
              </vs-td>
              <vs-td>
                {{data[indextr].uscita.data}} {{data[indextr].uscita.ora}}
              </vs-td>
              <vs-td>
                <vs-button color="warning" v-if="!data[indextr].uscita.data" @click.prevent.stop="unlockBadge(data[indextr].badge)">Sblocca</vs-button>
                <vs-button color="danger" v-else @click.prevent.stop="$refs.usersList[indextr].collapseExpandedData(); deleteUser(data[indextr].id)">Elimina</vs-button>
              </vs-td>
              <template class="expand-user" slot="expand">
                  <vs-list >
                    <vs-list-item icon="mail" title="Email" :subtitle="data[indextr].email"></vs-list-item>
                    <vs-list-item icon="call" title="Telefono" :subtitle="data[indextr].numtel"></vs-list-item>
                    <vs-list-item icon="ballot" title="Descrizione" :subtitle="data[indextr].descrizione"></vs-list-item>
                    <p @click="openPopup('Firma Digitale Entrata',data[indextr].enterSignature)">
                      <vs-list-item icon="image" title="Firma Digitale Entrata">
                      </vs-list-item>
                    </p>
                    <p @click="openPopup('Firma Digitale Uscita',data[indextr].outSignature)">
                      <vs-list-item icon="image" title="Firma Digitale Uscita">
                      </vs-list-item>
                    </p>
                   </vs-list>
              </template>
            </vs-tr>
          </template>
        </vs-table> 
      </vs-col>
    </vs-row>
<vs-popup :title="titlePopup" :active.sync="popupSignature">
  <img :src="signature" style="width:100%">
</vs-popup>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  middleware: 'badges',
  data(){
    return{
      titlePopup: '',
      signature: '',
      popupSignature: false,
      data: "",
      users: [],
      badges: []
    }
  },
  computed:{
    choosedData(){
      return moment(this.data).format("DD-MM-YYYY")
    }
  },
  watch:{
    data(){
      this.getUsers()
    }
  },
  mounted() {
    if(Object.keys(this.$store.getters['admin/getAdmin']).length != 0) {
      this.getUsers()
      this.data = moment().format("MM-DD-YYYY")
    }
    else this.$router.push("/administrator")
  },
  methods:{
    openPopup(title,image){
      this.titlePopup = title
      this.signature = image
      this.popupSignature = true
    },
    async deleteUser(id){
      console.log(id)
      await this.$axios.delete('http://localhost:8080/users/'+id+'/')
      .then(res =>{
      this.getUsers()
        this.$vs.notify({title:'Utente Cancellato',text:'Utente Cancellato manualmente',color:'danger'})
      })
      .catch(e =>{
        console.log(e)
      })
    },
    unlockBadge(badge){
      this.$store.dispatch('badges/delBadge', {badgeId: badge, image: ''})
      this.$vs.notify({title:'Badge Sbloccato',text:'Badge sbloccato manualmente',color:'warning'})
      setTimeout(() =>{this.getUsers()},1000)
                            
    },
    getCurrentDate(){
    return  moment().format("MM-DD-YYYY")
    },
    async getUsers(){
      let queryString = ''
      if(this.data!="") queryString = '?entrata.data='+this.choosedData 
      await this.$axios.$get('http://localhost:8080/users'+queryString)
      .then(res=>{
       this.users = res.map(el => {
         return {
           ...el,
           ts_entrata:  moment(el.entrata.data + ' ' + el.entrata.ora, 'DD-MM-YYYY HH:mm:ss').unix(),
           ts_uscita:  (!el.uscita) ? 0 : moment(el.uscita.data + ' ' + el.uscita.ora, 'DD-MM-YYYY HH:mm:ss').unix()
         }
       })
     })
      .catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>
<style scoped>
.button{
  margin: 20px;
}
.container {
  margin: 0 auto;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>