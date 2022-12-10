
<template>
  <nav class="mainMenu">

    <div class="allButton">
      <div @click="clickonMenu('/vendre')" class="oneButton">
        <div class="picto pictoPass"></div>
        <h2>Vendre <br>un pass</h2>
        <!-- <ul>
      <li><a href="">Créer</a></li>
      <li><a href="">Voir la liste</a></li>
    </ul> -->
      </div>
      <div @click="clickonMenu('/client')" class="oneButton">
        <div class="picto pictoClient"></div>
        <h2>Trouver <br> un client</h2>
        <!-- <ul>
      <li><a href="">Créer</a></li>
      <li><a href="">Voir la liste</a></li>
    </ul> -->
      </div>
      <div @click="clickonMenu('/qrcode')" class="oneButton">
        <div class="picto pictoQR"></div>
        <h2>Scan plongée</h2>
        <!-- <ul>
      <li><a href="">Scanner</a></li>
      <li><a href="">Recherche ID</a></li>
    </ul> -->
      </div>
      <div @click="clickonMenu('/stats')" class="oneButton">
        <div class="picto pictoFactures"></div>
        <h2>Mes factures <br>intercentre</h2>
      </div>

      <div @click="clickonMenu('/club')" class="oneButton">
        <div class="picto pictoClub"></div>
        <h2>Fiche centre</h2>
        <!-- <ul>
      <li><a href="">Editer</a></li>
    </ul> -->
      </div>
      <div @click="clickonMenu('/stats')" class="oneButton">
        <div class="picto pictoParams"></div>
        <h2>Paramètres et stats</h2>

      </div>

    </div>
    <div class="deconnexion" @click="logout">
      <div class="picto"></div>
      <div class="text">Déconnexion</div>
    </div>

  </nav>
</template>
<script setup>
const { $store, $router, $auth } = useNuxtApp()
const state = $store.state;

const clickonMenu = (route) => {

  $store.dispatch('global/closeMenuCollapsed')
  $router.push(route)

}
const logout = () => {
  console.log('LOGOUT');
  $store.dispatch('global/closeMenuCollapsed')
  $auth.logout()
  $router.push('/login')
}

</script>

<style lang="less">
@import '~static/less/variable.less';

.mainMenu {

  background: rgb(0, 88, 111);
  background: linear-gradient(90deg, rgba(0, 88, 111, 1) 0%, rgba(0, 111, 139, 1) 100%);
  background: url('assets/images/bg1.png');
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 40px;
  bottom: 0px;
  z-index: 1000;
  // display: none;

  &.collapsed {
    display: flex;
  }

  .allButton {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;


  }

  .oneButton {
    margin: 20px 0px;
    width: 40%;
    // aspect-ratio: 1/1;
    background: white;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    cursor: pointer;
  }

  .oneButton h2 {
    font-size: 1.2em;
    font-weight: bold;
    color: #004D61;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
    line-height: 1em;
  }

  .oneButton ul li {
    text-align: center;

  }

  .oneButton ul li a {
    text-align: center;
    font-family: 'Montserrat';
    font-size: 1.2em;
    text-align: center;
    color: #555;
    font-weight: normal;
  }

  .oneButton .picto {
    margin-top: 20px;
    width: 50px;
    height: 50px;
    // background: url('images/');
  }

  .oneButton .picto.pictoPass {
    background: url('assets/images/vendre.png') no-repeat center center;
    background-size: contain;
  }

  .oneButton .picto.pictoClient {
    background: url('assets/images/user.png') no-repeat center center;
    background-size: contain;
  }

  .oneButton .picto.pictoQR {
    background: url('assets/images/qr code bleu.png') no-repeat center center;
    background-size: contain;
  }

  .oneButton .picto.pictoFactures {
    background: url('assets/images/stat bleu.png') no-repeat center center;
    background-size: contain;
  }

  .oneButton .picto.pictoClub {
    background: url('assets/images/plonge bleu.png') no-repeat center center;
    background-size: contain;
  }

  .oneButton .picto.pictoParams {
    background: url('assets/images/setting.png') no-repeat center center;
    background-size: contain;
  }

  .deconnexion {
    background: red;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    cursor: pointer;

  }

  .deconnexion .picto {
    width: 30px;
    height: 30px;
    background: url('assets/images/deco.png') no-repeat;
    background-size: contain;
    margin-right: 20px;
  }

  .deconnexion .text {
    color: white;
    font-size: 1.4em;
    font-weight: bold;

  }

}

@media screen and (min-width:800px) {
  .mainMenu {

    background: rgb(0, 88, 111);
    background: linear-gradient(90deg, rgba(0, 88, 111, 1) 0%, rgba(0, 111, 139, 1) 100%);
    background: url('assets/images/bg1.png') no-repeat;
    background-size: cover;
    width: 596px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: 40px;
    bottom: 0px;
    z-index: 1000;
    // display: none;
  }
}
</style>