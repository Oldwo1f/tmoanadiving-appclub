<template>
	<div class="WRAPPER">
				<nuxt />
		
		
	</div>
</template>

<script setup>
const { $store } = useNuxtApp()
const state = ref($store.state)
// console.log('$store.state.menuCollapsed init=',$store.state.menuCollapsed);
// const getMenuCollapsed = ()=>{
//   console.log('$store.menuCollapsed',$store.state.menuCollapsed);
//   return $store.state.menuCollapsed
// }

</script>

<style  lang="less">
	@import '~static/less/variable.less';
	body{
		background: #eee;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;

	#__nuxt{
		height:100%
	}#__layout{
		height:100%
	}
	}
	.WRAPPER{
		position: relative;
		left:50%;
		transform: translateX(-50%);
		max-width:500px;
		height:100%;
		background:white;
		text-align: center;
	}
	// .plainBG{
	// 	background: url("./assets/images/bg1.jpg") no-repeat center center;
    //     background-size: cover;
	// 	width:100vw;
	// 	height: 100vh;
	// 	position: relative;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// }

	// .leftBigBar{
		
	// 	// height: 400px;
	// 	width:400px;
	// 	background: rgba(255,255,255,0.5);
	// 	border-radius:5px;
	// }
</style>