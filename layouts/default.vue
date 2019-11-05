<template>
  <div class="allPage">
    <vs-row style="height: 50px">
      <vs-col vs-w="3" vs-type="flex" vs-justify="left" vs-align="center">
        <img style="height:100px" src="/logo.png">
      </vs-col>
      <vs-col vs-w="6" vs-type="flex" vs-justify="center" vs-align="center"></vs-col>
      <vs-col vs-w="3" vs-type="flex" vs-justify="flex-end" vs-align="center" >
        <div class="home">
          <nuxt-link to="/">
            <vs-icon icon="home" size="75px" style="margin-right:40px" color="#BC1254">
            </vs-icon>
          </nuxt-link>
      </div>
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
        href: "style.css"
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
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    
}
.allPage{
padding:20px;
background: url('/backgroundAllPage.png')   no-repeat center center fixed ; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.home:hover .material-icons{
  color:white !important;
}

</style>
