import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// if js-object => Content-Type: Application/json
//    data => req.body
// if FormData => Content-Type: multipart/form-data
//    data (text) => (multer) => req.body
//    data (file) => (multer) => req.file
export const createHero = data => httpClient.post('/heroes', data);

export const getHeroes = () => httpClient.get('/heroes');

export const updateHero = (id, data) => httpClient.patch(`/heroes/${id}`, data);

export const deleteHero = id => httpClient.delete(`/heroes/${id}`);
