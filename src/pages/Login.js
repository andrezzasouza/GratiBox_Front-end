import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner';

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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      navigate('/home');
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
      .then(() => {
        setHide(true);
        setEmail('');
        setPassword('');
        // check if user already has a signature before redirecting to plans or details
        setTimeout(() => navigate('/plans'), 5000);
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
                <Loader
                  type="ThreeDots"
                  color="white"
                  height={50}
                  width={100}
                  timeout={4000}
                />
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
