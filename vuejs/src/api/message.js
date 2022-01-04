import axios from 'axios'

const BASE_URL = 'http://localhost:8083/api/messages'

async function getMessages () {
  return await axios.get(BASE_URL, {
    headers: { Authorization: 'Bearer '+ localStorage.getItem("token") }
  })
}

async function getMessage (id) {
  return await axios.get(BASE_URL+'/'+id, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

async function postMessage (data) {
  return await axios.post(BASE_URL, data, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

async function deleteMessage (id) {
  return await axios.delete(BASE_URL+'/'+id, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

async function searchByTitle (search) {
  return await axios.get(BASE_URL+'?title='+search, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

export {getMessages, getMessage, postMessage, deleteMessage, searchByTitle}

