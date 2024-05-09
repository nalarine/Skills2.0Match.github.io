// const axios = require('axios').default
import axios from 'axios'

let cache = {}

export async function semanticSearch(texts, query) {
  const cacheKey = JSON.stringify({ texts, query })

  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/text/search',
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWI0ZTNiOTYtNjMzNS00MmMzLTkxODMtODNkZDMxOWQwZmU2IiwidHlwZSI6ImFwaV90b2tlbiJ9.cArlXoQuruusX1KEfEoSmE1jGk8xWgVCr1MfopAORfY', //create new account in EdenAI to get free 1 dollar token and change the bearer if that happens
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
