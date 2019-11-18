<template>
    <div>
        <div class="headerText" align="center">
            <h3>Benvenuto</h3>
            <p>Inserisci i tuoi dati Anagrafici per proseguire con la registrazione:</p>
        </div>
        <div class="bodyText">
        <vs-row>
            <vs-col  vs-w="6">
                <div >
                    <vs-input 
                    label="Nome*" 
                    style="width:100%; padding: 17px;"
                    size="large"
                    @keyup.enter="checkAnagrafica()"
                    @blur="blurcheckAnagrafica(formAnagrafica.nome, 'nome')"
                    :danger="errorformAnagrafica.nome" 
                    v-model="formAnagrafica.nome"/>
                    <vs-input label="Email"
                    style="width:100%; padding: 17px;"
                    size="large"
                    @keyup.enter="checkAnagrafica()"
                    v-model="formAnagrafica.email"/>
                    
                </div>
            </vs-col>
            <vs-col vs-w="6">
                <div>
                <vs-input 
                    label="Cognome*" 
                    size="large"
                    @keyup.enter="checkAnagrafica()"
                    style="width:100%; padding: 17px;"
                    @blur="blurcheckAnagrafica(formAnagrafica.cognome, 'cognome')"
                    :danger="errorformAnagrafica.cognome" 
                    v-model="formAnagrafica.cognome"/>
                    
                    <vs-input 
                    label="Numero Telefono" 
                    style="width:100%; padding: 17px;"
                    size="large"
                    @keyup.enter="checkAnagrafica()"
                    v-model="formAnagrafica.numtel"/>
                </div>
            </vs-col>
        </vs-row>
        <vs-row style="padding:20px">
            <vs-col  vs-w="3" align="left">
                <vs-checkbox  color="#BC1254" class="checkPrivacy" style=" max-width:200px; padding-bottom:5px;" size="large" v-model="privacyCheck"><b>Conferma Privacy</b></vs-checkbox>
            </vs-col>
            <vs-col  vs-w="9" align="left">
                <p style="font-size:13px" >Confermando dichiari di aver letto e accetti integralmente le nostre condizioni generali di uso.
                    Prendi visione della nostra Informativa sulla privacy e della nostra Informativa sui Cookie</p>
            </vs-col>
            <vs-col vs-w= "12" align="center">
            <div style="height:15px;"><b style="color: red; padding-bottom:5px;">{{errorprivacyCheck}}</b></div>
            </vs-col>
        </vs-row>  
        </div>
        <div class="footerText" style="margin-top:16px;">
            <vs-row>
                <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                    <nuxt-link to="/">
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
                    @click="checkAnagrafica" 
                    type="filled">Avanti
                    </vs-button>
                </vs-col>
            </vs-row>
        </div>  
    </div>
</template>
<script>
export default {
    middleware: 'info',
    layout: 'pageLayout',
    computed: {
        MyUser() {
            return this.$store.getters['user/getUser']}
              },
    mounted() {
            if(Object.keys(this.$store.getters['user/getUser']).length != 0) {
                this.formAnagrafica = {...this.$store.getters['user/getUser']}
                this.privacyCheck = true
            }
    },
    data(){
        return{
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
            var today = new Date();
            this.date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            this.time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        },
        confirmBadge(){
            this.popupActive = true
            this.getCurrentDate()
        },
        checkAnagrafica(){
            this.countererrorformAnagrafica = 0
            for(let i in this.formAnagrafica){
                if(i == "email" || i == "numtel") continue
                if(this.formAnagrafica[i] == ''){
                    this.errorformAnagrafica[i] = true;
                    this.countererrorformAnagrafica ++
                }
                else{this.errorformAnagrafica[i] = false;}
            }
            if(this.countererrorformAnagrafica == 0){
                if(this.privacyCheck == false) this.errorprivacyCheck = "Devi confermare il trattamento sulla privacy"
                else {
                    this.errorprivacyCheck = ''
                    this.$store.commit("user/setState", this.formAnagrafica)
                    this.$router.push("ingresso/stepRole")
                    }
                    }
            },

    }
}
</script>
<style scoped>
</style>