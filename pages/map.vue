<template>
  <div>
    <div class="map">
      <div class="mapContent"></div>
    </div>

		<div class="filter">
			<div class="aroundMeBtn">
				<div class="picto"></div>
				<div class="text">Autour de moi</div>	
			</div>
		
			<div class="input">
				<select name="" id="">
					<option value="">Par Ile</option>
					<option value="Bora Bora">Bora Bora</option>
					<option value="Tahiti">Tahiti</option>
					<option value="Fakarava">Fakarava</option>
					<option value="Morea">Morea</option>
				</select>
			</div>
		</div>

		<div class="closestClub">
			
      <SmallClub  distance="6" title="Scubatek" city="Puna'auia "  address="PK 17 - coté mer"/>
      <SmallClub  distance="12" title="Moanadiving" city="Paea" address=" PK 22 - coté mer" />
			

			
			
		</div>
    <CarouselClub />
		
  </div>
</template>

<script setup>
  const { $store } = useNuxtApp()
  const { state } = $store


  // $store.dispatch('jeux/fetchJeux')

  // const items= computed({
	// 	set: (val) => {},
	// 	get:() =>  state.jeux.jeux,
	// })

 
</script>

<style scoped lang="less">

@import '~static/less/variable.less';

div.map {
	width: 100%;
	// height: 500px;
	position: relative
}
div.map:after {
  content: "";
  display: block;
	padding-bottom:100%;
}
.mapContent{
  position: absolute;
  left: 0;right: 0;top: 0;bottom: 0;
	background: yellow;

}

div.filter {
	background: @blue;
	width: 80%;
  margin-left: 10%;
	height: 40px;
	padding: 5px 5px;
	margin-top: 20px;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

  .aroundMeBtn {
    background: @lightblue;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding : 5px 10px 5px 5px;

    .picto {
      background: yellow;
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
    .text {
      font-family: Montserrat;
      color: white;
      font-weight: 600;
    }
  }

  .input {
    background: @blue;
    // width: 250px;
    height: 30px;
    border-radius: 10px;
    position: relative;
    border: none;

    select {
      padding-right: 20px;
      width: 100%;
      height: 100%;
      background: @blue;
      border: none;
      color: white;
      outline: 0;
      font-size: 1.4em;
      line-height: 1.4em;

    }
  }
}


.closestClub {
	margin-top: 20px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	margin-bottom: 20px;
}




</style>