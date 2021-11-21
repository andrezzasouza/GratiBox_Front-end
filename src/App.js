import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Plans from './pages/Plans';
import Details from './pages/Details';
import Subscription from './pages/Subscription';
import UserContext from './contexts/UserContext';

function App() {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('loginData'));
    if (userLogin) setUserData(userLogin);
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/plans" element={<Plans />} />
          <Route exact path="/details" element={<Details />} />
          <Route exact path="/subscription" element={<Subscription />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
