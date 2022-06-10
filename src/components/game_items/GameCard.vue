<template>

    <h1 v-bind="cardName">  </h1>

</template>

<script>

import PokemonTCG from 'pokemontcgsdk';

pokemon.configure({apiKey: ''})

export default { 

    components: {
        
    },

    data () {
        return {
            cardName: '',
        }
    },

    methods: {

        getCardById(idNum) {
            pokemon.card.find(idNum)
                .then( card => {console.log(card.name)} )
            return this.cardName = card.name
        }

    },

    computed: {

    }

}
</script>

<style scoped> 


</style>