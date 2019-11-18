<template>
  <div class="allPage">
    <div class="topnavBar">
      <topNavBar />
    </div>
    <div class="nuxtchild">
    <nuxt />
    </div>
  </div>
</template>

<script>
import topNavBar from '@/components/topNavBar'
export default {
  components: {
    topNavBar
  },
  head(){
    
   
    return {
      title: 'EvaWelcome',
      meta:[
        {name:"viewport", content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}
      ],

      
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
    width: 100%;
    display: flex;
    flex-direction: column;
}
.topnavBar{
    height: 50px;
}
.allPage{
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
