<template>
	<div>
		<!-- <div class="switch">
			<div class="switch1">Client existant</div>
			<div class="switch2">Nouveau client</div>
		</div> -->
		<div class="center">
			<h1>FICHIER CLIENTS PLONGEURS</h1>


			<div class="search">
				<input type="text" v-model="searchslug" placeholder="Rechercher un client" @input="searchClient">
			</div>
			<div class="searchresult" v-if="clientsearchresult.length">
				<div class="result" v-for="result in clientsearchresult" :key="result.id" @click="selectClient(result)">
					<strong>{{ result.lastName }} {{ result.firstName }}</strong>
					<br> {{ result.emailAddress }}
				</div>
			</div>


			<form action="" v-if="user.id">
				<div class="spacer"></div>
				<label for="">Pass Temoana</label>
				<div class="line">
					<label for="">Crédit restant :</label><span style="font-size:1.5em;line-height:1.5em">{{
							$calculateCredit(user, $dayjs)
					}}</span>
				</div>
				<div class="line">
					<label for="">Date d'expiration du pass :</label><span>{{ $dayjs(
							$calculateDateExpi(user, $dayjs)).format('DD MMMM YYYY')
					}}</span>
				</div>
				<div class="line">
					<label for="">ID client :</label><span @click="copyId(user.idclient)">{{ user.idclient }}</span>
				</div>
				<div class="spacer"></div>
				<label for="">Liste des plongées</label>
				<div class="plongee" v-for="plongee in user.plongees" :key="plongee.id">
					<span class="a">{{ $dayjs(plongee.createdAt).format('DD/MM/YYYY') }}</span>
					<span class="b">{{ plongee.partenaire.name }}</span>
					<span class="c">x{{ plongee.nbPlongeur }}</span>
					<div class="deleteplongee" v-if="plongee.partenaire.id == $auth.user.id"
						@click="deleteplongee(plongee.id)"></div>
					<div class="deleteplongeefake" v-else></div>
				</div>
				<Alert />
				<div class="spacer"></div>
				<label for="">Plongeur principal</label>
				<div class="line">
					<label for="">Adresse email :</label><span>{{ user.emailAddress }}</span>
				</div>
				<div class="line">
					<label for="">Nom :</label><span>{{ user.lastName }} {{ user.firstName }}</span>
				</div>
				<div class="line">
					<label for="">Date de naissance :</label><span>{{ user.birthDate }}</span>
				</div>
				<div class="line">
					<label for="">Pays de résidence :</label><span> {{ user.country }}</span>
				</div>
				<div class="line">
					<label for="">Téléphone :</label><span> {{ user.phone }}</span>
				</div>
				<div class="line">
					<label for="">Niveau de plongée :</label><span> {{ user.level }}</span>
				</div>
				<div class="spacer"></div>
				<label for="">Plongeur secondaire</label>
				<div class="line">
					<label for="">Nom :</label><span>{{ user.lastName2 }} {{ user.firstName2 }}</span>
				</div>
				<div class="line">
					<label for="">Date de naissance :</label><span>{{ user.birthDate2 }}</span>
				</div>
				<div class="line">
					<label for="">Pays de résidence :</label><span> {{ user.country2 }}</span>
				</div>
				<div class="line">
					<label for="">Téléphone :</label><span> {{ user.phone2 }}</span>
				</div>
				<div class="line">
					<label for="">Niveau de plongée :</label><span> {{ user.level2 }}</span>
				</div>
			</form>
			<Alert />

			<div class="edit" v-if="user.id">
				<div class="picto"></div>
				<nuxt-link to="/clientEdit" class="text">Modifier</nuxt-link>
			</div>
			<div class="credit" v-if="user.id">
				<div class="picto2"></div>
				<a class="text" @click="creditPlongee(user.id)" style="cursor:pointer;">SCANNER UNE PLONGEE</a>

			</div>

			<!-- <div class="btnValid" @click="addUser">Valider</div> -->
		</div>
	</div>
</template>

<script setup>
const { $store, $router, $axios } = useNuxtApp()
const { state } = $store

