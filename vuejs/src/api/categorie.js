import axios from 'axios'

const BASE_URL = 'http://localhost:8083/api/categories'

async function getCategories () {
  return await axios.get(BASE_URL, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

async function getCategorie (id) {
  return await axios.get(BASE_URL+'/'+id, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

async function postCategorie (data) {
  return await axios.post(BASE_URL, data, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

async function deleteCategory (id) {
  return await axios.delete(BASE_URL+'/'+id, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

async function searchByLabel (search) {
  return await axios.get(BASE_URL+'?label='+search, {
    headers: { Authorization: 'Bearer '+localStorage.getItem("token") }
  })
}

export {getCategories, getCategorie, postCategorie, deleteCategory, searchByLabel}

