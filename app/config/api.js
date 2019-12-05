const ApiUrl = (process.env.NODE_ENV === 'development') ? 'https://staging-recipy.herokuapp.com' : 'https://recipy.fr/';

export default ApiUrl;
