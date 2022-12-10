<template>
	<div class="blockhome1">
		<div class="redTitle">Crédit restant</div>
		<div class="number">{{props.credit}}</div>
		<div class="subtitlenumber">plongées</div>
		<div class="dateexpi">Date d'expiration : <strong>{{props.date}}</strong></div>
	</div>
</template>
<script setup>

	  

const props = defineProps({

	credit: { type:Number,default:0},
	date: { type:String,default:'00/00/0000'},
  
})
</script>

<style lang="less">
@import '~static/less/variable.less';


.blockhome1 {
	border-radius: 20px;
	background: white;
	width: 80%;
	margin-left: 10%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding-bottom: 15px;


	.redTitle {
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
		width: 100%;
		background: red;
		color: white;
		height: 40px;
		text-align: center;
		font-size: 1.5em;
		font-weight: bold;
		padding-top: 7px;
	}

	.number {
		margin-top: 15px;
		font-size: 5em;
		font-weight: bold;
		color: @blue;
		line-height: 0.7em;
	}

	.subtitlenumber {
		font-size: 1.2em;
		font-weight: bold;
		color: @blue;
		margin-bottom: 7px;
	}

	.dateexpi {
		font-size: 1.2em;
		font-weight: normal;
		color: @blue;
	}
}
</style>