<template>
  <div class="header">
    <h2>PokeVue</h2>

    <div class="rightContain">
      <div>
        <span>Play</span>
        <span>Deck Builder</span>
      </div>
      <img src="../../assets/Pokedex_Icon_Closed.svg" />
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 1%;
  }
  .rightContain {
    display: flex;
    align-items: center;
  }
  img {
    transform: rotate(90deg);
    height: 80px;
    width: 80px;
  }
  img:hover {
    content: url("../../assets/Pokedex_Icon_Open.svg");
    height: 100px;
    width: 100px;
  }
</style>
