<template>
  <div class="allPage">
    <vs-row class="topnavBar">
      <vs-col vs-w="3" vs-type="flex" vs-justify="left" vs-align="center">
        <img src="/logo.png">
      </vs-col>
      <vs-col vs-w="6" vs-type="flex" vs-justify="center" vs-align="center"></vs-col>
      <vs-col vs-w="3" vs-type="flex" vs-justify="flex-end" vs-align="center" >
        <nuxt-link to="/"><vs-icon icon="home" size="75px" color="#BC1254" style="margin-right:40px"></vs-icon></nuxt-link>
      </vs-col>
    </vs-row>
    <div class="nuxtchild">
    <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  //middleware: 'info',
  computed: {
    currentPage() {
      return this.$router.history.current.name
    }
  },
  head(){
    
   
    return {
      title: 'EvaWelcome',
      meta:[
        {name:"viewport", content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}
      ],
       link: [
      {
        rel: "stylesheet",
        href: "../style.css"
      }
    ]
      
    }
  },
}
</script>

<style scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.nuxtchild{
  
    margin-top:30px; 
    margin-right:100px;
    margin-left:100px;
    padding:20px;
    background-color:rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    height: calc(100vh - 280px);
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 25px 0 rgba(0,0,0,.8);
}
.topnavBar{
    height: 100px;
}
.allPage{
height:100vh;
background: url('/backgroundAllPage.png')   no-repeat center center fixed ; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  
}

</style>
