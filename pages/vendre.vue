<template>
	<div>
		<!-- <div class="switch">
			<div class="switch1">Client existant</div>
			<div class="switch2">Nouveau client</div>
		</div> -->
		<div class="center">
			<h1>Vendre un pass</h1>



			<h3>Client <nuxt-link to="/newclient" class="btn-newclient">Nouveau client</nuxt-link>
			</h3>

			<div class="search">
				<input type="text" v-model="searchslug" placeholder="Rechercher un client" @input="searchClient">
			</div>
			<div class="searchresult" v-if="clientsearchresult.length">
				<div class="result" v-for="result in clientsearchresult" :key="result.id" @click="selectClient(result)">
					<strong>{{ result.lastName }} {{ result.firstName }}</strong>
					<br> {{ result.emailAddress }}
				</div>
			</div>
			<div class="blockclient">
				<div class="picto"></div>
				<div class="text">
					<div>
						<label for="">Principal : </label>
						<span v-if="user.firstName || user.lastName">{{ user.firstName }} {{ user.lastName }}</span>
						<span v-else>N/A</span>
					</div>
					<div>
						<label for="">Secondaire : </label>
						<span v-if="user.firstName2 || user.lastName2">{{ user.firstName2 }} {{ user.lastName2 }}</span>
						<span v-else>N/A</span>
					</div>
					<div>
						<label for="">ID client :</label>
						<span @click="copyId(user.idclient)">{{ user.idclient }}</span>
					</div>
					<div>
						<a @click="goToFichieClient(user.id)" style="cursor:pointer">voir la fiche client</a>
					</div>
				</div>
			</div>

			<h3>Crédits plongée</h3>
			<form action="">
				<label for="">Nombre de plongée :</label>
				<input type="number" min="10" @input="calculateprice" v-model="formdata.nbplongee">
				<label for="">Date d'effet des crédits:</label>
				<input type="date" v-model="formdata.dateeffect"> <br>
				<label for="">Tarif :</label>
				<div>
					<div class="btn" :class="{ 'active': formdata.resident }" @click="toogleResident">RES</div>
					<div class="btn" :class="{ 'active': !formdata.resident }" @click="toogleResident">INTER</div>
				</div>
			</form>
			<div class="separator"></div>
			<div class="textprice">
				<label for="">Prix : </label><span class=""> {{ $formatnumber(formdata.price) }} XPF</span>
			</div>
			<div class="center2">
				<Alert />
			</div>

			<div class="btnValid" @click="openComfirm">Valider</div>
		</div>
		<div class="modalcomfirm" v-if="comfirm">
			<div class="popUpOverlay">
				<div class="popup">
					<div class="picto"></div>
					<h3 style="width:auto;margin-left:auto;color:white;">Cette action est irréversible.</h3>
					<div class="text">
						Encaisser le règlement du pass <br>
						<label for="">Prix : </label><strong class=""> {{ $formatnumber(formdata.price) }} XPF</strong>
						<br>Puis valider.
					</div>
					<div class="textConfirm">
						Avez-vous encaissé le client ?
					</div>
					<div class="btns">
						<div class="btnY" @click="sellThePass">
							<div class="picto"></div>
						</div>
						<div class="btnN" @click="closeComfirm">
							<div class="picto"></div>
						</div>
						<!-- <nuxt-link class="btnN" to="/profil"><div class="picto"></div></nuxt-link> -->
					</div>
					<Alert />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>


const { $store, $route, $router, $dayjs, $axios, $auth } = useNuxtApp()
const { state } = $store
const copyId = async function (val) {
	console.log('copyid');
	// console.log(navigator);
	// console.log(navigator.clipboard);
	await navigator.clipboard.writeText(val);

}
console.log('route ===> ', $route);
const user = ref({})
const Prixresident = process.env.TARIF_RESIDENT;
const searchslug = ref('');
const comfirm = ref(false);
const clientsearchresult = ref([]);
const Prixnonresident = process.env.TARIF_TOURISTE;
const formdata = ref({
	resident: false,
	nbplongee: 10,
	dateeffect: $dayjs().format('YYYY-MM-DD')
})
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
const toogleResident = async function () {

	console.log('toogle');
	formdata.value.resident = !formdata.value.resident;
	console.log(formdata.value.resident);

	calculateprice()

};

const selectClient = async function (e) {

	console.log('selectClient');
	console.log(e);
	await $store.dispatch('users/fetchUser', { id: e.id })
	user.value = state.users.currentUser;
	formdata.value.user = state.users.currentUser.id;
	clientsearchresult.value = [];
	searchslug.value = '';
};
const checkUser = async function () {
	console.log('check');
	if ($route.params.iduser) {

		await $store.dispatch('users/fetchUser', { id: $route.params.iduser })

		user.value = state.users.currentUser;
		formdata.value.user = state.users.currentUser.id;
	} else {

	}

}

checkUser();


const calculateprice = async function () {

	let Prixfinal = 0;

	if (formdata.value.resident) {
		Prixfinal = Prixresident
	} else {
		Prixfinal = Prixnonresident
	}

	formdata.value.price = Prixfinal * formdata.value.nbplongee;
}
calculateprice()

