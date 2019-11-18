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
  components: {topNavBar},
  mounted(){
   document.documentElement.requestFullscreen();
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
    display: flex;
    flex-direction: column;
}
.allPage{
  height:552px;
  width: 100%;
  overflow: hidden;
  background: url('/backgroundAllPage.png');
  background-position: top right;
  background-repeat: no-repeat;
}
.topnavBar{
  height:50px;
}
.home:hover .material-icons{
  color:white !important;
}

</style>
