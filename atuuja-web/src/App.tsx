import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import Story from './components/Main/Story/Story.tsx';
import Users from './components/Main/User/User.tsx';
import Login from './components/Main/Login';
import Reward from './components/Main/Reward/Reward.tsx'
import { jwtDecode } from 'jwt-decode';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    if(!pathname.includes("auth")) {
      
      const token = localStorage.getItem('token');

      if(!token || token == undefined){
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      }

      const decodedToken = jwtDecode(token || '');
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos

      if ((decodedToken.exp || 0 )  < currentTime) {
        // El token ha expirado
        console.log("El token ha expirado.");
        localStorage.removeItem('token');
        // Redirige al login
        window.location.href = '/auth/login';
    }
  }
  }, []);

  return loading ? (
    <Loader />
  ) : (
     !pathname.includes("auth") ?  
    <DefaultLayout>
      <Routes>
        <Route
          path='/story'
          element={
              <Story />
          }
        />
        <Route
          path='/users'
          element={
              <Users />
          }
        />
        <Route
          path='/reward'
          element={
              <Reward />
          }
        />
      </Routes>
    </DefaultLayout>
    : 
    <Routes>
      <Route path='auth/login'  
        element={
          <Login />
        }>
      </Route>
    </Routes>
  );
}

export default App;
