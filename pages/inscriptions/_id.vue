<template>
<div>

	<div class="jeuHeader">
		<div class="logoJeux" v-if="jeu.logos">
				<img  :src="$config.apiURL + 'image/'+ jeu.logos[0]['filename']" alt="">
		</div>
		<div class="logoPartenaire" v-if="jeu.partenaire">
			<img  :src="$config.apiURL + 'image/'+ jeu.partenaire.logos[0]['filename']" alt="">
		</div>
	</div>
	<div class="step1" v-if="step==1  && !done">

	
	<div class="cta">
		<p  class="p2"><strong>Inscrits toi gratuitement</strong> pour tenter ta chance</p>
		<p>Jeu polynésien 100% gratuit</p>
		
	</div>
	<div class="form" v-if="jeu.options">
			<ValidationObserver ref="form">
      <b-form @submit.prevent="onSubmit">
        <div class="row">
			<div class="col-md-12" v-if="jeu.options.lastName">
            <b-form-group>
              <ValidationProvider name="lastName" rules="required|alpha_spaces" v-slot="{ errors }">
               
                <b-input
                  type="text"
                  id="lastName"
                  v-model="formData.lastName"
                  placeholder="Nom"
                ></b-input>
				<span v-show="errors.length > 0" class="is-invalid">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </b-form-group>
          </div>
          <div class="col-md-12" v-if="jeu.options.firstName">
            <b-form-group>
              <ValidationProvider name="firstName" rules="required|alpha_spaces" v-slot="{ errors }">
               
                <b-input
                  type="text"
                  id="firstName"
                  v-model="formData.firstName"
                  placeholder="Prénom"
                ></b-input>
				<span v-show="errors.length > 0" class="is-invalid">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </b-form-group>
          </div>
          <div class="col-md-12" v-if="jeu.options.email">
            <b-form-group>
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors }"
              >
                
                <b-input
                  type="text"
                  id="email"
                  v-model="formData.email"
                  placeholder="Adresse email"
                ></b-input>
				<span v-show="errors.length > 0" class="is-invalid">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </b-form-group>
          </div>
          <div class="col-md-12" v-if="jeu.options.phone">
            <b-form-group>
              <ValidationProvider name="phone" rules="required|digits:8" v-slot="{ errors }">
                
                <b-input
                  type="text"
                  id="phone"
                  v-model="formData.phone"
                  placeholder="Téléphone mobile"
                ></b-input>
				<span v-show="errors.length > 0" class="is-invalid">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </b-form-group>
          </div>
        
			
          
		  <div class="col-md-12" v-if="jeu.options.city">
            <b-form-group>
              <ValidationProvider name="city" rules="required|alpha_spaces" v-slot="{ errors }">
               
                <b-input
                  type="text"
                  id="city"
                  v-model="formData.city"
                  placeholder="Ville"
                ></b-input>
				<span v-show="errors.length > 0" class="is-invalid">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </b-form-group>
          </div>
		  <div class="col-md-12" v-if="jeu.options.adresse">
            <b-form-group>
              <ValidationProvider name="address" rules="required" v-slot="{ errors }">
               
                <b-input
                  type="text"
                  id="address"
                  v-model="formData.address"
                  placeholder="Adresse"
                ></b-input>
				<span v-show="errors.length > 0" class="is-invalid">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </b-form-group>
          </div>
		  <div class="col-md-12" v-if="jeu.options.sexe">
            <b-form-group>
              <ValidationProvider name="gender" rules="required" v-slot="{ errors }">
               
                <b-form-select
                  type="text"
                  id="gender"
                  v-model="formData.gender"
                  placeholder="Genre"
				  :options="genderOptions"
                >
				<template #first>
					<b-form-select-option :value="null" disabled> Genre</b-form-select-option>
				</template>
				</b-form-select>
				<span v-show="errors.length > 0" class="is-invalid">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </b-form-group>
          </div> <div class="col-md-12" v-if="jeu.partenaire">
            <b-form-group>
              <ValidationProvider name="optin" rules="required" v-slot="{ errors }">
               
				<b-form-checkbox
      id="checkbox-1"
      v-model="formData.optin"
      name="checkbox-1"
      value="true"
      unchecked-value="false"
    >
      J'accepte de recevoir les offres de {{ jeu.name }}
    </b-form-checkbox>
				<span v-show="errors.length > 0" class="is-invalid">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </b-form-group>
          </div>
        </div>
        

        <div class="row">
          <div class="col-md-12 formFooter">
            <b-btn class="button" type="submit"
              >Passer à l'étape 2/2</b-btn
            >
          </div>
        </div>
      </b-form>
    </ValidationObserver>
	</div>
