<template>
    <div class="container">
        <vs-row v-if="badgesList">
            <vs-row>
                <vs-col vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
                    <h2 style="font-size: 34px">Ricerca oppure seleziona il badge</h2>
                </vs-col>
                <vs-col vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
                    <div style="padding: 20px">
                        <vs-input id="input" type="number" size="xlarge" style="width:100%" v-model="researchBadge" icon="search" icon-after="true"/>
                    </div>
                </vs-col>
            </vs-row>
            <vs-col vs-w="12">
                <vs-col v-show="filtredBadges==0" vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
                    <h2>Non ci sono badge</h2>
                </vs-col>
                <table class="scrolltable">
                    <tr>
                        <span v-for="(badge, i) in filtredBadges" :key="i">
                            <td style="padding:10px" v-if="i %2==0" >
                                <vs-button class="circle" color="#BC1254" @click="confirmBadge(badge.id)">
                                    <h1 style="font-size: 54px">{{ badge.id }}</h1>
                                </vs-button>
                            </td>
                        </span>
                    </tr>
                     <tr>
                        <span v-for="(badge, i) in filtredBadges" :key="i">
                            <td style="padding:10px" v-if="i %2!=0">
                                <vs-button class="circle" color="#BC1254" @click="confirmBadge(badge.id)">
                                    <h1 style="font-size: 54px">{{ badge.id }}</h1>
                                </vs-button>
                            </td>
                        </span>
                    </tr>
                </table>
            </vs-col>
            
        </vs-row>
        <div v-if="popupActive1">
            <vs-row>
           <vs-col vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
            <h2>Il Badge in suo possesso è il numero seguente?  </h2>
           </vs-col>
            <vs-col vs-w="12" style="padding:35px;" vs-type="flex" vs-justify="center" vs-align="center">
              <div class="col">
                    <h1 style="color: #BC1254; font-size: 200px">{{ selectedBadge }}</h1>
              </div>
            </vs-col>
            </vs-row>
            <div class="footerText" style="margin-top:130px;">
            <vs-row>
                <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                    <u @click="cancelConfirm()" style="color:#BC1254; cursor: pointer; font-size:20px">Indietro</u>
                </vs-col>
                <vs-col vs-w="6"></vs-col>
                <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                    <vs-button 
                    color="#BC1254" 
                    size="large" 
                    style="width: 100%;"
                    icon="done"
                    @click="deleteBadge()" 
                    type="filled">Conferma
                    </vs-button>
                </vs-col>
            </vs-row>
        </div> 
        </div>
        <div v-if="popupActive2">
            <div class="bodyText">
                <div align="center">
                <digitalSignature ref="digitalSignature" @confirmSignature="getImage" />
                </div>
            </div>

            <div class="footerText" style="margin-top:120px;">
                <vs-row>
                <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                    <nuxt-link to="/ingresso/stepRole">
                        <u style="color:#BC1254; font-size:20px">Indietro</u>
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
                    @click="confirmcheckSignature()" 
                    type="filled">Conferma
                    </vs-button>
                </vs-col>
                </vs-row>
            </div>
        </div>

        <div v-if="popupActive3">
            <vs-row>
            <vs-col vs-w="12">
                <h1 style="padding-top:20px; font-size: 48px">Uscita confermata!<br> Grazie per la disponibilità.</h1><h2 style="padding-top:50px;">Vi ricordiamo di consegnare il badge in segreteria</h2>
            </vs-col>

            </vs-row>
            <div class="footerText" style="margin-top:288px;">
            <vs-row>
                <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                 </vs-col>
                <vs-col vs-w="6"></vs-col>
                <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                    <vs-button 
                    color="#BC1254" 
                    size="large" 
                    style="width: 100%;"
                    icon="done"
                    to="/" 
                    type="filled">Home
                    </vs-button>
                </vs-col>
            </vs-row>
        </div>         
        </div>
    </div>
</template>

<script>

import digitalSignature from '@/components/digitalSignature'
export default {
    name:'uscita',
    layout:'pageLayout',
    middleware: 'badges',
    components: {digitalSignature},
    computed:{
        badges(){
            return this.$store.getters['badges/getBadges']
        },
        row(){
            return Math.floor(this.badges.length / 3)
        },
        filtredBadges(){
            let filtredBadges = [];
            for(let i in this.badges){
                if(this.researchBadge){
                    if(this.badges[i].id.toString().startsWith(this.researchBadge)){
                        filtredBadges.push(this.badges[i])
                    }
                } else {
                    filtredBadges.push(this.badges[i])
                }
            }
            return filtredBadges
        }
    },
    data(){
        return{
            selectedBadge:'',
            researchBadge: '',
            badgesList: true,
            popupActive1:false,
            popupActive2:false,
            popupActive3:false,
            imageSignature: ''
        }
    },
    methods:{
            getImage(image){
                this.imageSignature = image
                this.confirmDeleteBadge()
            },
            confirmcheckSignature() {
            this.$refs.digitalSignature.save()
        },
        confirmBadge(num){
            this.badgesList = false
            this.popupActive1 = true
            this.popupActive2 = false
            this.selectedBadge = num
        },
        cancelConfirm(){
            this.badgesList = true
            this.popupActive1 = false
            this.popupActive2 = false
            this.selectedBadge = ''
        },
        confirmDeleteBadge(image){
            //chiamata store per eliminare badge
            this.$store.dispatch('badges/delBadge', {badgeId: this.selectedBadge, image: this.imageSignature})

            setTimeout( ()=>{
            this.badgesList = false
            this.popupActive1 = false
            this.popupActive2 = false
            this.popupActive3 = true}, 100);
            window.welcome = setTimeout(this.closeReturnHome, 8000);        
        },
        deleteBadge(){
            this.badgesList = false
            this.popupActive1 = false
            this.popupActive2 = true
            this.popupActive3 = false
        },
        closeReturnHome(){
            this.popupActive1 = false
            this.popupActive2 = false
            this.badgesList = false
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .container {
        min-height: calc(100vh - 170px);
        display: block;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .col{
        padding: 10px;
        display: flex;
        align-items: center;
        text-align: center;
    }
    .circle{
        width: 200px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
    }
    .scrolltable {
    height:338px;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
}
    table tr {
        display: flex;
        justify-content: flex-start;
        align-items:flex-start;
        text-align: flex-start;
    }
 
</style>