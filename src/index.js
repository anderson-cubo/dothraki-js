import isArray from 'lodash/isArray'
import map from 'lodash/map'

import * as settings from './settings'

const regx = /(\{\{[\d]*[\d]\}\})/g
const regx2 = /(\{\{([\d]*[\d])\}\})/g

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
    return (String(t).trim() + ' ' + joiner).trim()
  })

  const dictionaryWordTemplate = dictionaryWord.join(' ').trim()
  const word = getWord(dictionaryWordTemplate) || dictionaryWordTemplate

  if (settings.get('use_array_to_render') && regx2.test(word)) {
    const value = word.split(regx)
    return map(value, function (e) {
      const match = regx2.exec(e)
      if (match) {
        return params[match[match.length - 1]]
      }
      return e
    })
  }

  return word.replace(regx2, (a, b, c, d) => {
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