</div>
<div class="step2" v-if="step==2 && !done">
	<div class="cta">
		<p  class="p2"><strong>Partage sur les réseaux</strong> pour finaliser ton inscription</p>
		<p>{{ jeu.nbPartage }} partages requis</p>
		
	</div>
	<div class="fb-share-button" 
data-href="https://www.your-domain.com/your-page.html" 
data-layout="button_count">
</div>
	
	<div class="shareBtn">
		<b-btn class="button buttonflex" variant="info" @click="openshare">
			<span class="material-icons">share</span> <span>Partager</span></b-btn>
	</div>
	<div class="shareProgress">
		<b-progress :max="jeu.nbPartage" height="2rem">
      <b-progress-bar :value="nbProgress" variant="danger">
        <span><strong>{{ nbProgress }} / {{ jeu.nbPartage }}</strong></span>
      </b-progress-bar>
	  
    </b-progress>
	<div class="reste">Reste {{ (jeu.nbPartage - nbProgress )}} <span v-if="(jeu.nbPartage - nbProgress)>1">partages</span><span v-else>partage</span></div>
	<div class="minitext">Afin que votre inscription soit valide, vous devez partager au minimum {{ jeu.nbPartage }} fois ce jeu avec vos amis. Notre système enregistre vos partages et seront vérifiés par l'huissier au moment du tirage.
	</div>
	</div>

	<div class="finalisation">
		<p>Une fois vos {{ jeu.nbPartage }} partages éffectués, validez votre inscription !</p>
		<b-button class="button" @click="validateInscription" v-if="!validationProgress" :disabled="(jeu.nbPartage - nbProgress)>0">Valider mon inscription</b-button>
		<div class="spinner" v-if="validationProgress"><b-spinner label="Loading..."></b-spinner></div>
	</div>
</div>
<div class="done" v-if="done">
	<div class="bravo">BRAVO</div>
	<div v-html="jeu.finalContent"></div>
	<p class="p2">Découvre notre annonceur :</p>
	<div class="annonce"  v-if="jeu.partenaire">
		<a :href="jeu.partenaire.url" target="_BLANK">
			<img  :src="$config.apiURL + 'image/'+ jeu.partenaire.images[0]['filename']" alt="">
		</a>
	</div>
	<div class="autreJeux">
		<nuxt-link to="/" class="button"> Voir nos autres jeux</nuxt-link>
		<nuxt-link to="/" class="button"> Voir les gagnants</nuxt-link>
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

const { $store,$axios  } = useNuxtApp()
const { state } = $store
const route = useRoute()
console.log('$route.params.id=',route.params.id);
$store.dispatch('jeux/fetchJeu',{id:route.params.id})
let jeu = ref()
let step = ref(1)
let nbProgress = ref(1)
let done = ref(false)
let formData = ref({gender:null, optin:false,email:'toto@toto.fr'})

watchEffect(() => {console.log('watchEffect+++!'); jeu.value= state.jeux.currentJeu;console.log('jeu.value',jeu.value);})
	

const genderOptions = ref([
	{value:"male",text:'Homme'}, 
	{value:"female",text:'Femme'},
	{value:"other",text:'Autre'}
])
let validationProgress = ref(false)

//tt
// const onSubmit = function(){

