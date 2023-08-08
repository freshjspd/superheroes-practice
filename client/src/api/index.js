import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const createHero = data => httpClient.post('/heroes', data);

export const getHeroes = () => httpClient.get('/heroes');

export const updateHero = (id, data) => httpClient.patch(`/heroes/${id}`, data);

export const deleteHero = id => httpClient.delete(`/heroes/${id}`);
