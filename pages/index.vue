<template>
  <div>
    <h1>Home Playstar</h1>
    <p>Todo : Creer une page d'accueil pour la marque play star. qui explique le concepte au client.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut voluptas quia, dicta deserunt recusandae magni aliquam. Perferendis dolorem error explicabo id nulla voluptatum, culpa sed, debitis in unde, exercitationem molestias?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut voluptas quia, dicta deserunt recusandae magni aliquam. Perferendis dolorem error explicabo id nulla voluptatum, culpa sed, debitis in unde, exercitationem molestias?</p>
  
    <h2>Nos jeux du moment</h2>

    <div class="gamelist">
      <div class="game" v-for="jeu in items" :key="jeu.id">
        <nuxt-link :to="'/jeux/'+jeu.url">
          <h4>{{jeu.name}}</h4>
          <img v-if="jeu.images[0]" :src="$config.apiURL + 'image/'+ jeu.images[0].filename" alt="">
        </nuxt-link>
        <!-- <div class="description" v-html="jeu.description">
        </div> -->
        <!-- <div class="images">
          <div class="image" v-for="image in jeu.images" :key="image.id">
            <img :src="$config.apiURL +'image/'+ image.filename" alt="">
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
  const { $store } = useNuxtApp()
  const { state } = $store
  // console.log('$auth=',$auth.loggedIn);
  // console.log('$auth=',$auth.user);


  $store.dispatch('jeux/fetchJeux')

  const items= computed({
		set: (val) => {},
		get:() =>  state.jeux.jeux,
	})
  // const state = ref($store.state)
  // console.log('$store.state.menuCollapsed init=',$store.state.menuCollapsed);
  // const getMenuCollapsed = ()=>{
  //   console.log('$store.menuCollapsed',$store.state.menuCollapsed);
  //   return $store.state.menuCollapsed
  // }
 
</script>

<style scoped lang="less">
.toto{
  position:fixed;
  bottom : 50px;
  right:50px;
}

.game{
  h4{
    color:black;
    text-align: center;
  }
  img{
    max-width:100%;
    margin-bottom: 20px;
  }
}
</style>