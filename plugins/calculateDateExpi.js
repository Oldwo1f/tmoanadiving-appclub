export default (context, inject) => {

	inject('calculateDateExpi', (user, $dayjs) => {


		console.log('calculate dateExpi');
		console.log(user);
		let dateExpi = 0;

		if (user.passacheter) {
			console.log('ya des pass');
			user.passacheter.forEach(element => {
				console.log('Date effect==>', $dayjs(element.dateeffect).format('DD MM YYYY'));

				if ($dayjs(element.dateeffect).add(1, 'y').valueOf() > dateExpi) {
					dateExpi = $dayjs(element.dateeffect).add(1, 'y').valueOf()
				}

				// if (element.dateeffect < $dayjs().valueOf() && $dayjs().valueOf() <= $dayjs(element.dateeffect).add(1, 'y').valueOf()) {
				// 	console.log('IF DATE');
				// 	credit += element.nbplongee;

				// }
			});

		} else {
			console.log('no pass');
		}
		return dateExpi
	})
}