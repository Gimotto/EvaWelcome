<template>
  <div class="allPage">
    <div >
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
  created(){
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
  * {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box;    /* Firefox, other Gecko */
      box-sizing: border-box;         /* Opera/IE 8+ */
    }
html {
  width: 100%; 
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
  height: 100%;
    display: flex;
    flex-direction: column;
}
.allPage{
  position: absolute;
  height: 100vh;
  width: 100%;
  background: url('/backgroundAllPage.png');
  background-position: top right;
  background-repeat: no-repeat;
}
.home:hover .material-icons{
  color:white !important;
}

</style>
