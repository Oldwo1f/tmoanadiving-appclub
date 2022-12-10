<template>
	<div class="popupoverlay" v-if="props.open" @click="close">
		<div class="popup" @click.stop="stopclick">
			<h2>{{ props.title }}</h2>
			<hr>
			<p class="client"><strong>{{ props.content.firstName }} {{ props.content.lastName }}</strong></p>
			<p class="email">Email : <strong>{{ props.content.emailAddress }}</strong></p>

			<hr>
			<label for="">Nombre de plongée :</label> <input type="number" min="1" class="numberinput"
				v-model="nbPlongeur">
			<hr>
			<small>Valider la transaction retirera <br> <span v-if="nbPlongeur == 1">un crédit plongée sur le pass du
					client.</span><span v-else> {{ nbPlongeur }} crédits plongée sur le pass du client.</span></small>
			<br>
			<Alert />
			<br>

			<div class="btnValid" @click="validateTransaction">Valider la transaction</div>
		</div>
	</div>
</template>
<script setup>

console.log('HERE');


const props = defineProps({

	title: { type: String, default: 'ClubName' },
	content: { type: Object, default: {} },
	open: { type: Boolean, default: false },

})
console.log('props.open', props.open);
const nbPlongeur = ref(1)

const emit = defineEmits(['reponsepopup', 'closepopup'])

const validateTransaction = () => {
	console.log('validateid');

	emit('reponsepopup', nbPlongeur)

}
const close = function () {
	console.log('CLOSE');
	emit('closepopup', 'Close')
}
const stopclick = function () {
	console.log('stopclick');
	// emit('closepopup', 'Close')
}
</script>

<style lang="less">
@import '~static/less/variable.less';

.popupoverlay {
	background: rgba(0, 0, 0, 0.8);
	position: fixed;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100000;
	display: flex;
	align-items: center;
	justify-content: center;

	.popup {
		width: 80%;
		background: white;
		border-radius: 20px;
		padding: 20px;
		text-align: center;


		.client {
			font-size: 1.5em;
			margin-bottom: 0;
		}

		.email {
			font-size: 1.5em;
		}

		small {
			font-size: 1.5em;
			line-height: 1.5em;
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
			font-size: 1.4em;
			cursor: pointer;
		}
	}

	label {
		margin-bottom: 0;
	}

	span.number {
		display: inline-block;
		font-size: 2em;
		padding: 0px 3px 5px 3px;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		border: 1px dashed black;

		&.active {

			background: red;
		}
	}

	.numberinput {
		font-size: 2em;
		text-align: center;
		width: 60%;
	}
}
</style>