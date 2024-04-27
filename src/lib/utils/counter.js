export class Counter {
	constructor() {
		this.startValue = 0;
	}

	/**
	 * @param {Number} maxValue
	 */
	rollCounter(maxValue) {
		return new Promise((resolve) => {
			const int = setInterval(() => {
				if (this.startValue < maxValue) this.startValue += maxValue / 250;
				else {
					clearInterval(int);
					resolve(this.startValue);
				}
			}, 0);
		});
	}

	/**
	 * @param {Number} maxValue
	 */
	async displayValue(maxValue) {
		await this.rollCounter(maxValue);
		this.startValue = this.startValue > maxValue ? maxValue : this.startValue;
	}
}
