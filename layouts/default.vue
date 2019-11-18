<template>
<div>
<div class="noLandscape" > 
  <div class="containernoLandscape" align="center">
  <img src="landscape.gif" class="noLandscapeImage"/>
  <h4>Ruota il tuo dispositivo per continuare</h4>
  </div>
</div>
  <div class="allPage">
    <div class="topnavBar">
        <topNavBar />  
    </div>
    <div class="nuxtchild">
    <nuxt />
    </div>
  </div>
  </div>
</template>

<script>
import topNavBar from '@/components/topNavBar'
export default {  
  components: {topNavBar},
  mounted(){
   document.documentElement.requestFullscreen();
   screen.orientation.lock('landscape');
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
 @media only screen and (orientation:portrait){
        .allPage{display: none}
        .noLandscape{
          height:100vh;
          width: 100%;
          overflow: hidden;
          background: url('/backgroundAllPage.png');
          background-position: top right;
          background-repeat: no-repeat;
          }
          .containernoLandscape{
          width: 100%;
          display: flex;
          height: 100vh;
          justify-content: center;
          padding:20px;
          background-color:rgba(255, 255, 255, 0.4);
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 25px 0 rgba(0,0,0,.8);
          }
        .noLandscapeImage{
          width:350px;
        }
        
    }
    @media only screen and (orientation:landscape){
      .allPage{display: block}
      .noLandscape{display: none}
      }
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
