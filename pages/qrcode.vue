<template>
  <div>
    <h1>Valider un passage plongée</h1>
    <PopUp title="Client trouvé" :content="clientData" :open="openpupup" @reponsepopup="reponsepopup"
      @closepopup="closepopup"></PopUp>
    <BlockIdClient @found="foundedClient" />
    <div class="center">
      <Alert />
    </div>

    <!-- <BlockPass /> -->
    <ScanQrcode @found="foundedClient" />
  </div>
</template>

<script setup>
const { $store, $auth, $axios } = useNuxtApp()
const { state } = $store

const openpupup = ref(false)
const clientData = ref({})
let valSaved = "";

const foundedClient = async (val) => {

  //  alert('foundedClient='+ val);
  if (valSaved != val) {
    valSaved = val
    await $store.dispatch('users/fetchUserByIdClient', val)
    // console.log('clientData', clientData);
    clientData.value = { ...state.users.userFounded }
    if (!state.users.userError) {
      openpupup.value = true;

    }
  }


  // clientData.value = { idclient :val };
}
const closepopup = (val) => {
  if (val = 'Close') {
    openpupup.value = false;
  }

}
const reponsepopup = (val) => {

  console.log('foundedClient=', val.value);
  console.log('clientData.value =', clientData.value);
  console.log('clubData.value =', $auth.user);


  /////////////////////////////////////////////////////////////////TODO   Prélever le client d'un crédit + facture


  $axios.post('/plongees/prelevementplongee', {
    idClient: clientData.value.id,
    idClub: $auth.user.id,
    nbPlongee: val.value

  }).then((rep) => {
    console.log('rep', rep);
    openpupup.value = false;
    $store.dispatch('global/alert', {
      text: 'Crédit prélevé',
      variant: 'success',
      countDown: 5
    }, { root: true })
  }).catch((e, d) => {
    console.log('e', e.response);
    console.log('d', d);
    if (e.response.data == "nocredit") {
      $store.dispatch('global/alert', {
        text: 'Pas assez de crédit actif',
        variant: 'danger',
        countDown: 5
      }, { root: true })
    }
    if (e.response.data == "noclient") {
      $store.dispatch('global/alert', {
        text: 'Utilisateur non trouvé',
        variant: 'danger',
        countDown: 5
      }, { root: true })
    }
    if (e.response.data == "noclub") {
      $store.dispatch('global/alert', {
        text: 'Centre non trouvé',
        variant: 'danger',
        countDown: 5
      }, { root: true })
    }
    if (e.response.data == "nopass") {
      $store.dispatch('global/alert', {
        text: 'Aucun pass trouvé',
        variant: 'danger',
        countDown: 5
      }, { root: true })
    }

  })





}

</script>

<style scoped lang="less">
@import '~static/less/variable.less';

h1 {
  font-size: 1.8em;
  text-transform: uppercase;
  text-align: center;
  color: @blue;
  margin-top: 20px;
  font-weight: bold;
}

.center {
  width: 80%;
  margin-left: 10%;
}
</style>