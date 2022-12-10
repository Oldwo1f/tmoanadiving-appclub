<template>
	<div class="center">
		<h1>Editer la fiche centre</h1>

		<form>
			<div class="line">
				<input type="text" v-model="formdata.email" placeholder="Adresse email">
			</div>
			<div class="line">
				<input type="text" v-model="formdata.phone" placeholder="Téléphone">
			</div>
			<div class="line">
				<input type="text" v-model="formdata.phoneM" placeholder="Téléphone mobile">
			</div>
			<div class="line">
				<input type="text" v-model="formdata.name" placeholder="Nom du centre">
			</div>
			<div class="line">
				<input type="text" v-model="formdata.website" placeholder="Site web">
			</div>
			<div class="line">
				<input type="text" v-model="formdata.city" placeholder="Ville">
			</div>
			<div class="line">
				<input type="text" v-model="formdata.island" placeholder="Ile">
			</div>
			<div class="line">
				<vue-editor name="" v-model="formdata.description" placeholder="Description"></vue-editor>
			</div>
			<br>
			<hr>
			<h1>Infos de facturation</h1>
			<br>
			<div class="line">
				<label for="" class="coolabel">Numéro Tahiti :</label>
				<input type="text" v-model="formdata.nTahiti" placeholder="Numéro Tahiti">
			</div>
			<div class="line">
				<label for="" class="coolabel">Email de facturation :</label>
				<input type="text" v-model="formdata.emailFacturation" placeholder="Email de facturation">
			</div>
			<!-- <div class="line">
				<label for="" class="coolabel">Numéro facture client :</label>
				<input type="number" v-model="formdata.numeroFactureClient" placeholder="Numéro Facture Client">
			</div>
			<div class="line">
				<label for="" class="coolabel">Préfix facture client :</label>
				<input type="text" v-model="formdata.prefixFactureClient" placeholder="Préfix Facture Client">
			</div> -->
			<div class="line">
				<label for="" class="coolabel">Numéro facture :</label>
				<input type="number" v-model="formdata.numeroFactureInterne" placeholder="Numéro Facture">
			</div>
			<div class="line">
				<label for="" class="coolabel">Préfix facture :</label>
				<input type="text" v-model="formdata.prefixFactureInterne" placeholder="Préfix Facture">
			</div>
			<div class="line">
				<label for="" class="coolabel">Footer facture :</label>
				<input type="text" v-model="formdata.footerfacture" placeholder="footer Facture">
			</div>



		</form>
		<Alert />

		<div class="btnValid" @click="saveEdit">Enregistrer</div>


	</div>
</template>

<script setup>
import { VueEditor } from "vue2-editor";
const { $store, $auth, $router } = useNuxtApp()
const { state } = $store

// const club = ref({});
let formdata = ref({});

console.log('formdata', formdata);

// formdata.value = $auth.user 

// console.log(club);
$store.dispatch('partenaires/fetchPartenaire', { id: $auth.user.id })

formdata.value = { ...state.partenaires.currentPartenaire }
// const user= computed({
// 	set: (val) => {},
// 	get:() =>  state.users.currentUser,
// })
// const formata = ref({});
// watchEffect(() => { console.log('watchEffect'); formdata.value = { ...state.partenaires.currentPartenaire } })

const saveEdit = async function () {

	const result = await $store.dispatch('partenaires/updateCurrentPartenaire', { formdata: formdata }).then(async function (t, tt) {
		console.log('reponse', t);
		console.log('reponse2', tt);
		$router.push('/club');
	})

}

</script>

<style scoped lang="less">
@import '~static/less/variable.less';

div.center {
	width: 80%;
	margin-left: 10%;
}

h1 {
	font-size: 1.8em;
	text-transform: uppercase;
	text-align: center;
	color: @blue;
	margin-top: 20px;
	font-weight: bold;
}

label {
	color: @blue;
	font-size: 1.6em;
	font-weight: bold;
	// margin-top: 20px;
}

.btnValid {
	background: red;
	padding: 10px 15px;
	width: 60%;
	margin-left: 20%;
	border-radius: 50px;
	box-shadow: none;
	border: none;
	margin-top: 25px;
	outline: 0;
	text-align: center;
	font-weight: bold;
	color: white;
	text-transform: uppercase;
	font-size: 1.8em;
	cursor: pointer;
}

.line {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;

	input {
		margin: 0px 2px;
		width: 100%;
		padding: 6px 10px;
		border: 2px solid @blue;
		border-radius: 10px;
		font-weight: bold;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.15);
	}

	.ql-toolbar.ql-snow,
	.ql-container.ql-snow {
		margin: 0px 2px;
		width: 100%;
		padding: 6px 10px;
		border: 2px solid @blue;
		border-radius: 10px;
		font-weight: bold;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.15);
	}


}

.coolabel {
	font-size: 1em;
	white-space: nowrap;
	margin-bottom: 0;
}
</style>