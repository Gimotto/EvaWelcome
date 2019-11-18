<template>
  <div class="container">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="5">
      <vs-card>
        <div slot="header">
          <h3>Ingresso</h3>
        </div>
        <div>
          <span><nuxt-link to="/ingresso"><img src="/usericon.svg" style="width:70%; padding: 20px"></nuxt-link></span>
        </div>
      </vs-card>
    </vs-col>
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="1"/>
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="5">
      <vs-card>
        <div slot="header">
          <h3>Uscita</h3>
        </div>
        <div>
      <span><nuxt-link to="/uscita"><img style="width: 70%;  padding: 20px" src="/logout.svg"></nuxt-link></span>
        </div>
      </vs-card>
    </vs-col>
  </div>
</template>

<script>
export default {
middleware: 'info',
layout: 'default',
mounted(){
  document.documentElement.requestFullscreen();
  this.$cookies.remove("userTemp")
  this.$cookies.remove("userTempDetails")
  clearTimeout(window.welcome)
  window.welcome =  null
}
}
</script>

<style scoped>
.button{
  margin: 20px;
}
.container {
  width: 100%;
  margin: 0 auto;
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
