import axios from 'axios';

const instance = axios.create({
    baseURL: `https://stressanalyze.org:2000`
});

export default instance;
