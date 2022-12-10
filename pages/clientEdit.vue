<template>
	<div>
		<!-- <div class="switch">
			<div class="switch1">Client existant</div>
			<div class="switch2">Nouveau client</div>
		</div> -->
		<div class="center">
			<h1>Editer un client</h1>


			<!-- <div class="search">
				<input type="text" v-model="searchslug" placeholder="Rechercher un client" @input="searchClient">
			</div>
			<div class="searchresult" v-if="clientsearchresult.length" >
				<div class="result" v-for="result in clientsearchresult" :key="result.id" @click="selectClient(result)">
					<strong>{{result.lastName}} {{result.firstName}}</strong>
					<br> {{result.emailAddress}}
				</div>
			</div> -->


			<form action="" v-if="user.id">
				<div class="spacer"></div>



				<div class="spacer"></div>
				<label for="">Plongeur principal</label>
				<div class="line">
					<input type="text" v-model="user.emailAddress" placeholder="Adresse email du compte*">
				</div>
				<div class="line">
					<input type="text" v-model="user.lastName" placeholder="Nom*">
					<input type="text" v-model="user.firstName" placeholder="Prénom*">
				</div>
				<div class="line">
					<input type="text" v-model="user.birthDate" placeholder="Date de naissance">
				</div>
				<div class="line">
					<input type="text" v-model="user.country" placeholder="Pays de résidence">
				</div>
				<div class="line">
					<input type="text" v-model="user.phone" placeholder="Téléphone">
				</div>
				<div class="line">
					<input type="text" v-model="user.level" placeholder="Niveau de plongée*">
				</div>
				<div class="spacer"></div>
				<label for="">Si plongeur secondaire</label>
				<div class="line">
					<input type="text" v-model="user.lastName2" placeholder="Nom">
					<input type="text" v-model="user.firstName2" placeholder="Prénom">
				</div>
				<div class="line">
					<input type="text" v-model="user.birthDate2" placeholder="Date de naissance">
				</div>
				<div class="line">
					<input type="text" v-model="user.country2" placeholder="Pays de résidence">
				</div>
				<div class="line">
					<input type="text" v-model="user.phone2" placeholder="Téléphone">
				</div>
				<div class="line">
					<input type="text" v-model="user.level2" placeholder="Niveau de plongée">
				</div>

				<div class="spacer"></div>
				<label for="">Pass Temoana</label>
				<div class="line">
					<label for="">Date expiration du pass :</label>
					<input type="date" v-model="user.dateExpiCredit" placeholder="Date expiration du pass">
				</div>

			</form>

			<Alert />

			<div class="btnValid" @click="saveUser">Enregistrer</div>

		</div>
	</div>
</template>

<script setup>
const { $store, $router, $axios, $dayjs } = useNuxtApp()
const { state } = $store


const formdata = ref({});
const user = ref({});
user.value = { ...state.users.currentUser }
user.value.dateExpiCredit = $dayjs(user.value.dateExpiCredit).format('YYYY-MM-DD')
console.log(user);

if (!user.value.id) {
	$router.push('/client');
}

const saveUser = async function () {
	const result = await $store.dispatch('users/updateCurrentUser', user.value).then(async function (t, tt) {
		console.log('reponse', t);
		console.log('reponse2', tt);
		$router.push('/client');
	})

}

</script>

<style scoped lang="less">
@import '~static/less/variable.less';

.search {
	width: 80%;
	margin-left: 10%;
	margin-top: 20px;
	position: relative;

	input {
		width: 100%;
		border: 2px solid @blue;
		border-radius: 10px;
		padding: 5px 15px;
		font-size: 1.5em;
	}

}

.search:after {
	content: "";
	width: 15px;
	height: 15px;
	background: url('assets/images/loupe.png');
	display: block;
	background-size: contain;
	position: absolute;
	right: 20px;
	top: 12px;
}

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

	label {
		color: @blue;
		font-size: 1em;
		font-weight: bold;
		// margin-top: 20px;
		display: block;
		margin-bottom: 0;
	}
}

.spacer {
	height: 20px;
}

small {
	padding-left: 5px;
}
</style>