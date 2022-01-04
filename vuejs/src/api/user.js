import axios from 'axios'

const BASE_URL = 'http://localhost:8083/api/users'

async function getMessages () {
  return await axios.get(BASE_URL+'?email='+JSON.parse(localStorage.getItem('userData'))["username"], {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

export {getMessages}

