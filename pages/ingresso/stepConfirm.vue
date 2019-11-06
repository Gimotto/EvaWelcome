<template>
<div>
    <div class="headerText" align="center">
            <h2>Grazie per la tua pazienza</h2><br>
             <p style="font-family: Comic Sans MS; font-size:18px;">Ecco il tuo numero</p>
    </div>
    <div class="bodyText">
        <div align="center">
        <p style="font-size:250px">{{this.$route.query.num}}</p>
        </div> 
    </div>
    <div class="footerText" style="margin-top:111px;">
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
                type="filled">
                Ritorna ad Home
                </vs-button>
            </vs-col>
        </vs-row>
    </div>   
    </div>
</template>
<script>
export default {
    middleware: 'info',
    data(){
        return{
            num: ''
        }
    },
        mounted() {
            if(Object.keys(this.$store.getters['user/getUser']).length == 0){
                this.$router.push("/")
            }
            else{
                if(this.$route.query.num == undefined){
                this.$router.push("/")
            }
                this.$cookies.remove("userTemp")
                this.$store.commit('user/setState', {})
                this.$cookies.remove("userTempDetails")
                this.$store.commit('userDetails/setState', {})
                window.welcome = setTimeout(this.closeReturnHome, 12000);
            }
    },
    methods: {
        closeReturnHome(){
            this.$router.push("/")
        }
    }
}
</script>
<style scoped>
.card{
    height:100px;
    width:240px;
   }
.step{
    padding-bottom:20px;
}
</style>