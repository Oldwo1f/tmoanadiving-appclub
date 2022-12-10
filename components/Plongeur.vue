<template>
	<div class="plongeur">
		<div class="header">
			<div class="picto" :class="{ 'second' :props.type=='second'}"></div>
			<div class="text" v-if="props.type=='first'">Plongeur principal</div>
			<div class="text" v-if="props.type=='second'">Plongeur secondaire</div>
			<div class="button">Modifier</div>
		</div>
		<div class="contenu">
			<div class="line"><label for="">Nom</label> <span> Momcilovic</span></div>	
			<div class="line"><label for="">Prénom</label> <span>Alexis</span></div>	
			<div class="line"><label for="">Date de naissance</label> <span>09/02/1990</span></div>	
			<div class="line"><label for="">Téléphone</label> <span>89 56 06 27</span></div>	
			<div class="line"><label for="">Mail</label> <span>alexismomcilovic@gmail.com</span></div>	
			<div class="line"><label for="">Lieu de résidence</label> <span> Punaauia</span></div>	
			<div class="line"><label for="">Niveau</label> <span> 1 </span></div>	
		</div>
	</div>
</template>
<script setup>

	  

const props = defineProps({

	type: { type:String,default:'first'},
  
})
</script>

<style lang="less">
@import '~static/less/variable.less';

.plongeur {
	width: 80%;
	margin-left: 10%;
	text-align: center;
	margin-top: 20px;
	color: @blue;
	position: relative;


	.header {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 10px;
	}

	.header .picto {
		width: 40px;
		height: 40px;
		background: url('assets/images/plongeur principal.png') no-repeat;
		background-size: contain;
		margin-right: 20px;

		&.second{
			background: url('assets/images/plongeur secondaire.png') no-repeat;
			background-size: contain;
		}
	}

	.header .text {
		font-size: 1.5em;
		font-weight: bold;
	}

	.header .button {
		font-size: 1em;
		font-weight: normal;
		position: absolute;
		right: 0px;
	}


	.contenu {
		text-align: left;
	}

	.line {
		margin-bottom: 0px;
		line-height: 0.9em;
	}

	.contenu label {
		margin-left: 60px;
		font-size: 1.2em;
		font-weight: normal;
	}

	.contenu label:after {
		content: " :";
		font-size: 1.1em;
		font-weight: normal;
	}
	.contenu span {
		font-size: 1.1em;
		font-weight: normal;
		margin-left: 15px;
	}
}
</style>