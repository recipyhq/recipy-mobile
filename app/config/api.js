const ApiUrl = (process.env.NODE_ENV === 'development') ? 'https://staging-recipy.herokuapp.com' : 'https://production-recipy.herokuapp.com';

export default ApiUrl;
