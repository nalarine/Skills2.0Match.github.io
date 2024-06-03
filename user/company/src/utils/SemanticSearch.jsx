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

const token = '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';

async function fetchWithRetry(url, options, retries = 3, backoff = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (i < retries - 1) {
        console.error(`Fetch attempt ${i + 1} failed. Retrying in ${backoff / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2; // Exponential backoff
      } else {
        console.error('All fetch attempts failed.');
        throw error;
      }
    }
  }
}

export async function semanticSearch(texts, query) {
  const url = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
  const options = {
    headers: { Authorization: `Bearer ${token}` },
    method: 'POST',
    body: JSON.stringify({
      source_sentence: query,
      sentences: texts,
    }),
  };

  try {
    const response = await fetchWithRetry(url, options);
    const result = await response.json();
    const entries = Object.entries(result);
    entries.sort((a, b) => b[1] - a[1]);
    const topKeys = entries.slice(0, 3).map((entry) => parseInt(entry[0], 10)); // Convert to integer keys
    return topKeys;
  } catch (error) {
    console.error('Error performing semantic search:', error);
    return []; // Return an empty array or handle the error as needed
  }
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