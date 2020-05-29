'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isArray = _interopDefault(require('lodash/isArray'));
var map = _interopDefault(require('lodash/map'));

var config = {
  language: 'PT_BR',
  use_array_to_render: true,
  _ENABLE_WARNINGS: true,
  dictionaries: {
    PT_BR: {}
  }
};
var dictionaryWithoutTranslation = {};
/**
 * Search at the dictionary
 * @param {string} language Language of the dictionary.
 * @param {string} word word that`s being searched.
 * @returns {string} translation from dictionary.
 */

var getFromDictionary = function getFromDictionary(language, word) {
  if (word == null) {
    word = language;
    language = config.language;
  }

  var _word = (config.dictionaries[language] || {})[word];

  if (_word == null && get('_ENABLE_WARNINGS')) {
    dictionaryWithoutTranslation[language] = dictionaryWithoutTranslation[language] || {};
    dictionaryWithoutTranslation[language][word] = word;
    console.warn("[".concat(language, "] The word \"").concat(word, "\""), 'is not in this dictionary.');
  }

  return _word;
};
/**
 * Get full dictionary of certain language
 * @param {string} language Language of the dictionary.
 * @returns {function} gets word and search from dictionary.
 */

var getDictionary = function getDictionary(language) {
  return function (word) {
    return getFromDictionary(language, word);
  };
};
/**
 * Get settings
 * @param {string} where What name should be set
 * @returns {any} get what was setted
 */

var get = function get(where) {
  return config[where];
};

var regx = /(\{\{[\d]*[\d]\}\})/g;
var regx2 = /(\{\{([\d]*[\d])\}\})/g;
/**
 * Search at dictionary and translate it.
 * @param {function} getWord - Function to get at dictionary
 * @param {array} strs - String that mounts dictionary
 * @param {array} params - Params that will be replacing {{n}} in the dictionary
 * @returns {string} Returns translation equivalent in the dictionary.
 */

var translate = function translate(getWord, strs) {
  for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  var dictionaryWord = strs.map(function (t, i) {
    var joiner = params[i] ? '{{' + i + '}}' : '';
    return (String(t).trim() + ' ' + joiner).trim();
  });
  var dictionaryWordTemplate = dictionaryWord.join(' ').trim();
  var word = getWord(dictionaryWordTemplate) || dictionaryWordTemplate;

  if (get('use_array_to_render') && regx2.test(word)) {
    var value = word.split(regx);
    return map(value, function (e) {
      var match = regx2.exec(e);

      if (match) {
        return params[match[match.length - 1]];
      }

      return e;
    });
  }

  return word.replace(regx2, function (a, b, c, d) {
    return params[c];
  });
};
/**
 * Run dothraki to find translation
 * @param {array} allParams - Params to execute translation
 * @returns {(string|function)} If you send a template equivalent it will return the translation or it will return a function that receives the template.
*/


var execute = function execute() {
  for (var _len2 = arguments.length, allParams = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    allParams[_key2] = arguments[_key2];
  }

  var language = isArray(allParams[0]) ? get('language') : allParams[0];
  var getWord = getDictionary(language);

  if (isArray(allParams[0]) === false) {
    return function () {
      for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      return translate.apply(void 0, [getWord].concat(params));
    };
  }

  return translate.apply(void 0, [getWord].concat(allParams));
};

module.exports = execute;
