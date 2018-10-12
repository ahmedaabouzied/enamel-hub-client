<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 md8>
                <new-case-form></new-case-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import newCaseForm from '@/components/newCaseForm'
export default {
    components:{
        'new-case-form':newCaseForm
    }
}
</script>

<style lang="scss" scoped>

</style>
