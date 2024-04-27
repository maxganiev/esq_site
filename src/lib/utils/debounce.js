export class Debounce {
	constructor(called = false, timeout = 1000) {
		this.called = called;
		this.timeout = timeout;
	}

	start(/**@type {Function}*/ callback, /**@type {any[]}*/ args) {
		let int;
		clearTimeout(int);

		if (!this.called) {
			this.called = true;
			int = setTimeout(() => {
				callback.call(this, ...args);
				this.called = false;
			}, this.timeout);
		}
	}
}
