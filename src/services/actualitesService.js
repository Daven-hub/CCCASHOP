import axios from './api';
// import { BaseUrl } from '../config';

// const proxy= 'https://cc-ca.ca/proxy.php?url=';
// const API_URL =BaseUrl+'/actualite.php';

// Get user Voitures
const createActualite = async (userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  // console.log(userData)
  const response = await axios.post("/actualite.php",userData);
  // console.log(response)
  // console.log(response.data)
  return response.data;
};

//getById
const getActualiteById = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.get("/actualite.php/" + id);

  // console.log (response.data.result);
  return response.data;
};

const getAllActualite= async() => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.get("/actualite.php");

  // console.log (response);
  return response.data;
};

const DeleteActualite = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.delete("/actualite.php/?id=" + id);

  //   console.log (response.data.result);
  return response.data;
};

const updateActualite = async (data,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch("/actualite.php",data, config);

  // console.log (response);
  return response.data;
};

const ActualitesService = {
  getAllActualite,
  createActualite,
  getActualiteById,
  DeleteActualite,
  updateActualite
};

export default ActualitesService;
