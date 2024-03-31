import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Signup } from './pages/signup';
import { Signin } from './pages/signin';
import { CreateClient } from './pages/createClient';
import { EditClient } from './pages/editClient';
import { MainRouter } from './pages/mainRouter';
import { Dashboard } from './pages/dashboard';
import { ReactNode } from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/createClient" element={<PrivateRoute route={<CreateClient />} />} />
          <Route path="/editClient" element={<PrivateRoute route={<EditClient />} />} />
          <Route path="/dashboard" element={<PrivateRoute route={<Dashboard />} />} />
          <Route path="/" element={<MainRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

interface PrivateRouteProps {
  route: ReactNode,
}

function PrivateRoute(props: PrivateRouteProps) {
  const token = localStorage.getItem('token');

  return token ? props.route : <Navigate to="/signin" replace />;
}