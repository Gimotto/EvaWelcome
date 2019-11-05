<template>
<vs-row>
    <vs-col vs-w="3" vs-type="flex" vs-justify="left" vs-align="center">
        <img src="/logo.png">
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
</template>
<script>
export default {
    name: "topNavBar"
}
</script>