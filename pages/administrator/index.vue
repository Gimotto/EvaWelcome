<template>
  <div class="container">
    <vs-row>
<vs-col vs-w="12" style=" height: 70px;" vs-type="flex" vs-justify="center" vs-align="center">
                    <h2>EvaWelcome Administration</h2>
</vs-col>
<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
    <vs-input 
        label="Username" 
        style="width:100%; padding: 20px;"
        size="large"
        @blur="blurcheckformLogin(formLogin.username, 'username')"
        @keyup.enter="checkLogin"
        :danger="errorformLogin.username" 
        danger-text="Il Campo non può essere vuoto"
        v-model="formLogin.username"/>

    <vs-input 
        type="password"
        label="Password" 
        style="width:100%; padding: 20px;"
        size="large"
        @blur="blurcheckformLogin(formLogin.password, 'password')"
        @keyup.enter="checkLogin"
        :danger="errorformLogin.password" 
        danger-text="Il Campo non può essere vuoto"
        v-model="formLogin.password"/>
<div style="padding-top:20px; ">
<vs-button 
    color="success" 
    size="large" 
    style="padding-top:20px; width: 100%;"
    @click="checkLogin" 
    type="filled">Accedi
    </vs-button>
      <p style="color:red; padding-top:20px;">{{errorCode}}</p>
</div>
</vs-col>
</vs-row>
  </div>
</template>

<script>
export default {
data(){
  return{
    errorCode: '',
    counterErrorLogin: 0,
    formLogin: {
      username: '',
      password: '',
          },

    errorformLogin: {
     username: false,
      password: false
    }
  }},
    mounted() {
            if(Object.keys(this.$store.getters['admin/getAdmin']).length != 0) {
              this.$router.push("/administrator/home")
            }
    },
methods: {
   blurcheckformLogin(type,error){
            if(type == '') this.errorformLogin[error] = true;
            else  this.errorformLogin[error] =  false;
        },
        checkLogin(){
          this.counterErrorLogin = 0
            for(let i in this.formLogin){
                if(this.formLogin[i] == ''){
                    this.errorformLogin[i] = true;
                    this.counterErrorLogin ++
                }
                else{this.errorformLogin[i] = false;}
            }
            if(this.counterErrorLogin == 0){
                if(this.$welcome.admin.username == this.formLogin.username){
                    if(this.$welcome.admin.password == this.formLogin.password) {
                      this.errorCode = ''
                      var token = Math.floor(Math.random() * (1000000 - 100000) + 1) + 10000
                      this.$store.commit('admin/setState', {username: this.formLogin.username, token: token})
                      this.$router.push('/administrator/home')
                      }
                      else{
                    this.errorCode = "Errore sulla Password"
                  }
                  }
                  else{
                    this.errorCode = "Utente non trovato correggi Username/Password"
                  }
                }
              }   
}
}
</script>

<style scoped>
.button{
  margin: 20px;
}
.container {
  width: 55%;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
