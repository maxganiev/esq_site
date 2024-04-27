import { readable } from 'svelte/store';
import citiesJson from '$lib/russian-cities.json';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const cities = readable(citiesJson),
	daysToCallback = readable([''], (set) => {
		/**@type {String[]}*/
		let days = [];

		for (let d = 0; d < 5; d++) {
			let nextDay = addDays(Date.now(), d),
				nextDayF = format(nextDay, 'd MMMM', { locale: ru });

			days.push(nextDayF);
		}

		set(days);
	}),
	timesToCallback = readable([{ value: '', disabled: false }], (set) => {
		let startHour = 8.5,
			endHour = 18,
			/**@type {Object & {value: String, disabled: Boolean}[]}*/
			hours = [],
			now = new Date(Date.now());

		for (let h = startHour; h < endHour; h += 0.5) {
			let time = { value: '', disabled: false },
				hRounded = h < 9.5 ? '0' + h.toFixed(0) : h.toFixed(0),
				hIsDecimal = h % 1 !== 0,
				mins = hIsDecimal ? '00' : '30';

			time.value = `${hRounded}:${mins}`;
			time.disabled =
				Number(hRounded) < now.getHours() ||
				(Number(hRounded) === now.getHours() && Number(mins) < now.getMinutes());

			hours.push(time);
		}

		set(hours);
	});