const openComfirm = function () {
	if (formdata.value.nbplongee < 10) {
		$store.dispatch('global/alert', {
			text: 'Minimum 10 plongées dans le pass',
			variant: 'danger',
			countDown: 4
		}, { root: true })
	} else {
		comfirm.value = true
	}
}
const closeComfirm = function () {
	comfirm.value = false
}
const sellThePass = async function () {

	console.log('sellThePass');
	closeComfirm();
	console.log(formdata);
	formdata.value.clubId = $auth.user.id

	if (!formdata.value.user) {
		console.log('no user set');

		$store.dispatch('global/alert', {
			text: 'Aucun utilisateur',
			variant: 'danger',
			countDown: 4
		}, { root: true })
	} else {
		formdata.value.userid = formdata.value.user;
		const vente = await $axios.post(process.env.API_URL + 'ventedepass', formdata.value).then(function (res, err) {
			console.log('FINI');
			console.log(err);
			console.log(res);
			if (res.status == 200) {
				$router.push('/client');
				$store.dispatch('global/alert', {
					text: 'Le compte utilisateur ' + user.value.emailAddress + ' a été crédité de ' + formdata.value.nbplongee + ' plongées.',
					variant: 'success',
					countDown: 8
				}, { root: true })

			}


		})
	}



}
const goToFichieClient = (id) => {
	$router.push('/client', { id: id });
}



</script>

<style scoped lang="less">
@import '~static/less/variable.less';

div.center {
	text-align: center;
}

div.center2 {
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

h3 a {
	font-size: 0.7em;
	color: @lightblue;
	float: right;
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

h3 {
	color: @blue;
	font-size: 1.5em;
	font-weight: bold;
	padding-bottom: 5px;
	border-bottom: 3px solid lightgrey;
	width: 80%;
	margin-left: 10%;
	text-align: left;
	margin-top: 20px;

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

		&:first-child {
			border-top: 0;
		}
	}
}

.blockclient {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 80%;
	margin-left: 10%;
	border: 2px solid @blue;
	border-radius: 10px;
	padding: 10px 20px;
	margin-top: 20px;

	.picto {
		background: url('assets/images/plongeur principal.png') no-repeat center center;
		width: 40px;
		height: 40px;
		background-size: contain;
		margin-right: 30px;
	}

	.text {
		text-align: left;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		color: @blue;
		font-size: 1.2em;

		div {
			text-align: left;
			width: 100%;
		}

		label {
			display: inline;
			margin-bottom: 0;
		}

		span {
			display: inline;
			font-weight: bold;
		}
	}
}

form {
	width: 60%;
	margin-left: 20%;

	label {
		color: @blue;
		display: inline-block;
		font-size: 1.2em;
		margin-bottom: 5px;
	}

	input {
		margin-bottom: 15px;
		padding: 5px 15px;
		border-radius: 10px;
		border: 2px solid @blue;
		outline: 0;
	}

	input[type='number'] {
		font-size: 2.5em;
		width: 100px;
		text-align: center;
	}

	input[type='date'] {
		font-size: 1em;
		width: 200px;
		text-align: center;
		background: white;
	}

	.btn {
		border: 2px solid @blue;
		padding: 7px 20px 5px 20px;
		font-size: 1.2em;
		border-radius: 10px;
		margin: 0 10px;
		color: @blue;

		&.active {
			background: @blue;
			color: white;
		}
	}
}

.separator {
	height: 3px;
	background: lightgrey;
	width: 60%;
	margin-left: 20%;
	margin-top: 20px;
	margin-bottom: 20px;
}

.textprice {
	color: @blue;
	font-size: 1.3em;
	line-height: 1.3em;

	span {
		font-weight: bold;
		font-size: 1.5em;
		line-height: 1em;
	}

	label {
		margin-bottom: 0;
	}
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

.popUpOverlay {
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0px;
	bottom: 0px;
	width: 100%;
	z-index: 1010;
	display: flex;
	align-items: center;
	justify-content: center;
}

.popUpOverlay .popup {
	border-radius: 20px;
	width: 80%;
	min-height: 200px;
	background: rgb(0, 88, 111);
	background: linear-gradient(270deg, rgba(0, 88, 111, 1) 0%, rgba(0, 111, 139, 1) 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: white;
	padding: 30px;

}

.popUpOverlay .popup .picto {
	width: 150px;
	height: 150px;
	background: url('assets/images/danger.png') no-repeat center center;
	margin-top: 50px;
	margin-bottom: 50px;

}

.popUpOverlay .popup h3 {

	font-weight: bold;
	font-size: 1.7em;
	margin-bottom: 20px;
	white-space: nowrap;
}

.popUpOverlay .popup .text {
	font-weight: normal;
	font-size: 1.3em;
	line-height: 1.3em;
	text-align: center;
	margin-bottom: 20px;
}

.popUpOverlay .popup .textConfirm {
	font-weight: bold;
	font-size: 20px;
	line-height: 28px;
	text-align: center;
	margin-bottom: 20px;
}

.popUpOverlay .popup .textConfirm {
	font-weight: bold;
	font-size: 20px;
	line-height: 28px;
	text-align: center;
	margin-bottom: 20px;
}

.popUpOverlay .popup .btns {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	margin-bottom: 10px;
}

.popUpOverlay .popup .btns .btnY {
	width: 70px;
	height: 70px;
	border-radius: 70px;
	background: white;
	margin-right: 20px;
	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;
}

.popUpOverlay .popup .btns .btnY .picto {
	width: 70px;
	height: 70px;
	background: url('assets/images/checkmark.png') no-repeat center center;
	background-size: contain;
}

.popUpOverlay .popup .btns .btnN {
	width: 70px;
	height: 70px;
	border-radius: 70px;
	background: white;
	margin-left: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.popUpOverlay .popup .btns .btnN .picto {
	width: 70px;
	height: 70px;
	background: url('assets/images/crossmark.png') no-repeat;
	background-size: contain;
	cursor: pointer;
}

@media screen and (min-width:800px) {
	.popUpOverlay {
		position: absolute;
	}

	.popUpOverlay .popup h3 {
		margin-left: 0 !important;
	}
}
</style>