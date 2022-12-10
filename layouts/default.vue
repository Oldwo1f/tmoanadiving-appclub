<template>
<div class="WRAPPER">
    <Header />
    <!-- <Menu /> -->
    <div id="content">
        <Nuxt v-if="!$slots.default" />
        <Slot />
    </div>
    <BottomMenu />
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

<style scoped lang="less">
    @import '~static/less/variable.less';


    #content{
        background: white;
        position: relative;
        width:100%;
        height:100vh;
        padding:40px 0px 100px 0px;
        transition: all 0.1s ease-out 0s;
        // transition: width 0.2s ease-in 0s;
        overflow-y:auto;
        
    }



    body{
		background: #eee;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

	#__nuxt{
		height:100%;
        min-height:100vh;
	}#__layout{
		height:100%;
        min-height:100vh;
	}
	}
	.WRAPPER{
		position: fixed;
        top: 0;bottom: 0;
        left: 0;
        right: 0;
        font-size : 12px;
	}
    
    @media screen and (min-width:800px) {

        .WRAPPER{
            background: red;
            position: fixed;
            top: auto;bottom: auto;
            left: 50%;
            margin-left: -300px;
            right: auto;
            width : 600px;
            max-height : 100vh;
            border-left:2px solid @blue;
            border-right:2px solid @blue;
            margin-top: 0px;
            overflow-y: auto;

            header {
                position: absolute;
            }
            .bottomMenu {
                position: absolute;
            }
        } 
      
        
    }
</style>