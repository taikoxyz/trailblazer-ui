import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';

import { PUBLIC_DEBUG_I18N } from '$env/static/public';

import en from './en.json';
import qq from './qq.json';
// TODO: import other languages here...

addMessages('en', en);
// TODO: add other languages here...
if (PUBLIC_DEBUG_I18N === 'true') {
  addMessages('qq', qq);
}

init({
  fallbackLocale: 'en',
  initialLocale: PUBLIC_DEBUG_I18N === 'true' ? 'qq' : getLocaleFromNavigator(),
});
