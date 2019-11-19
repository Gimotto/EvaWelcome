<template>
<div class="superContainer">
     <div class="container">
         <img style="width:400px" src="/no-connections.gif" />
     <h1 style="margin-top:-40px; margin-bottom:40px">{{error}}</h1>
     <a href="/">home</a>
   </div>
</div>
</template>
<script>
export default {
    name: 'PageNotFound',
    props:{},
    data(){
        return {
            error: "Error"
        }
    },
    mounted(){
        this.error = this.$route.query.error
    }
};
</script>
<style scoped>
.container{
    width: 100%;
    height: 100%;
    text-align: center;
    color: #343434
}
.container h1{
    font-size: 52px;
    margin: 0;
    font-weight: 900;
}
.container a{
    text-decoration: none;
    background: #e55039aa;
    color: #fff;
    padding: 12px 24px;
    display: inline-block;
    border-radius: 25px;
    font-size: 14px;
    text-transform: uppercase;
    transition: 0.4s;
}
.container a:hover{
    background: #e55039;
}
.superContainer{
   margin-right:100px;
   margin-left:100px;
   padding:20px;
   background-color:rgba(255, 255, 255);
   border-radius: 10px;
   display: flex;
   flex-direction: column;
   box-shadow: 0 4px 25px 0 rgba(0,0,0,.8);
}
</style>
