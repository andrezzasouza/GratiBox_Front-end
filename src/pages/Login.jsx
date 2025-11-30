import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import { login } from '../services/api';
import { loginErr } from '../assets/misc/StatusMessages';
import {
  EnterHolder,
  SuccessHeading,
  EnterInput,
  StatusMessage,
  EnterButton,
  TransparentButton
} from '../assets/styles/EnterStyle';
import Welcome from '../components/Welcome';
import lotus from '../assets/images/lotus.gif';
import UserContext from '../contexts/UserContext';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const [hide, setHide] = useState(false);
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('loginData'));
    if (userLogin) {
      if (userLogin.plan === null) {
        navigate('/plans');
      } else {
        navigate('/details');
      }
    } else {
      // should i do something here?
    }
  }, []);

  function alterMsg(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 6000);
  }

  function enterApp(e) {
    e.preventDefault();
    setEnabled(false);
    setMessage('');

    const body = {
      email,
      password
    };

    login(body)
      .then((res) => {
        setHide(true);
        setEmail('');
        setPassword('');
        setUserData(res.data);
        localStorage.setItem('loginData', JSON.stringify(res.data));
        if (res.data.plan === null) {
          setTimeout(() => navigate('/plans'), 5000);
        } else {
          setTimeout(() => navigate('/details'), 5000);
        }
      })
      .catch((err) => {
        alterMsg(loginErr(err));
        setEnabled(true);
      });
  }

  return (
    <EnterHolder>
      {hide ? (
        <>
          <img
            src={lotus}
            alt="Imagem de uma pessoa com uma flor de lotus atrás"
          />
          <SuccessHeading>Bem-vindo de volta!</SuccessHeading>
          <StatusMessage>
            Pare um momento e reflita. Pelo que você está grato hoje?
          </StatusMessage>
        </>
      ) : (
        <>
          <Welcome />
          <form onSubmit={enterApp}>
            <EnterInput
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value?.toLowerCase())}
              clickable={enabled}
              disabled={!enabled}
              required
            />
            <EnterInput
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              clickable={enabled}
              disabled={!enabled}
              required
            />
            <StatusMessage>{message}</StatusMessage>
            <EnterButton type="submit">
              {enabled ? (
                'Login'
              ) : (
                <ThreeDots color="#FFFFFF" height={50} width={100} />
              )}
            </EnterButton>
          </form>
          <Link to={enabled ? '/sign-up' : '/login'}>
            <TransparentButton>Ainda não sou grato</TransparentButton>
          </Link>
        </>
      )}
    </EnterHolder>
  );
}
