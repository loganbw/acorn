<template>
  <div class="contain">
    <div>
      <img class="loginImg" src="../../assets/Pokeball_Frame.svg" name="pokeball" />
      <div>
        <form class="formContain" action="submit">
          <div class="formInputs">
            <input
              type="text"
              placeholder="username"
              id="username"
              name="username"
              class="inputForm"
            />
            <input type="password" placeholder="password" id="pwd" name="pwd" class="inputForm" />
          </div>
          <div class="formLogin">
            <input type="submit" value="Submit" class="inputButton" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style scoped>
  .inputForm {
    background-color: #fec10b;
    margin: 1%;
    width: 80%;
    border-radius:2%;
  }
  .inputForm:hover
  {
    background-color: #e5ad07;
  }
  .inputButton {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1%;
    border-radius: 50%;
    background-color: #faffff;
    color: #000;
    font-size: 12px;
  }
  .inputButton:hover{
     background-color: #eff4f4;
  }
  .inputButton:active {
    background-color: #fec10b;
  }
  .loginImg {
    height: 400px;
    margin-top: 20%;
  }
  .contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
  }
  .formContain {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;
    align-items: center;
    margin-top: -80%;
  }
  .formInputs {
    margin-top: -10% !important ;

  }
  .formLogin {
    margin-top: 10%;
  }
</style>
