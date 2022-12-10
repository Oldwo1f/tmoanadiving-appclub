<template>
	<div>
		<!-- <div class="switch">
			<div class="switch1">Client existant</div>
			<div class="switch2">Nouveau client</div>
		</div> -->
		<div class="center">
			<h1>Créer un nouveau client</h1>

			<form action="">
				<div class="spacer"></div>
				<div class="line">
					<input type="text" v-model="formdata.emailAddress" placeholder="Adresse email*">
				</div>
				<small>Le client va recevoir son mot de passe par email</small>

				<div class="spacer"></div>
				<label for="">Plongeur principal</label>
				<div class="line">
					<input type="text" v-model="formdata.lastName" placeholder="Nom*">
					<input type="text" v-model="formdata.firstName" placeholder="Prénom*">
				</div>
				<div class="line">
					<input type="text" v-model="formdata.birthDate" placeholder="Date de naissance">
				</div>
				<div class="line">
					<input type="text" v-model="formdata.country" placeholder="Pays de résidence">
				</div>
				<div class="line">
					<input type="text" v-model="formdata.phone" placeholder="Téléphone">
				</div>
				<div class="line">
					<input type="text" v-model="formdata.level" placeholder="Niveau de plongée*">
				</div>
				<div class="spacer"></div>
				<label for="">Si plongeur secondaire</label>
				<div class="line">
					<input type="text" v-model="formdata.lastName2" placeholder="Nom">
					<input type="text" v-model="formdata.firstName2" placeholder="Prénom">
				</div>
				<div class="line">
					<input type="text" v-model="formdata.birthDate2" placeholder="Date de naissance">
				</div>
				<div class="line">
					<input type="text" v-model="formdata.country2" placeholder="Pays de résidence">
				</div>
				<div class="line">
					<input type="text" v-model="formdata.phone2" placeholder="Téléphone">
				</div>
				<div class="line">
					<input type="text" v-model="formdata.level2" placeholder="Niveau de plongée">
				</div>
			</form>
			<Alert />
			<div class="btnValid" @click="addUser">Valider</div>

		</div>
	</div>
</template>

<script setup>
const { $store, $router } = useNuxtApp()
const { state } = $store



const items = computed({
	set: (val) => { },
	get: () => state.jeux.jeux,
})

const formdata = ref({});

const addUser = async function (errors) {
	console.log('addUser');
	console.log('errors', errors);
	console.log(formdata.value);
	if (errors.length) {

	} else {
		const result = await $store.dispatch('users/createUser', { formdata: formdata.value }).then(async function (t) {
			console.log('reponse', t);
			return t;
		})
		if (result.success) {
			console.log('cooooool!');

			$router.push({ name: 'vendre', params: { iduser: result.id } });
		}
	}

	// result
	// $store.dispatch('users/updateCurrentUser',{key:'name',value:c})

	// emit('updateValue', c)
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
}

.spacer {
	height: 20px;
}

small {
	padding-left: 5px;
}
</style>