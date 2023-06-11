
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import './App.css';
import UserRoute from './Routes/UserRoute.js';
import AdminRoute from './Routes/AdminRoute.js';


function App() {
  return (
    <div >
      <Router>
      <Routes>
          <Route path='/*' element={<UserRoute/>} />
      </Routes>

      <Routes>
      <Route path='/admin/*' element={<AdminRoute/>} />
      </Routes>
      </Router>
    </div>


  );
}

export default App;
