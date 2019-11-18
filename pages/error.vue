<template>
     <div class="container">
     <h1>{{error}}</h1>
     <a href="/">home</a>
   </div>
</template>
<script>
export default {
    name: 'PageNotFound',
    layout: 'pageLayout',
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
    margin-top: 120px;
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
</style>
