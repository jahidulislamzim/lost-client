import { useContext } from 'react';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { Navigate } from 'react-router';
import Loading from '../Components/Loading.jsx';

const PrivateRoute = ({ children }) => {
  const { saveUser, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!saveUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
