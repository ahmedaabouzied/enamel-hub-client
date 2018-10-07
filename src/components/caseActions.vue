<template>
    <v-layout row>
        <v-flex xs2>
            <a flat icon color="primary"><v-icon color="primary">star</v-icon> {{star_count}}</a> 
        </v-flex>    
    </v-layout>
</template>

<script>
export default {    
    data(){
        return {
            star_count:23
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
