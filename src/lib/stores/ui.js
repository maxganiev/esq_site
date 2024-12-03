import { writable } from 'svelte/store';

export const navDropDownCategoriesShow = writable(false),
  isMobile = writable(false),
  showNavMobileMenu = writable(false),
  showLoader = writable(false);
