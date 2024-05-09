// const axios = require('axios').default
import axios from 'axios'

export async function semanticSearch(texts, query) {
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
    // console.log(response.data)
    return response.data.openai.items
  } catch (error) {
    console.error(error)
  }
}
