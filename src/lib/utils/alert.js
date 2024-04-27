/**@desc {types: 'success', 'danger', 'warning', 'primary'} */
export const alert = {
	msg: '',
	show: false,
	types: ['success', 'danger', 'warning', 'primary'],
	type: 'success',
	timeout: 3000,

	/**
	 * @param {String} msg
	 * @param { Number} typeIndex
	 */
	set(msg, typeIndex) {
		this.show = true;
		this.msg = msg;
		this.type = this.types[typeIndex];

		setTimeout(() => {
			this.show = false;
		}, this.timeout);
	},
};
