<template>
	<div>
		<div class="center">

			<div class="logo" v-if="club.logos" style="margin-top:20px;margin-bottom: 10px;">
				<img :src="$config.apiURL + 'image/' + club.logos[0].filename" alt="">
			</div>

			<h1>Stat des ventes et reversion</h1>

			<div class="squares">
				<div class="square">
					<h2>Total du mois <br>en cours a reverser</h2>
					<small class="red" style="text-transform: capitalize;">{{ $dayjs().format('MMMM') }}</small>
					<div class="number red">{{ $formatnumber(Number(stats2.totalPlongeeMoneyReverse)) }} F</div>
					<small class="red">{{ stats2.nbResidentReverse }} RES / {{ stats2.nbTouristeReverse }} INTER</small>
				</div>
				<div class="square">
					<h2>Total du mois <br>en cours a recevoir</h2>
					<small class="blue" style="text-transform: capitalize;">{{ $dayjs().format('MMMM') }}</small>
					<div class="number blue">{{ $formatnumber(Number(stats2.totalReceive)) }} F</div>
					<small class="blue">{{ stats2.nbResidentReveive }} RES / {{ stats2.nbTouristeReveive }}
						INTER</small>
				</div>
				<div class="square">
					<h2>Nombre de plongées</h2>
					<!-- <small class="red">Septembre</small> -->
					<div class="line mt">
						<div class="text">Effectuées <br>sur l'année</div>
						<div class="number">{{ stats.thisYears }}</div>
					</div>
					<div class="separator"></div>
					<div class="line">
						<div class="text">Effectuées <br>ce mois</div>
						<div class="number">{{ stats.thisMonth }}</div>
					</div>
				</div>
				<div class="square">
					<h2>Total commission <br>vente du pass</h2>
					<!-- <small class="red">Septembre</small> -->
					<div class="number blue mt">{{ $formatnumber(Number(stats.passvenduCom)) }} F</div>
					<small class="blue">{{ stats.passvenduR }} RES / {{ stats.passvenduT }} INTER</small>
				</div>
			</div>

			<h1>Télécharger les factures</h1>


			<!-- <div class="download" @click="dlMonthlyFactures">Download</div> -->
			<div class="blockfactures">

				<div class="infobtn">
					info
				</div>
				<div class="info">
					Les factures sont générées et envoyés à tous les clubs tous les premiers du mois suivant. Elles
					cumulent de manière automatique toute l’activité réalisé sur la période, ventilée par club ou agence
					de voyage.
					<br>
					Sur vos factures A PAYER, vous aurez toutes les factures des plongées réalisés par les clubs sur les
					pass que vousavez vendus et encaissés
					<br>
					Sur les factures A PERCEVOIR, vous aurez toutes les factures des plongées que vous avez réalisés sur
					les pass vendus par les clubs et agence de voyage.
				</div>

				<div class="nofacture">
					Aucune facture pour le moment. <br>
					Les Factures sont automatiquement calculer le 1er de chaque mois à 00H00. <br>

				</div>
				<div class="blockfacture">
					<a :href="$config.apiURL + 'facture/dlfacturesapayer/' + $auth.user.id + '/' + $dayjs().valueOf()"
						class="facture facturered">
						<span class="big">{{ $dayjs().format('MMMM') }} - à Payer</span>
						<br>
						<small> Télécharger les factures </small>
					</a>
				</div>
				<div class="blockfacture">
					<a :href="$config.apiURL + 'facture/dlfactures/' + $auth.user.id + '/' + $dayjs().valueOf()"
						class="facture factureblue">
						<span class="big">{{ $dayjs().format('MMMM') }} - à percevoir</span>
						<br>
						<small> Télécharger les factures </small></a>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script setup>
import CarouselClub from '../components/CarouselClub.vue';
const { $store, $auth, $axios, $config, $dayjs } = useNuxtApp()
const { state } = $store

const club = ref({});
const stats = ref({});
const stats2 = ref({});
// club.value = $auth.user 
console.log($auth.user.id);
const addCurrentPart = async function () {
	await $store.dispatch('partenaires/addCurrent', { part: $auth.user })

}
const addCurrentStats = async function () {
	await $store.dispatch('partenaires/addCurrentStats', { id: $auth.user.id })
	await $store.dispatch('partenaires/addCurrentStats2', { id: $auth.user.id })

}
// console.log('club',club);
if (!club.value.name) {
	console.log('ici');
	addCurrentPart();
}
addCurrentStats();

watchEffect(() => { console.log('watchEffect'); club.value = { ...state.partenaires.currentPartenaire } })
watchEffect(() => { console.log('watchEffect'); stats.value = { ...state.partenaires.currentStats } })
watchEffect(() => { console.log('watchEffect'); stats2.value = { ...state.partenaires.currentStats2 } })



const dlMonthlyFactures = async () => {

	console.log('dlMonthlyFactures');
	console.log($dayjs().valueOf());

	//  const result = await $axios.post($config.apiURL+'partenaire/dlfactures/'+$auth.user.id+ $dayjs().valueOf(), {month: }).then(function (res) {
	// 		console.log('FINI');
	// 		console.log(res);
	// 		return res.data
	// 	})


}


</script>
  
<style scoped lang="less">
@import '~static/less/variable.less';

.logo {
	position: relative;
	width: 120px;
	background: rgba(255, 255, 255, 0.6);
	text-align: center;
	left: 50%;
	margin-left: -60px;
	margin-bottom: -20px;

	img {
		width: 100%;
	}

}

div.center {
	text-align: center;
}

h1 {
	font-size: 1.4em;
	text-transform: uppercase;
	text-align: center;
	color: @blue;
	margin-top: 20px;
	font-weight: bold;
}

.squares {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: wrap;

	.square {
		flex-grow: 1;
		max-width: 45%;
		margin-bottom: 10px;
		aspect-ratio: 4/3.5;
		;
		border: 2px solid @blue;
		border-radius: 20px;

		h2 {
			font-size: 1em;
			text-transform: uppercase;
			font-weight: bold;
			color: @blue;
			margin-top: 10px;
			margin-bottom: 0;
		}

		.red {
			color: red;
		}

		.blue {
			color: @kingblue;
		}

		.number {
			margin: 7px 0px;
			font-size: 2.2em;
			font-weight: bold;
		}

		small {
			font-size: 1em;
		}

		.separator {
			height: 1px;
			background: lightgrey;
			width: 90%;
			margin-left: 10px;
		}

		.mt {
			margin-top: 20px
		}

		.line {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: no-wrap;
			margin: 0 10px;

			&.mt {
				margin-top: 10px
			}


			.text {
				text-align: left;
				font-size: 1em;
				text-transform: uppercase;
				color: @blue;
				margin-top: 10px;
				margin-bottom: 0;
			}

			.number {
				padding-right: 10px;
				margin: 0;
				color: @blue;
				margin-top: 10px;
			}
		}
	}
}

.blockfactures {
	//  background: red;
	width: 80%;
	margin-left: 10%;
}

.blockfacture {
	border: 1px solid black;
	border-radius: 5px;
	;
	display: block;
	margin-bottom: 10px;
	padding: 5px;
}

.big {
	text-transform: uppercase;
	font-size: 1.3em;
}

.facturered {
	color: red;
}

@media screen and (min-width:800px) {
	.squares .square {
		min-width: 45%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 1.5em;
	}
}
</style>
