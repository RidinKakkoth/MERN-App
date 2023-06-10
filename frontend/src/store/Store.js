import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';


const store = configureStore({
    reducer: {
      counter: rootReducer,
    },
  });
  
  export default store;