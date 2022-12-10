<template>
	<header>
			<nuxt-link to="/"><div class="logo"></div></nuxt-link> 
		<!-- <div class="menuBtn"></div>
		<div class="closeenuBtn"></div> -->
		<!-- <div class="deco"></div> -->
		<!-- <div class="button_collaps_menu" @click="toogleColapsed">
			<span class="material-icons" v-if="!state.global.menuCollapsed">menu</span>
			<span class="material-icons" v-if="state.global.menuCollapsed">menu_open</span>
		</div> -->
	</header>
</template>
<script setup>

const { $store ,$router ,$axios, $dayjs} = useNuxtApp()
  const { state } = $store

const props = defineProps({

  
})

const toogleColapsed = ()=>{
    $store.dispatch('global/toogleMenuCollapsed')
}
  
</script>

<style lang="less">
@import '~static/less/variable.less';

 .button_collaps_menu{
	position: absolute;
	right : 10px;
      margin:0px 10px;
      width: 30px;
      height: 30px;
      padding-top: 3px;
	  color:white;
      // background:olive;
      text-align: center;
      cursor: pointer;
      span{
      width: 24px;
      height: 24px;
      // background:blue;
      }
    }


header {
	z-index:990;
	display: block;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	height: 40px;
	background: @blue;
	background: linear-gradient(180deg, @blue, @lightblue 100%);
	display: flex;
	align-items: center;
	justify-content: center;


	.logo {
		background: url('assets/images/logo/logo nav.png') no-repeat center center;
		background-size: contain;
		width: 200px;
		height : 30px;
	}
	.deco {
		position: absolute;
		right: 20px;
		top: 20px;
		background: url('assets/images/deco.png') no-repeat;
		background-size: contain;
		width: 27px;
		height: 16px;
	}
	.menuBtn {
		position: absolute;
		right: 20px;
		top: 20px;
		background: url('assets/images/menu.png') no-repeat;
		background-size: contain;
		width: 27px;
		height: 16px;
	}
	.closeenuBtn {
		position: absolute;
		right: 20px;
		top: 15px;
		background: url('assets/images/close.png') no-repeat;
		background-size: contain;
		width: 30px;
		height: 30px;
	}
}


</style>