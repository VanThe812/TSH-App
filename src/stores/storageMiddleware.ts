// storageMiddleware.ts
import { Middleware } from 'redux';

const storageMiddleware: Middleware = ({ getState }) => next => action => {
  const result = next(action);
  // Save the state to localStorage whenever it changes
  localStorage.setItem('reduxState', JSON.stringify(getState()));
  return result;
};

export default storageMiddleware;
