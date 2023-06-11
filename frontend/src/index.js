// import React from 'react';
// import { createRoot } from 'react-dom';
// import './index.css';
// import App from './App';
// import { Provider } from 'react-redux';
// import Store from './store/index';

// const root = createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={Store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from './store/index';

const root = createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  // </React.StrictMode>c
);
