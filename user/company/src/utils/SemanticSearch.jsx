// const axios = require('axios').default
import axios from 'axios'

export async function semanticSearch(texts, query) {
  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/text/search',
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODMwYjA3ZWMtYjNhYS00ODliLTljOWYtNWNiZjA3N2U4NTAxIiwidHlwZSI6ImFwaV90b2tlbiJ9.cj-bHDTmNUUM3ahyLLa__1vuK8IbreGjD1nq5EEcBBU',
    },
    data: {
      texts: texts,
      providers: 'openai',
      query: query,
    },
  }

  try {
    const response = await axios.request(options)
    // console.log(response.data)
    return response.data.openai.items
  } catch (error) {
    console.error(error)
  }
}
