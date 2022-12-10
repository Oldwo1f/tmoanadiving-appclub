<template>
	<div class="carouselClub">
		<div class="text">Plus de 14 centre de plongées en Polynésie française</div>
		<div class="slider">
			<div class="logoclient"></div>
			<div class="logoclient"></div>
			<div class="logoclient"></div>
		</div>
	</div>
</template>
<script setup>

	  

const props = defineProps({

})
</script>

<style lang="less">
@import '~static/less/variable.less';
.carouselClub {
	background: white;
	width: 100%;
	text-align: center;
	padding-top: 5px;
	padding-bottom: 5px;
	.text {
		font-size: 1.2em;
		color: @blue;

	}

	.slider {
		margin-top: 10px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		.logoclient {
			width: 60px;
			height: 60px;
			background: orange
		}
	}

}
.lepass {

	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	background: white;
	border-radius: 30px;
	margin-top: 50px;
	padding: 15px 20px;
	background: @lightblue;
	text-transform: uppercase;
	width: 70%;
	margin-left: 15%;



	.text {
		font-size: 1.5em;
		font-weight: bold;
		text-align: center;
		line-height: 0.8em;
		color: white;
		margin-right: 15px;
	}

	.picto {
		width: 20px;
		height: 20px;
		background: url('assets/images/profil blanc.png') no-repeat;
		background-size: contain;
	}
}
</style>