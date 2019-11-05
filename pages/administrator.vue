<template>
<nuxt-child />
</template>

<script>
export default {
    layout: 'admin',
    middleware: 'admin'
}
</script>

<style >
.bodyPage{
height: calc(100vh - 340px);  
}
.topPage{
height: 160px;
}
.footerPage{
height: 80px;
}
</style>