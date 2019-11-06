<template>
<div>
    <div class="topPage" style="padding:10px" align="center">
        <h2>Crea Badge</h2><br>
        <vs-input 
            size="large"
            type="number"
            label="Inserisci il numero del Badge"
            @blur="(idBadge == '' || idBadge > $welcome.maxIdBadge || idBadge < 1) ? errorIdBadge =  true : errorIdBadge = false"
            style="width:30%"
            :danger="errorIdBadge" 
            danger-text="Il Campo non può essere vuoto minore di 1 o maggiore di 50"
            v-model="idBadge"/>
    </div>
    <div class="bodyPage">
    <vs-row>
        <vs-col style="padding: 30px" vs-w="6">
            <div>
                <h3>Dati Anagrafici: </h3>
                <vs-input 
                label="Nome" 
                style="width:100%; padding: 10px;"
                size="large"
                @blur="blurcheckAnagrafica(formAnagrafica.nome, 'nome')"
                :danger="errorformAnagrafica.nome" 
                danger-text="Il Campo non può essere vuoto"
                v-model="formAnagrafica.nome"/>
                
                <vs-input 
                label="Cognome" 
                size="large"
                style="width:100%; padding: 10px;"
                @blur="blurcheckAnagrafica(formAnagrafica.cognome, 'cognome')"
                :danger="errorformAnagrafica.cognome" 
                danger-text="Il Campo non può essere vuoto" 
                v-model="formAnagrafica.cognome"/>
            </div>
            <div>
            <vs-input label="Email"
                style="width:100%; padding: 10px;"
                size="large"
                v-model="formAnagrafica.email"/>

                <vs-input 
                label="Numero Telefono" 
                style="width:100%; padding: 10px;"
                size="large"
                v-model="formAnagrafica.numtel"/>
            </div>
        </vs-col>
        <vs-col style="padding: 31px" vs-w="6">
            <h3  style="padding-bottom:15px">Aggiungi specifiche: </h3>
        <!--Ruolo-->
            <vs-select
            style="width: 100%; padding-bottom:28px"
            label="Ruolo"
            v-model="userDetails.ruoloSelect">
            <vs-select-item  v-for="(item,index) in this.ruoloArr" :key="index" :value="item.value" :text="item.text"  />
            </vs-select>
        <!--Motivo-->
            <vs-select
            label="Motivo"
            style="width: 100%; padding-bottom:30px"
            v-model="userDetails.motivoSelect">
            <vs-select-item  v-for="(item,index) in this.motivoArr" :key="index" :value="item.value" :text="item.text"  />
            </vs-select>
        <!--TextArea-->
            <p style="font-size:20px ;padding-bottom:10px; color: rgba(0,0,0,.6);">Aggiungi una descrizione: </p>
            <vs-textarea style="height:110px; max-height:200px" v-model="userDetails.textarea" />                
        </vs-col>
    </vs-row>  
    </div>
    <div class="footerPage">
        <vs-row>
            <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                <vs-button 
                color="danger" 
                size="large" 
                style="width: 100%;"
                icon="clear"
                to="/administrator"
                type="filled">Annulla
                </vs-button>
            </vs-col>
            <vs-col vs-w="6"></vs-col>
            <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                <vs-button 
                color="success" 
                size="large" 
                style="width: 100%;"
                icon="done"
                @click="checkAnagrafica" 
                type="filled">Conferma
                </vs-button>
            </vs-col>
        </vs-row>
    </div>  
