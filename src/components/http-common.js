import  axios from 'axios';
export const BASEURL = 'https://api-stage.etm-system.com/api';
export const BASEURLAIR = 'https://api-stage.etm-system.com/api/air';
export const HTTP_AIR = axios.create({
    baseURL:`${BASEURLAIR}`,
});
export const APPID = '94cb849d0a';