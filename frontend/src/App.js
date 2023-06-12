
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './App.css';
import UserRoute from './Routes/UserRoute.js';
import AdminRoute from './Routes/AdminRoute.js';


function App() {
  return (
    <div >
   <CookiesProvider>

      <Router>
      <Routes>
          <Route path='/*' element={<UserRoute/>} />
      </Routes>

      <Routes>
      <Route path='/admin/*' element={<AdminRoute/>} />
      </Routes>
      </Router>
  </CookiesProvider>
    </div>


  );
}

export default App;
