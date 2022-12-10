<template>
	<div class="blockhome2">
				<div class="text">Utiliser <br> mon pass</div>
				<div class="picto"></div>
				
			</div>
</template>
<script setup>

	  

const props = defineProps({

	qrcode: { type:String, default:'images/toto.jpg'},
  
})
</script>

<style lang="less">
@import '~static/less/variable.less';


.blockhome2 {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	background: white;
	border-radius: 30px;
	margin-top: 20px;
	padding: 10px;
	width:80%;
	margin-left: 10%;

	.text {
		font-size: 1.8em;
		font-weight: bold;
		text-align: center;
		line-height: 1.4em;
		color: @blue;
	}
	.picto {
		width: 100px;
		height: 100px;
		background: black;
	}
}

</style>