// 	console.log('ONSUBMIT');
// 	step.value=2;
// }
const onSubmit = function(){ 
      let self = this;
      this.$refs.form.validate().then((success) => {
        if (!success) {
          console.log("NOT VALID !! !");
          return;
        }
		step.value=2;
        
      });
    };

 const openshare = function(){
	 console.log('open share');
	 console.log(jeu.value.name);
      if (navigator.share) {
        navigator
          .share({
            title: jeu.value.name,
            url:
              "https://app.creapassionprod.com/jeu/" + jeu.value.url,
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch(console.error);
      } else {
        // fallback
      }
	  nbProgress.value ++;
    }


	const validateInscription = async function(){
		validationProgress.value= true;
		console.log('validateInscription');
		console.log('formData',formData);

		
        $axios
          .post(
            process.env.API_URL +
              "jeu/inscription/"+jeu.value.id,
            formData.value,
          )
          .then(function (response) {
            console.log("YO COOL");
			console.log(response);
			validationProgress.value= false;
			done.value= true;
            console.log(self.data.datas.id);

            self.$router.push({
              name: "inscriptionconfirm",
              query: { gameid: self.data.datas.id },
            });
          })
          .catch(function (error) {
			  validationProgress.value= false;
            self.alertStatus = "danger";
            self.alertText = "Une erreur s'est produite";
          });
      
   
	}
</script>
<script>(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>


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
	.p2{
		text-align: center;
		color:black;
		margin-bottom: 10px;
		font-size: 16px;
		font-weight: normal;
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

.form form{
	// max-width:400px;
	padding:20px;
	.form-group{
		position: relative;
		padding-bottom: 10px;
	}

	input, input:focus, input:active{
		color:white;
		background:@red;
		border-color:@red;
		font-weight: bold;
	}
	input::placeholder{
		color:white;
	}
	select, select:focus, select:active{
		color:white;
		background:@red;
		border-color:@red;
		font-weight: bold;
	}
	select::placeholder{
		color:white;
	}
	.is-invalid{
		font-size: 12px;
		color:red;
		margin-bottom: -10px;
		position: absolute;
		bottom: 0;
		left: 0;
		padding-left: 5px;
	}
	
}
.formFooter{
	text-align: center;
	.button{
		background:@green;
		display: inline-block;
		border-radius:10px;
		color:white;
		font-size: 22px;
		font-weight: bold;
		padding:5px 30px;
		min-width: 80%;
	}
}
.step2{
	text-align: center;
	.button{
		display: inline-block;
		border-radius:10px;
		color:white;
		font-size: 18px;
		font-weight: bold;
		padding:5px 10px;
		min-width: 50%;
	}
	.buttonflex{
	display: inline-flex;
	align-items: center;
	justify-content: center;
		span:first-child{
			margin-right:5px;
		}
	}

	.shareProgress{
		// max-width:400px;
		padding:20px 40px;
	}
	.progress-bar.bg-danger{
		background:@red !important;
	}
	.minitext{
		font-size: 12px;
		margin-top: 10px;
	}
	.minitext2{
		font-size: 12px;
		margin-top: 10px;
	}
	.finalisation{
		// max-width:400px;
		padding:20px 30px;
	
	.button{
		background:@green;
		display: inline-block;
		border-radius:10px;
		color:white;
		font-size: 25px;
		font-weight: bold;
		padding:5px 15px;
		min-width: 80%;
	}
	}
}
.done{

	padding : 10px 30px;
	text-align: center;
	p{
		text-align: center;
		color:black;
		margin-bottom: 10px;
		font-size: 18px;
		font-weight: bold;
	}
	.p2{
		text-align: center;
		color:black;
		margin-bottom: 10px;
		font-size: 12px;
		font-weight: normal;
	}
	.bravo
	{
		text-align: center;
		color:@red;
		margin-bottom: 0px;
		font-size: 25px;
		font-weight: bold;
	}
	.annonce{
		img{width:100%;}
	}
}
.autreJeux{
	margin-top:40px;
	.button{
	margin-top:10px;
		background:@green;
		display: inline-block;
		border-radius:2px;
		color:white;
		font-size: 22px;
		font-weight: bold;
		padding:5px 15px;
		min-width: 80%;
	}	
}
</style>