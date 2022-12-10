<template>
	<div class="club">
		<div class="distance">{{props.distance}} km</div>
		<div class="infos">
			<div class="title">{{props.title}}</div>
			<div class="subtitle"> {{props.city}}
			<br> {{props.address}}</div>
		</div>
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

.club {
	border-radius: 20px;
	background: orangered;
	// height: 350px;
	aspect-ratio: 2/3;
	width: 40%;
	position: relative;


	.distance {
		border-radius: 20px;
		padding: 7px 10px;
		background: @lightblue;
		font-weight: bold;
		color: white;
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.infos {
		border-radius: 20px;
		padding: 15px 0px;
		background: white;
		font-weight: bold;
		position: absolute;
		bottom: -1px;
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
		width: 100%;

		.title {
			padding-left: 15px;
			font-weight: bold;
			margin-bottom: 10px;
			;
		}
		.subtitle {
			padding-left: 15px;
			font-weight: normal;
		}
	}
}
</style>