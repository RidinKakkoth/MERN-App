import LoginPage from './pages/User page/LoginPage.jsx';
import SignupPage from './pages/User page/SignupPage.jsx';
import HomePage from './pages/User page/HomePage.jsx'
import ProfilePage from './pages/User page/ProfilePage'


import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/User/Navbar/Navbar.js';


function App() {
  return (
    <div >
      <Router>
      <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
     
      <Route path='/home' element={<><Navbar/> <HomePage/></>}/>
      <Route path='/profile' element={<><Navbar/><ProfilePage/></>}/>

     
      
      </Routes>
      </Router>
    </div>


  );
}

export default App;
