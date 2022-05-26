<template>
    <div class="playerHand">
        <ul>
            <li v-for="card in cards" :key="card.cardID" >
                {{ card.cardName }}
            </li>
        </ul>
    </div>
</template>

<script> 
    export default {
        data() {
            cards: [
                {
                    cardID: '',
                    cardName: '',
                    cardType: '',
                    cardHP: '',
                    cardAttacks: [
                        {
                            attackName: '',
                            attackDamage:'',
                            attackCost:''
                        }
                    ],
                    cardAbilities: [
                        {
                            abilityName: '',
                            abilityDesc: '',
                            abilityCalc:''
                        }
                    ]
                }
            ]
        }
    }
</script>

<style scoped>

</style>