</div>
</template>
<script>
import moment from 'moment'
export default {
middleware: 'admin',
mounted() {
if(Object.keys(this.$store.getters['admin/getAdmin']).length == 0) {
    this.$router.push("/administrator")
}},
data(){
    return{
        maxIdBadge: this.$welcome.maxIdBadge,
        minIdBadge: 1,
        idBadge: '',
        errorIdBadge: false,
        userDetails: {
            ruoloSelect: "visitatore",
            motivoSelect: "non_definito",
            textarea : '',
        },
        ruoloArr: [
            {text: 'Visitatore', value: 'visitatore'},
            {text: 'Cliente', value: 'cliente'},
            {text: 'Agente', value: 'agente'},
            {text: 'Candidato Colloquio', value: 'candidato_colloquio'},
            {text: 'Collaboratore Esterno', value: 'collaboratore_esterno'}
        ],
        motivoArr: [
            {text: 'Non Definito', value: 'non_definito'},
            {text: 'Colloquio', value: 'colloquio'},
            {text: 'Meetings', value: 'meetings'},
            {text: 'Informazioni', value: 'info'},
            {text: 'Pagamento/Saldo', value: 'pagamento_saldo'}
        ],
        date: '',
        time: '',
        privacyCheck: false,
        errorprivacyCheck: "",
        countererrorformAnagrafica : 0,
        formAnagrafica:{
            nome: "",
            cognome: "",
            email: "",
            numtel: ""
        },
        errorformAnagrafica: {
            nome: false,
            cognome: false,
        },
    }
},
methods: {
    blurcheckAnagrafica(type,error){
        if(type == '') this.errorformAnagrafica[error] = true;
        else  this.errorformAnagrafica[error] =  false;
    },

    getCurrentDate(){
        this.date = moment().format("DD-MM-YYYY");
        this.time = moment().format("HH:mm:ss");
    },

    confirmBadge(){
        this.popupActive = true
        this.getCurrentDate()
    },

    checkAnagrafica(){
        this.countererrorformAnagrafica = 0
        if(this.idBadge == '' || this.idBadge > this.maxIdBadge || this.idBadge < this.minIdBadge){
            this.errorIdBadge = true
            this.countererrorformAnagrafica ++
        }
        for(let i in this.formAnagrafica){
            if(i == "email" || i == "numtel") continue
            if(this.formAnagrafica[i] == ''){
                this.errorformAnagrafica[i] = true;
                this.countererrorformAnagrafica ++
            }
            else{this.errorformAnagrafica[i] = false;}
        }
        if(this.countererrorformAnagrafica == 0){
            this.getCurrentDate()
            this.$axios.$get('badges')
            .then(data=>{
                let allBadge = data
                allBadge.sort(function(a, b) {return a.idBadge - b.idBadge});
                for(let i in allBadge)
                    {
                        if(this.idBadge == allBadge[i].idBadge){
                        return alert("Questo Id gia è utilizzato")}
                    }
                    this.$axios.$post('users/create', {
                      nome: this.formAnagrafica.nome,
                      cognome: this.formAnagrafica.cognome,
                      email: this.formAnagrafica.email,
                      numtel: this.formAnagrafica.numtel,
                      ruolo: this.userDetails.ruoloSelect,
                      motivo: this.userDetails.motivoSelect,
                      descrizione: this.userDetails.textarea,
                      badge: this.idBadge,
                      signin: '',
                    })
                    .then(res=>{
                        this.$axios.$post('badges/create', {
                            idBadge: this.idBadge,
                            idUser: res.id
                        })
                        .then(res=>{
                            this.$vs.notify({title:'Success',text:'Utente registrato con successo',color:'success'})
                            this.$router.push("/administrator/home")
                            })
                        .catch(e=>{
                            this.$router.push({path:'/error', query: {error: 'Error: network database'}})
                        })
                    })
                    .catch(e=>{
                        this.$router.push({path:'/error', query: {error: 'Error: network database'}})
                    })
                }).catch(e=>{
                    this.$router.push({path:'/error', query: {error: 'Error: network database'}})
                })
        }
    },

}
}
</script>
<style scoped>
.bodyPage{
height: calc(100vh - 340px);  
}
.topPage{
height: 160px;
}
.footerPage{
height: 80px;
}
</style>


