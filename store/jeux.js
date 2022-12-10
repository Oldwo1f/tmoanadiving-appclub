const axios = require('axios').default;

export const state = () => ({
	jeux: [],
	currentPage: 1,
	perPage: 25,
	totalRows: 1,
	filterOn: [],
	sortBy: 1,
	pageOptions: [10, 25, 50, 100],
	filter: null,
	sortBy: 'age',
	sortDesc: false,
	rows: 1,
	isBusy: false,
	currentJeu: {},
	currentGagnantList: [],
})

export const getters = {
}

export const mutations = {
	setRows(state, payload) {
		console.log('SETROWS');
		console.log(state.jeux.length);
		state.rows = state.jeux.length;
	},
	setupTotalRows(state, payload) {
		console.log('setupTotalRows');
		console.log(state.jeux.length);
		state.totalRows = state.jeux.length;
	},
	setSortBy(state, payload) {
		console.log('SETSORTBY', payload);
		state.sortBy = payload;
		// state.commit('setRows')
	},
	setSortDesc(state, payload) {
		state.sortDesc = payload;
	},
	setCurrentPage(state, payload) {
		state.currentPage = payload;
	},
	setPerPage(state, payload) {
		console.log('setPerPage', payload);
		state.perPage = payload;
	},
	setFilter(state, payload) {
		console.log('setFilter', payload);
		state.filter = payload;
		// state.rows = state.jeux.length
		// console.log('state.rows=', state.rows);
	},
	setFilterOn(state, payload) {
		console.log('setFilterOn', payload);
		state.filterOn = payload;
	},
	setTotalRows(state, payload) {
		console.log('setTtotalRows', payload);
		state.totalRows = payload;
	},
	setJeux(state, payload) {
		console.log('setJeux', payload);
		state.jeux = payload;
	},
	setCurentJeu(state, payload) {
		console.log('setCurentJeu====>', payload);
		state.currentJeu = payload;
	},
	setCurentGagantList(state, payload) {
		console.log('setCurentGagantList====>', payload);
		state.currentGagnantList = payload;
	},
	setCurentJeuImages(state, payload) {
		console.log('setCurentJeuImages', payload);
		state.currentJeu.images = payload;
	},
	setIsBusy(state, payload) {
		console.log('setIsBusy', payload);
		state.isBusy = payload;
	},

}


export const actions = {
	// toogleMenuCollapsed(state) {

	// 	console.log('STORE ACTION');
	// 	state.commit('toogleMenuCollapsed')
	// },
	async fetchJeux(state, payload) {
		state.commit('setIsBusy', true)
		console.log('payload', payload);
		// setTimeout(async function () {
		const jeux = await axios.get(process.env.API_URL + 'jeux')

		console.log('STORE ACTION');
		state.commit('setJeux', jeux.data)
		state.commit('setRows')
		state.commit('setupTotalRows')
		state.commit('setIsBusy', false)
		// }, 1000)

	},
	async fetchJeu(state, payload) {
		console.log('mypayload', payload);
		const jeu = await axios.get(process.env.API_URL + 'jeu/' + payload.id)

		console.log('STORE ACTION setCurentJeu', jeu);
		state.commit('setCurentJeu', jeu.data)
	},
	async fetchJeuxGagnant(state) {
		// console.log('mypayload', payload);
		const jeux = await axios.get(process.env.API_URL + 'jeu/fetchJeuxGagnant')

		console.log('STORE ACTION setCurentGagantList', jeux);
		state.commit('setCurentGagantList', jeux.data)
	},

}