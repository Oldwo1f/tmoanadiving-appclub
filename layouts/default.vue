<template>
<div class="WRAPPER">
 
 <!-- <div class="logoplaystar">PLAYSTAR</div> -->
 <div class="headerplaystar">
     <img src="/playstar.png" alt="">
 </div>

    <div id="content" >
            <div class="contentPadding">
            <!-- <transition name="page"> -->
                <Nuxt v-if="!$slots.default" />
                <Slot />
            <!-- </transition> -->
            </div>
    </div>
    <div class="footerglobal">

    </div>
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

    .fade-enter-active, .fade-leave-active{
	transition: all 3sec
}
.fade-enter, .fade-leave-active{
	opacity:0;
	/* transform:scale(50%) */
}


.layout-enter-active, .layout-leave-active{
	transition: all 3sec
}
.layout-enter, .layout-leave-active{
	opacity:0;
	transform:scale(50%)
}
   .logoplaystar{
       background:olive;
       text-align: center;
       height : 70px;
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 30px;
       color:white;
   }
    #content{
        position: relative;
        width:100%;
        padding:0px 0px 0px 0px;
        transition: all 0.1s ease-out 0s;
        // transition: width 0.2s ease-in 0s;
        
        .contentPadding{
            padding:20px;width:100%;height:100%;
        }
    }

    .headerplaystar{
        width:100%;
        // background:olive;
        display: flex;
        align-items: center;
        justify-content: center;

        img{width:200px;margin: 10px 0px;}
    }


    body{
		background: #eee;
    position: absolute;
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
</style>