<template>
	<div class="bottomMenu">

		<nuxt-link to="/stats" class="button button4"></nuxt-link>
		<nuxt-link to="/qrcode" class="button button3"></nuxt-link>
		<nuxt-link to="/vendre" class="button button1"></nuxt-link>
		<nuxt-link to="/client" class="button button5"></nuxt-link>
		<nuxt-link to="/club" class="button button2"></nuxt-link>
	</div>
</template>
<script setup>

	  

const props = defineProps({


  
})
</script>

<style lang="less">
@import '~static/less/variable.less';



.bottomMenu {
	display: block;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	height: 40px;
	background: @blue;
	background: linear-gradient(270deg, @blue 0%, @lightblue 100%);
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	.button {
		width: 24px;
		height: 24px;

	}
	.button1 {
		background: url('assets/images/vendre blanc.png') no-repeat;
		background-size: contain;

		&.nuxt-link-exact-active{
			background: url('assets/images/vendre jaune.png') no-repeat;
			background-size: contain;
		}
		
	}

	.button2 {
		background: url('assets/images/plonge blanc.png') no-repeat center center;
		background-size: contain;
		width: 30px;
		height: 30px;
		&.nuxt-link-exact-active{
			background: url('assets/images/plonge jaune.png') no-repeat  center center;
			background-size: contain;
		}
	}

	.button3 {
		background: url('assets/images/qr code blanc.png') no-repeat;
		background-size: contain;
		&.nuxt-link-exact-active{
			background: url('assets/images/qr code jaune.png') no-repeat;
			background-size: contain;
		}
	}

	.button4 {
		background: url('assets/images/stat blanc.png') no-repeat;
		background-size: contain;
		&.nuxt-link-exact-active{
			background: url('assets/images/stat jaune.png') no-repeat;
			background-size: contain;
		}
	}
	.button5 {
		background: url('assets/images/profil blanc.png') no-repeat;
		background-size: contain;
		

		&.nuxt-link-exact-active{
			background: url('assets/images/profil jaune.png') no-repeat;
			background-size: contain;
		}
	}

}


</style>