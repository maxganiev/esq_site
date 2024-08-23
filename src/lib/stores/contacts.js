import { readable } from 'svelte/store';

export const contacts = readable([
  {
    id: 1,
    icon: 'lucide:mail',
    text: 'esq@mail.com',
    href: 'mailto:esq@mail.com',
  },
  {
    id: 2,
    icon: 'lucide:phone',
    text: '+7 (812) 320-88-81',
    href: 'tel:+7(812) 320-88-81',
  },
  { id: 3, icon: 'iconoir:telegram', text: 'Telegram', href: '#' },
]);
