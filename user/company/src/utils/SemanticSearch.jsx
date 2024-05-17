// const axios = require('axios').default
import axios from 'axios'

let cache = {}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTIxNzgzYTgtZDU0NC00MjkyLWFiM2UtYjU3ZDI4MzkxZGUyIiwidHlwZSI6ImFwaV90b2tlbiJ9.50Zi5BaZX8vjKHPx0c7_fzxv4enp6pfjOvQN2-26r0k'

export async function semanticSearch(texts, query) {
  const cacheKey = JSON.stringify({ texts, query })

  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/text/search',
    headers: {
      authorization: `Bearer ${token}`, //create new account in EdenAI to get free 1 dollar token and change the bearer if that happens
    },
    data: {
      texts: texts,
      providers: 'openai',
      query: query,
    },
  }

  try {
    const response = await axios.request(options)
    const searchData = response.data.openai.items
    cache[cacheKey] = searchData
    return searchData
  } catch (error) {
    console.error(error)
    throw error // Rethrow the error to handle it at the caller level
  }
}
