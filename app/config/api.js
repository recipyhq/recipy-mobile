const ApiUrl = (process.env.NODE_ENV === 'development') ? 'https://staging-recipy.herokuapp.com' : 'http://recipy.fr/';

export default ApiUrl;
