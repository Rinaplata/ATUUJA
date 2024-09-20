import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import Story from './components/Main/Story';
import Users from './components/Main/Users.tsx';
import Login from './components/Main/Login';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
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
      </Routes>
      <Routes>
        <Route
          path='/users'
          element={
              <Users />
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
