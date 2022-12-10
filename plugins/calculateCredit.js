export default (context, inject) => {

	inject('calculateCredit', (user, $dayjs) => {


		console.log('calculate credit');
		console.log(user);
		let credit = 0;

		if (user.passacheter) {
			console.log('ya des pass');
			user.passacheter.forEach(element => {
				if (element.dateeffect < $dayjs().valueOf() && $dayjs().valueOf() <= $dayjs(element.dateeffect).add(1, 'y').valueOf()) {
					console.log('IF DATE');
					credit += element.nbplongeerestant;

				}
			});

		} else {
			console.log('no pass');
		}
		return credit
	})
}