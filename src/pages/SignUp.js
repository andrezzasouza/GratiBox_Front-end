import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { signUp } from '../services/api';
import { signUpErr, matchPasswords } from '../assets/misc/StatusMessages';
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

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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

  function createAccount(e) {
    e.preventDefault();
    setEnabled(false);
    setMessage('');

    const body = {
      name,
      email,
      password,
      repeatPassword
    };

    if (password === repeatPassword) {
      signUp(body)
        .then(() => {
          setHide(true);
          setName('');
          setEmail('');
          setPassword('');
          setRepeatPassword('');
          setTimeout(() => navigate('/login'), 5000);
        })
        .catch((err) => {
          alterMsg(signUpErr(err));
          setEnabled(true);
        });
    } else {
      setEnabled(true);
      alterMsg(matchPasswords);
    }
  }

  return (
    <EnterHolder>
      {hide ? (
        <>
          <img
            src={lotus}
            alt="Imagem de uma pessoa com uma flor de lotus atrás"
          />
          <SuccessHeading>Conta criada com sucesso!</SuccessHeading>
          <StatusMessage>
            Sua jornada de gratidão vai começar! Estamos te redirecionando para
            a tela de login.
          </StatusMessage>
        </>
      ) : (
        <>
          <Welcome />
          <form onSubmit={createAccount}>
            <EnterInput
              placeholder="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              clickable={enabled}
              disabled={!enabled}
              required
            />
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
            <EnterInput
              placeholder="Confirme a senha"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              clickable={enabled}
              disabled={!enabled}
              required
            />
            <StatusMessage>{message}</StatusMessage>
            <EnterButton type="submit">
              {enabled ? (
                'Cadastrar'
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
          <Link to={enabled ? '/login' : '/sign-up'}>
            <TransparentButton>Já sou grato</TransparentButton>
          </Link>
        </>
      )}
    </EnterHolder>
  );
}
