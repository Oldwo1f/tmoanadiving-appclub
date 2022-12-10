<template>
	
	<div class="footerjeux">

		<div class="link_container">
			<nuxt-link :to="'/desabonnement/'+props.idjeu"><small>Se désabonner de cet annonceur</small></nuxt-link> | <nuxt-link to="/"><small>Voir nos autres jeux</small></nuxt-link>
		</div>
	</div>
</template>
<script setup>

	  

const props = defineProps({

	idjeu: { type:String,
		 default:':id'
  },
  
})
</script>
<style lang="less">
@import '~static/less/variable.less';


.link_container{
	background:@lightgrey;

	a{color:black;}
}
</style>