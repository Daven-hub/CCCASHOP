import axios from 'axios';
import { BaseUrl } from '../config';

const API_URL = 'http://app.cc-ca.ca/index.php/';

const getAllRevue = async() => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.get(API_URL);

  // console.log (response);
  return response;
};


const testService = {
  getAllRevue,
};

export default testService;
