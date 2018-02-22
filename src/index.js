import isArray from 'lodash/isArray'

import * as settings from './settings'

/**
 * Search at dictionary and translate it.
 * @param {function} getWord - Function to get at dictionary
 * @param {array} strs - String that mounts dictionary
 * @param {array} params - Params that will be replacing {{n}} in the dictionary
 * @returns {string} Returns translation equivalent in the dictionary.
 */
const translate = function (getWord, strs, ...params) {
  const dictionaryWord = strs.map((t, i) => {
    const joiner = params[i] ? '{{' + i + '}}' : ''
    return (t.trim() + ' ' + joiner).trim()
  })

  const dictionaryWordTemplate = dictionaryWord.join(' ').trim()
  const word = getWord(dictionaryWordTemplate)

  return (word || dictionaryWordTemplate)
    .replace(/(\{\{([\d]*[\d])\}\})/g, (a, b, c, d) => {
      return params[c]
    })
}

/**
 * Run dothraki to find translation
 * @param {array} allParams - Params to execute translation
 * @returns {(string|function)} If you send a template equivalent it will return the translation or it will return a function that receives the template. 
*/
const execute = function (...allParams) {
  const language = isArray(allParams[0]) ? settings.get('language') : allParams[0]

  const getWord = settings.getDictionary(language)

  if (isArray(allParams[0]) === false) {
    return (...params) => translate(getWord, ...params)
  }

  return translate(getWord, ...allParams)
}

export default execute
