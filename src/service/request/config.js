const dev_BASE_URL = 'http://123.207.32.32:9060/';
const pro_BASE_URL = 'http://123.207.32.32:9060/';

export const BASE_URL = process.env.NODE_ENV === 'development'? dev_BASE_URL: pro_BASE_URL;
export const TIME_OUT = 6000