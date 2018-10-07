<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                    <div text-xs-center>
                        <img src="@/assets/logo.svg" alt="enamel hub" class="logo">
                        <h1 class="card_header">{{title}}</h1>
                    </div>
                    <v-layout row wrap class="content" justify-space-around>
                        <v-flex xs12 md6>
                            <slot name="content"></slot>
                        </v-flex>
                    </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    props:['title',],
    name:'basic-card'
}
</script>
<style>
    .card_header{
        text-align: center;
        padding: 2%;
        font-size: 1.8em;
        font-weight: 100;
    }
    .content{
        padding: 2% !important;
    }
    .basic_card{
        border-radius: 25px !important;
    }
    .logo{
        width: 100px;
        height: 100px;
    }
</style>

