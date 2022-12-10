<template>
	<div >
		
		<div class="textnoblock">
			<div class="text">Saisissez le numéro client</div>
		</div>
		<div class="blockidentifiant">
			<input type="text" v-model="idClient" placeholder="code client" />
			<input type="submit" value="Valider" @click="validateId" />
		</div>
		<div class="textnoblock">
			<strong>OU</strong>
		</div>
		
	</div>
</template>
<script setup>
const idClient = ref('');
const emit = defineEmits(['found'])

const validateId = () => {
	console.log('validateid');
	emit('found', idClient.value)

}
</script>

<style lang="less">
@import '~static/less/variable.less';
.textnoblock {
	margin-top: 20px;
	line-height: 40px;
	margin-bottom: 20px;
	color: white;
	font-size: 1.5em;
	text-align: center;
	font-weight: bold;
	color:@blue;
}

.blockidentifiant {
	width: 70%;
	margin-left:15%;
	margin-bottom: 20px;
	border-radius: 10px;
	color: white;
	font-weight: bold;
	text-align: center;
	
	// background: @blue;
	// background: linear-gradient(230deg, @blue 0%, @lightblue 100%);

	input[type="text"]{
		border: 5px solid red;
		padding: 5px 15px;
		width: 100%;
		border-radius: 20px;
		box-shadow:none;
		outline:0;
		text-align: center;
		font-weight: bold;
		color:@blue;
		text-transform: uppercase;
		font-size: 2em;

	}
	input[type="submit"]{
		background: red;
		padding: 10px 15px;
		width: 80%;
		// margin-left: 10%;
		border-radius: 50px;
		box-shadow:none;
		border:none;
		margin-top: 25px;
		outline:0;
		text-align: center;
		font-weight: bold;
		color:white;
		text-transform: uppercase;
		font-size: 1.8em;
	}
}



</style>