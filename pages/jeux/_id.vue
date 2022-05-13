<template>
<div>

	<div class="jeuHeader">
		<!-- <div class="logoJeux">
			<img :src="$config.apiURL +'image/'+ jeu.logos[0].filename" alt="">
		</div> -->
		
		<div class="logoJeux" v-if="jeu.logos">
				<img  :src="$config.apiURL + 'image/'+ jeu.logos[0]['filename']" alt="">
		</div>
		<div class="logoPartenaire" v-if="jeu.partenaire">
			<img  :src="$config.apiURL + 'image/'+ jeu.partenaire.logos[0]['filename']" alt="">
		</div>
	</div>
	<div class="content2">
		<div class="htmlcontent" v-html="jeu.description"></div>
	</div>
	<div class="cta">
		<p>Jeu polynésien 100% gratuit</p>
		<nuxt-link :to="'/inscriptions/'+jeu.url" class="button">JE JOUE</nuxt-link>
	</div>
	<div class="images">	
		<div v-for="image in jeu.images" :key="image.id">
			<img  :src="$config.apiURL + 'image/'+ image['filename']" alt="">
		</div>
    </div>
</div>
</template>
<script>
export default {
  layout: "secondary",
  auth: false
}
</script>
<script setup>

const { $store  } = useNuxtApp()
const { state } = $store
const route = useRoute()
console.log('$route.params.id=',route.params.id);
$store.dispatch('jeux/fetchJeu',{id:route.params.id})
let jeu = ref()
watchEffect(() => {console.log('watchEffect+++!'); jeu.value= state.jeux.currentJeu;console.log('jeu.value',jeu.value);})
	

</script>

<style lang="less">
@import '~static/less/variable.less';

.jeuHeader{
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding : 10px;
	position: relative;
	width: 100%;;

	.logoJeux{
		margin:20px;
		max-width:50%;
		img{width:100%}
	}
	.logoPartenaire{
		margin:20px;
		max-width:50%;
		img{width:100%}
	}
}
.htmlcontent{
	padding : 30px;

	p{
		margin-bottom: 0;
	}
	p.ql-align-center{
		text-align: center;
	}
}

.cta{
	padding : 10px 30px;
	text-align: center;
	p{
		text-align: center;
		color:@red;
		margin-bottom: 10px;
		font-size: 18px;
		font-weight: bold;
	}
	p.ql-align-center{
		text-align: center;
	}
	.button{
		background:@green;
		display: inline-block;
		border-radius:10px;
		color:white;
		font-size: 30px;
		font-weight: bold;
		padding:5px 30px;
		min-width: 80%;
	}
}
.images{
	padding : 10px 10px;
	position: relative;
	img{width: 100%;}
}


</style>