const copyId = async function (val) {
	console.log('copyid');
	// console.log(navigator);
	// console.log(navigator.clipboard);
	await navigator.clipboard.writeText(val);

}

const formdata = ref({});
const user = ref({});
const searchslug = ref('');
const clientsearchresult = ref([]);
user.value = state.users.currentUser;

const creditPlongee = async function (id) {

	$router.push({ name: 'vendre', params: { iduser: id } });

};
const searchClient = async function () {

	console.log('searchClient');
	console.log('searchslug==', searchslug.value);
	clientsearchresult.value = await $axios.post(process.env.API_URL + 'searchclient', { slug: searchslug.value }).then(function (res) {
		console.log('FINI');
		console.log(res);
		return res.data
	})
	console.log(clientsearchresult)

};
const deleteplongee = async function (val) {

	console.log('deleteplongee');

	const rep = await $axios.delete(process.env.API_URL + 'plongee/' + val).then(function (res) {
		console.log('FINI');
		console.log(res);

		$store.dispatch('global/alert', {
			text: 'Plongée supprimée',
			variant: 'success',
			countDown: 5
		}, { root: true })
		return res.data
	})
	console.log(clientsearchresult)

};


const selectClient = async function (e) {

	console.log('selectClient');
	console.log(e);
	await $store.dispatch('users/fetchUser', { id: e.id })
	user.value = state.users.currentUser;
	// formdata.value.user = state.users.currentUser.id ;
	clientsearchresult.value = [];
	searchslug.value = '';
};
const editUser = function () {
	console.log('editUser');
}

</script>

<style scoped lang="less">
@import '~static/less/variable.less';

.edit {
	margin-top: 20px;
	color: white;
	background-color: @lightblue;
	display: inline-flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	padding: 5px 20px;
	border-radius: 50px;
	// transform: translateX(-50%);
	// left:50%;
	position: relative;

	.text {
		font-size: 1.5em;
		font-weight: bold;
		margin-left: 20px;
		color: white;
	}

	.picto {
		background: url('assets/images/edit.png');
		width: 15px;
		height: 15px;
		font-size: 2em;


	}

}

.credit {
	margin-top: 20px;
	color: white;
	background-color: @lightblue;
	display: inline-flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	padding: 5px 20px;
	border-radius: 50px;
	// transform: translateX(-50%);
	// left:50%;
	position: relative;

	.text {
		font-size: 1.5em;
		font-weight: bold;
		margin-left: 20px;
		color: white;
	}

	.picto2 {
		background: url('assets/images/qr code blanc.png');
		background-size: cover;
		width: 15px;
		height: 15px;
		font-size: 2em;
		font-weight: bold;
	}
}

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

.plongee {
	border: 1px dashed @blue;
	margin-bottom: 2px;
	padding: 10px 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 5px;
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

.searchresult {
	width: 80%;
	margin-left: 10%;
	margin-top: -20px;
	padding-top: 20px;

	border: 2px solid @blue;

	.result {
		border-top: 1px solid @lightblue;
		// border-bottom :1px solid @lightblue;
		color: @blue;
		padding: 5px;
		// border-radius: 10px;
		margin-bottom: 0px;

		&:hover {
			background: rgba(0, 0, 0, 0.1);
		}

		&:first-child {
			border-top: 0;
		}
	}
}

div.center {
	width: 80%;
	margin-left: 10%;
}

h1 {
	font-size: 1.8em;
	// text-transform: uppercase;
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
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 8px;

	label {
		font-size: 1em;
		font-weight: normal;
		line-height: 1em;
		margin-bottom: 0;
	}

	span {
		font-size: 1em;
		font-weight: bold;
		text-align: left;
		line-height: 1em;
		margin-left: 5px;
	}
}

.spacer {
	height: 20px;
}

small {
	padding-left: 5px;
}

.deleteplongee {
	width: 20px;
	height: 20px;
	background: url('assets/images/crossmark.png') no-repeat center center;
	cursor: pointer;
}

.deleteplongeefake {
	width: 20px;
	height: 20px;
	background: transparent no-repeat center center;
}
</style>