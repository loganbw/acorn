<template >
    <BaseHeader />
    <div class="contain">
        <div class="searchContain">
            
        </div>
        <div class="cardContain">

        </div>
        <div class="deckContain">
            
        </div>
    </div>
</template>
<script>
import BaseHeader from "../components/UI/baseHeader.vue"
import store from "../store/index"
export default {
    components:{BaseHeader},
    mounted(){
        store.dispatch("fetchSearchPokemon");
    }
}
</script>
<style scoped>
    
</style>