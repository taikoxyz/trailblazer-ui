import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';

import { browser } from '$app/environment';
import { PUBLIC_DEBUG_I18N } from '$env/static/public';

import en from './en.json';
import qq from './qq.json';

addMessages('en', en);
if (PUBLIC_DEBUG_I18N === 'true') {
  addMessages('qq', qq);
}

init({
  fallbackLocale: 'en',
  initialLocale: browser ? (PUBLIC_DEBUG_I18N === 'true' ? 'qq' : getLocaleFromNavigator()) : 'en',
});
