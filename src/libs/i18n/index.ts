import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';

import en from './en.json';

const defaultLocale = 'en'
// TODO: import other languages here...

addMessages('en', en);
// TODO: add other languages here...

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale,
})
