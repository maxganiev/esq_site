import { readable, get, writable, derived } from 'svelte/store';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import phoneMasksJson from '$lib/phone-masks.json';

export const daysToCallback = readable([], (set) => {
    /**@type {Object & {valueISO: Date | String, value: String} []}*/
    let days = [];

    for (let d = 0; d < 5; d++) {
      let nextDay = addDays(Date.now(), d),
        nextDayF = format(nextDay, 'd MMMM', { locale: ru });

      days.push({ valueISO: nextDay, value: nextDayF });
    }

    set(days);
  }),
  selectedDayToCallback = writable(get(daysToCallback)[0]),
  timesToCallback = derived(
    selectedDayToCallback,
    ($selectedDayToCallback, set) => {
      let startHour = 8.5,
        endHour = 18,
        /**@type {Object & {value: String, disabled: Boolean}[]}*/
        hours = [],
        now = new Date(Date.now()),
        dayToCallbackVal = new Date($selectedDayToCallback.valueISO);

      for (let h = startHour; h < endHour; h += 0.5) {
        let time = { value: '', disabled: false },
          hRounded = h < 9.5 ? '0' + h.toFixed(0) : h.toFixed(0),
          hIsDecimal = h % 1 !== 0,
          mins = hIsDecimal ? '00' : '30';

        time.value = `${hRounded}:${mins}`;

        const disabled =
          dayToCallbackVal.getDate() <= now.getDate() &&
          (Number(hRounded) < now.getHours() ||
            (Number(hRounded) === now.getHours() &&
              Number(mins) < now.getMinutes()));

        if (!disabled) hours.push(time);
      }

      set(hours);
    },
  ),
  phoneMasks = readable(phoneMasksJson);
