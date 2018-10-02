import axios from 'axios';
export const api = "https://5b9e5e91133f660014c91973.mockapi.io/api/v1/records"

export const getAll=()=>
  axios.get("https://5b9e5e91133f660014c91973.mockapi.io/api/v1/records")

export const create=(body)=>
  axios.post("https://5b9e5e91133f660014c91973.mockapi.io/api/v1/records",body)

export const update=(id,body)=>
  axios.put(`https://5b9e5e91133f660014c91973.mockapi.io/api/v1/records/${id}`,body)

export const remove=(id)=>
  axios.delete(`https://5b9e5e91133f660014c91973.mockapi.io/api/v1/records/${id}`)