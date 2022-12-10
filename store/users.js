const axios = require('axios').default;
// const env = require('dotenv');

export const state = () => ({
	users: [],
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
	currentUser: {},
	userFounded: {},
	userError: null,
})

export const getters = {
}

export const mutations = {
	setRows(state, payload) {
		console.log('SETROWS');
		console.log(state.users.length);
		state.rows = state.users.length;
	},
	setupTotalRows(state, payload) {
		console.log('setupTotalRows');
		console.log(state.users.length);
		state.totalRows = state.users.length;
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
		// state.rows = state.users.length
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
	setUsers(state, payload) {
		console.log('setUsers', payload);
		state.users = payload;
	},
	setCurentUser(state, payload) {
		console.log('setCurentUser', payload);
		state.currentUser = payload;
	},
	setUserFounded(state, payload) {
		console.log('setUserFounded', payload);
		state.userFounded = payload;
	},
	setIsBusy(state, payload) {
		console.log('setIsBusy', payload);
		state.isBusy = payload;
	},
	setUserError(state, payload) {
		console.log('setUserError', payload);
		state.userError = payload;
	},

}


export const actions = {
	// toogleMenuCollapsed(state) {

	// 	console.log('STORE ACTION');
	// 	state.commit('toogleMenuCollapsed')
	// },
	async fetchUsers(state, payload) {
		state.commit('setIsBusy', true)
		console.log('payload', payload);
		// setTimeout(async function () {
		const users = await axios.get(process.env.API_URL + 'users?archive=' + payload.archive)

		console.log('STORE ACTION');
		state.commit('setUsers', users.data)
		state.commit('setRows')
		state.commit('setupTotalRows')
		state.commit('setIsBusy', false)
		// }, 1000)

	},
	async fetchUser(state, payload) {
		console.log('mypayload', payload);
		const user = await axios.get(process.env.API_URL + 'user/' + payload.id)

		console.log('DATA', user);
		console.log('STORE ACTION setCurentUser');
		state.commit('setCurentUser', user.data)
	},
	async fetchUserByIdClient(state, payload) {
		console.log('mypayload fetchUserByIdClient', payload);
		const user = await axios.get(process.env.API_URL + 'user/findbyidclient/' + payload)

		console.log('STORE ACTION setUserFounded');
		if (user.data == 'invalid') {
			state.commit('setUserError', 'error')
			state.dispatch('global/alert', {
				text: 'CODE INVALIDE. Veuillez saisir un code client valide',
				variant: 'danger',
				countDown: 5
			}, { root: true })

		} else {

			state.commit('setUserFounded', user.data)
		}

	},
	async updateCurrentUser(state, payload) {
		console.log('mypayload', payload);
		console.log(state);
		// console.log(state.state.currentUser);
		// const user = { ...state.state.currentUser };
		// user[payload.key] = payload.val
		console.log('user', payload);
		const edit = await axios.patch(process.env.API_URL + 'user/' + payload.id, { datas: payload }).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {

				// const users = [...state.state.users];
				// console.log('users', users);
				// var index = _.findIndex(users, { id: rep.data.id });
				// console.log('index=', index);
				// users.splice(index, 1, rep.data);
				// state.commit('setUsers', users)
				state.commit('setCurentUser', rep.data)

				state.dispatch('global/alert', {
					text: 'Utilisateur enregistré',
					variant: 'success',
					countDown: 2
				}, { root: true })
			}
		})
	},
	async removeOneUser(state, payload) {
		console.log('mypayload removeOneUser', payload);
		console.log(state);
		// console.log(state.state.currentUser);
		// const user = { ...state.state.currentUser };
		// user[payload.key] = payload.val
		// console.log('user', user);
		const deleted = await axios.delete(process.env.API_URL + 'user/' + payload.id).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {

				const users = [...state.state.users];
				console.log('users', users);
				var index = _.findIndex(users, { id: rep.data });
				console.log('index=', index);
				users.splice(index, 1);
				state.commit('setUsers', users)
				state.commit('setCurentUser', {})

				state.dispatch('global/alert', {
					text: 'Utilisateur supprimé',
					variant: 'success',
					countDown: 2
				}, { root: true })
			}
		})
	},
	async updateUserStatus(state, payload) {
		console.log('mypayload', payload);
		let valueToupdate = ''
		let responseValue = ''

		switch (payload.action) {
			case 'archiver':
				valueToupdate = 'archive';
				responseValue = 'Utilisateur archivé';
				break;
			case 'desarchiver':
				valueToupdate = 'inactif';
				responseValue = 'Utilisateur désarchivé';
				break;
			case 'activer':
				valueToupdate = 'actif';
				responseValue = 'Utilisateur activé';
				break;
			case 'desactiver':
				valueToupdate = 'inactif';
				responseValue = 'Utilisateur désactivé';
				break;

			default:
				break;
		}

		const edit = await axios.patch(process.env.API_URL + 'user/' + payload.id, { datas: { status: valueToupdate } }).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {

				const users = [...state.state.users];
				console.log('users', users);
				var index = _.findIndex(users, { id: rep.data.id });
				console.log('index=', index);
				users.splice(index, 1, rep.data);
				state.commit('setUsers', users)
				// state.commit('setCurentUser', rep.data)

				state.dispatch('global/alert', {
					text: responseValue,
					variant: 'success',
					countDown: 2
				}, { root: true })
			}
		})
	},
	async resetPassword(state, payload) {
		console.log('mypayload resetPassword', payload);
		const edit = await axios.patch(process.env.API_URL + 'user/resetPassword/' + payload.id, {}).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {

				// const users = [...state.state.users];
				// console.log('users', users);
				// var index = _.findIndex(users, { id: rep.data.id });
				// console.log('index=', index);
				// users.splice(index, 1, rep.data);
				// state.commit('setUsers', users)
				// state.commit('setCurentUser', rep.data)

				state.dispatch('global/alert', {
					text: 'Password réinitialisé et envoyé par email à l\'utilisateur',
					variant: 'success',
					countDown: 4
				}, { root: true })
			}
		})
	},
	async createUser(state, payload) {

		// return { toto: 'toto' }
		console.log('mypayload createUser', payload);
		return await axios.post(process.env.API_URL + 'user', payload.formdata).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {

				// const users = [...state.state.users];
				// console.log('users', users);
				// var index = _.findIndex(users, { id: rep.data.id });
				// console.log('index=', index);
				// users.splice(index, 1, rep.data);
				// state.commit('setUsers', users)
				// state.commit('setCurentUser', rep.data)

				state.dispatch('global/alert', {
					text: 'Utilisateur ajouté',
					variant: 'success',
					countDown: 2

				}, { root: true })

				console.log(' rep.data.id', rep.data.id);

				return { success: true, id: rep.data.id };
			}

		}).catch(
			function (err, v) {
				console.log(err);
				console.log(err.response);
				if (err.response.status === 409) {

					console.log('heyho');
					state.dispatch('global/alert', {
						text: 'Adresse email déjà utilisée',
						variant: 'danger',
						countDown: 5
					}, { root: true })
					return { err: 'Adresse email déjà utilisée' };

				}
				if (err.response.status === 400) {

					console.log('heyho');
					state.dispatch('global/alert', {
						text: 'Une erreur s\'est produite, vérifier votre saisie',
						variant: 'danger',
						countDown: 5
					}, { root: true })
					return { err: 'Une erreur s\'est produite, vérifier votre saisie' };

				}
			}
		)
	}
}