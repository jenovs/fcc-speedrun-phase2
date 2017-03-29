import langs from './langList';

function stripCountryCode(lang) {
  return lang.match(/[A-Z]{2}/)[0];
}

function parseLangCode(lang) {
  const exceptLangs = ['DE', 'ES'];
  const langCode = stripCountryCode(lang);

  if (~exceptLangs.indexOf(langCode)) lang = langCode;

  if (langs.hasOwnProperty(lang)) {
    lang = langs[lang];
  }
  
  return stripCountryCode(lang);
}

module.exports = {
  parseLangCode
}
