// // const axios = require('axios').default
// import axios from 'axios'

// let cache = {}

// export async function semanticSearch(texts, query) {
//   const cacheKey = JSON.stringify({ texts, query })
//   if (cache[cacheKey]) {
//     return cache[cacheKey]
//   }
//   const options = {
//     method: 'POST',
//     url: 'https://api.edenai.run/v2/text/search',
//     headers: {

//       authorization: `Bearer ${token}`, //create new account in EdenAI to get free 1 dollar token and change the bearer if that happens
//     },
//     data: {
//       texts: texts,
//       providers: 'openai',
//       query: query,
//     },
//   }
//   try {
//     const response = await axios.request(options)

//     console.log(response)
//     const searchData = response.data.openai.items
//     cache[cacheKey] = searchData
//     return searchData
//   } catch (error) {
//     console.error(error)
//     throw error // Rethrow the error to handle it at the caller level
//   }
// }

const token = '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'

export async function semanticSearch(texts, query) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
    {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      body: JSON.stringify({
        source_sentence: query,
        sentences: texts,
      }),
    },
  )
  const result = await response.json()
  const entries = Object.entries(result)
  entries.sort((a, b) => b[1] - a[1])
  const topKeys = entries.slice(0, 3).map((entry) => parseInt(entry[0], 10)) // Convert to integer keys
  // console.log(topKeys)
  return topKeys
}

// query({
//   inputs: {
//     source_sentence: JSON.stringify(query),
//     sentences: [
//       'That is a happy dog',
//       'That is a very happy person',
//       'Today is a sunny day',
//     ],
//   },
// }).then((response) => {
//   console.log(JSON.stringify(response))
// })
