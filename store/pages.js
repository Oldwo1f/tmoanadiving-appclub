const axios = require('axios').default;

export const state = () => ({
	pagex: [],
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
	currentPage2: {},
})

export const getters = {
}

export const mutations = {
	setRows(state, payload) {
		console.log('SETROWS');
		console.log(state.pagex.length);
		state.rows = state.pagex.length;
	},
	setupTotalRows(state, payload) {
		console.log('setupTotalRows');
		console.log(state.pagex.length);
		state.totalRows = state.pagex.length;
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
		// state.rows = state.pagex.length
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
	setPages(state, payload) {
		console.log('setPages', payload);
		state.page = payload;
	},
	setCurentPage2(state, payload) {
		console.log('setCurentPage====>', payload);
		state.currentPage2 = payload;
	},
	setCurentPageImages(state, payload) {
		console.log('setCurentPageImages', payload);
		state.currentPage2.images = payload;
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
	async fetchPages(state, payload) {
		state.commit('setIsBusy', true)
		console.log('payload', payload);
		// setTimeout(async function () {
		const page = await axios.get(process.env.API_URL + 'pages')

		console.log('STORE ACTION');
		state.commit('setPage', page.data)
		state.commit('setRows')
		state.commit('setupTotalRows')
		state.commit('setIsBusy', false)
		// }, 1000)

	},
	async fetchPage(state, payload) {
		console.log('mypayload', payload);
		const page = await axios.get(process.env.API_URL + 'page/' + payload.url)

		console.log('STORE ACTION setCurentPage', page);
		state.commit('setCurentPage2', page.data)
	},

}