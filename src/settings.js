let config = {
  language: 'PT_BR',
  use_array_to_render: true,
  _ENABLE_WARNINGS: true,
  dictionaries: {
    PT_BR: {}
  }
}

let dictionaryWithoutTranslation = {}

export const getDictionaryWithoutTranslation = () => dictionaryWithoutTranslation
/**
 * Create a dictionary for a language
 * @param {string} lang Language of the dictionary.
 * @param {object} data object with the dictionary + translations.
 * @returns {object} dictionary
 */
export const setDictionary = (lang, data) => {
  config.dictionaries[lang] = data
  return data
}

/**
 * Search at the dictionary
 * @param {string} lang Language of the dictionary.
 * @param {string} word word that`s being searched.
 * @returns {string} translation from dictionary.
 */
export const getFromDictionary = (language, word) => {
  if (word == null) {
    word = language
    language = config.language
  }

  const _word = (config.dictionaries[language] || {})[word]

  if (_word == null && get('_ENABLE_WARNINGS')) {
    dictionaryWithoutTranslation[language] = dictionaryWithoutTranslation[language] || {}
    dictionaryWithoutTranslation[language][word] = word
    console.warn(`[${language}] The word "${word}"`, 'is not in this dictionary.')
  }

  return _word
}

/**
 * Get full dictionary of certain language
 * @param {string} language Language of the dictionary.
 * @returns {function} gets word and search from dictionary.
 */
export const getDictionary = language => {
  return word => getFromDictionary(language, word)
}

/**
 * Set settings
 * @param {string} where What name should be set
 * @param {any} what What data should be setted at where
 * @returns {any} get what was setted
 */
export const set = (where, what) => {
  if (where === 'dictionaries') throw new Error('You should use setDictionary instead of set')
  config[where] = what
  return what
}

/**
 * Get settings
 * @param {string} where What name should be set
 * @returns {any} get what was setted
 */
export const get = where => config[where]
