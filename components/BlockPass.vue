<template>
	<div class="blockPassTemo">
			<h2>Mon pass Temoana</h2>
			<small>Il vous reste</small>
			<div class="number">7</div>
			<div class="subtitlenumber">plongées</div>
			<div class="dateexpi">à utiliser avant le <strong>17 avril 2022</strong></div>

	</div>
</template>
<script setup>

	  

const props = defineProps({

	distance: { type:Number,default:2},
	title: { type:String,default:'ClubName'},
	city: { type:String,default:'Clubcity'},
	address: { type:String,default:'ClubAddress'},
	imageUrl: { type:String,default:'ClubAddress'},
  
})
</script>

<style lang="less">
@import '~static/less/variable.less';

.blockPassTemo {
	width: 90%;
	margin-left: 5%;
	margin-top: 20px;
	border-radius: 20px;
	color: white;
	background: @blue;
	background: linear-gradient(0deg, @blue 0%, @lightblue 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;

	h2 {
		font-size: 2.2em;
		font-weight: bold;
		text-transform: uppercase;
		margin-bottom: 0px;
	}
	small {
		font-size: 1.5em;
		font-weight: normal;
		text-transform: uppercase;
	}
	.number {
		font-size: 3.5em;
		font-weight: bold;
		text-transform: uppercase;
		margin: 0px 0px;
		line-height: 1em;
	}
	.subtitlenumber {
		font-size: 2em;
		font-weight: bold;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
	.dateexpi {
		font-size: 1em;
		font-weight: normal;
		strong {
			font-size: 1em;
			font-weight: bold;
		}
	}
}


</style>