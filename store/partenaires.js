const axios = require('axios').default;

export const state = () => ({
	currentPartenaire: {},
	currentStats: {},
	currentStats2: {},
})


export const mutations = {

	setCurentPartenaire(state, payload) {
		console.log('setCurentPartenaire', payload);
		state.currentPartenaire = payload;
	},

	setCurrentStats(state, payload) {
		console.log('setCurrentStats', payload);
		state.currentStats = payload;
	},
	setCurrentStats2(state, payload) {
		console.log('setCurrentStats2', payload);
		state.currentStats2 = payload;
	},

}


export const actions = {
	// toogleMenuCollapsed(state) {

	// 	console.log('STORE ACTION');
	// 	state.commit('toogleMenuCollapsed')
	// },
	// async fetchUsers(state, payload) {
	// 	state.commit('setIsBusy', true)
	// 	console.log('payload', payload);
	// 	// setTimeout(async function () {
	// 	const users = await axios.get('users?archive=' + payload.archive)

	// 	console.log('STORE ACTION');
	// 	state.commit('setUsers', users.data)
	// 	state.commit('setRows')
	// 	state.commit('setupTotalRows')
	// 	state.commit('setIsBusy', false)
	// 	// }, 1000)

	// },
	async addCurrent(state, payload) {
		console.log('addCurrent', payload);
		state.commit('setCurentPartenaire', payload.part)
	},
	async fetchPartenaire(state, payload) {
		console.log('mypayload', payload);
		const part = await axios.get(process.env.API_URL + 'partenaire/' + payload.id)

		console.log('STORE ACTION setCurentPartenaire');
		state.commit('setCurentPartenaire', part.data)
	},
	async addCurrentStats(state, payload) {
		console.log('mypayload----', payload);
		const data = await axios.get(process.env.API_URL + 'partenaire/getstats/' + payload.id)

		console.log('STORE ACTION addCurrentStats');
		state.commit('setCurrentStats', data.data)
	},
	async addCurrentStats2(state, payload) {
		console.log('mypayload----', payload);
		const data = await axios.get(process.env.API_URL + 'partenaire/getstats2/' + payload.id)

		console.log('STORE ACTION addCurrentStats2');
		state.commit('setCurrentStats2', data.data)
	},
	async updateCurrentPartenaire(state, payload) {
		console.log('mypayload', payload);
		console.log(state);
		// console.log(state.state.currentUser);
		let part = {};
		part = payload.formdata.value
		console.log('part', part);
		const edit = await axios.patch(process.env.API_URL + 'partenaire/' + part.id, { datas: part }).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {

				// const users = [...state.state.users];
				// console.log('users', users);
				// var index = _.findIndex(users, { id: rep.data.id });
				// console.log('index=', index);
				// users.splice(index, 1, rep.data);
				// state.commit('setUsers', users)
				state.commit('setCurentPartenaire', rep.data)

				state.dispatch('global/alert', {
					text: 'Fiche centre enregistré',
					variant: 'success',
					countDown: 2
				}, { root: true })
			}
		})
	},
	// async removeOneUser(state, payload) {
	// 	console.log('mypayload removeOneUser', payload);
	// 	console.log(state);
	// 	// console.log(state.state.currentUser);
	// 	// const user = { ...state.state.currentUser };
	// 	// user[payload.key] = payload.val
	// 	// console.log('user', user);
	// 	const deleted = await axios.delete('user/' + payload.id).then(function (rep) {
	// 		console.log('rep axios', rep);
	// 		if (rep.status === 200) {

	// 			const users = [...state.state.users];
	// 			console.log('users', users);
	// 			var index = _.findIndex(users, { id: rep.data });
	// 			console.log('index=', index);
	// 			users.splice(index, 1);
	// 			state.commit('setUsers', users)
	// 			state.commit('setCurentUser', {})

	// 			state.dispatch('global/alert', {
	// 				text: 'Utilisateur supprimé',
	// 				variant: 'success',
	// 				countDown: 2
	// 			}, { root: true })
	// 		}
	// 	})
	// },
	// async updateUserStatus(state, payload) {
	// 	console.log('mypayload', payload);
	// 	let valueToupdate = ''
	// 	let responseValue = ''

	// 	switch (payload.action) {
	// 		case 'archiver':
	// 			valueToupdate = 'archive';
	// 			responseValue = 'Utilisateur archivé';
	// 			break;
	// 		case 'desarchiver':
	// 			valueToupdate = 'inactif';
	// 			responseValue = 'Utilisateur désarchivé';
	// 			break;
	// 		case 'activer':
	// 			valueToupdate = 'actif';
	// 			responseValue = 'Utilisateur activé';
	// 			break;
	// 		case 'desactiver':
	// 			valueToupdate = 'inactif';
	// 			responseValue = 'Utilisateur désactivé';
	// 			break;

	// 		default:
	// 			break;
	// 	}

	// 	const edit = await axios.patch('user/' + payload.id, { datas: { status: valueToupdate } }).then(function (rep) {
	// 		console.log('rep axios', rep);
	// 		if (rep.status === 200) {

	// 			const users = [...state.state.users];
	// 			console.log('users', users);
	// 			var index = _.findIndex(users, { id: rep.data.id });
	// 			console.log('index=', index);
	// 			users.splice(index, 1, rep.data);
	// 			state.commit('setUsers', users)
	// 			// state.commit('setCurentUser', rep.data)

	// 			state.dispatch('global/alert', {
	// 				text: responseValue,
	// 				variant: 'success',
	// 				countDown: 2
	// 			}, { root: true })
	// 		}
	// 	})
	// },
	// async resetPassword(state, payload) {
	// 	console.log('mypayload resetPassword', payload);
	// 	const edit = await axios.patch('user/resetPassword/' + payload.id, {}).then(function (rep) {
	// 		console.log('rep axios', rep);
	// 		if (rep.status === 200) {

	// 			// const users = [...state.state.users];
	// 			// console.log('users', users);
	// 			// var index = _.findIndex(users, { id: rep.data.id });
	// 			// console.log('index=', index);
	// 			// users.splice(index, 1, rep.data);
	// 			// state.commit('setUsers', users)
	// 			// state.commit('setCurentUser', rep.data)

	// 			state.dispatch('global/alert', {
	// 				text: 'Password réinitialisé et envoyé par email à l\'utilisateur',
	// 				variant: 'success',
	// 				countDown: 4
	// 			}, { root: true })
	// 		}
	// 	})
	// },
	// async createUser(state, payload) {

	// 	// return { toto: 'toto' }
	// 	console.log('mypayload createUser', payload);
	// 	return await axios.post('user', payload.formdata).then(function (rep) {
	// 		console.log('rep axios', rep);
	// 		if (rep.status === 200) {

	// 			// const users = [...state.state.users];
	// 			// console.log('users', users);
	// 			// var index = _.findIndex(users, { id: rep.data.id });
	// 			// console.log('index=', index);
	// 			// users.splice(index, 1, rep.data);
	// 			// state.commit('setUsers', users)
	// 			// state.commit('setCurentUser', rep.data)

	// 			state.dispatch('global/alert', {
	// 				text: 'Utilisateur ajouté',
	// 				variant: 'success',
	// 				countDown: 2

	// 			}, { root: true })

	// 			console.log(' rep.data.id', rep.data.id);

	// 			return { success: true, id: rep.data.id };
	// 		}

	// 	}).catch(
	// 		function (err, v) {
	// 			console.log(err);
	// 			console.log(err.response);
	// 			if (err.response.status === 409) {

	// 				console.log('heyho');
	// 				state.dispatch('global/alert', {
	// 					text: 'Adresse email déjà utilisée',
	// 					variant: 'danger',
	// 					countDown: 5
	// 				}, { root: true })
	// 				return { err: 'Adresse email déjà utilisée' };

	// 			}
	// 			if (err.response.status === 400) {

	// 				console.log('heyho');
	// 				state.dispatch('global/alert', {
	// 					text: 'Une erreur s\'est produite, vérifier votre saisie',
	// 					variant: 'danger',
	// 					countDown: 5
	// 				}, { root: true })
	// 				return { err: 'Une erreur s\'est produite, vérifier votre saisie' };

	// 			}
	// 		}
	// 	)
	// }
}