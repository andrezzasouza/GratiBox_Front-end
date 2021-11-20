import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { signUp } from '../services/api';
import { signUpErr, matchPasswords } from '../assets/misc/StatusMessages';
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
          <img src={lotus} alt="Imagem de uma flor de lotus" />
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

const EnterHolder = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 0 0;
  img {
    width: 85%;
  }
  form {
    margin: 43px 0 0;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 600px) {
    img {
      width: 30%;
    }
  }
`;

const SuccessHeading = styled.h1`
  color: #ffffff;
  font-size: 28px;
`;

const EnterInput = styled.input`
  width: 325px;
  height: 64px;
  background: ${(props) => (props.clickable ? '#ffffff' : '#c3bfc9')};
  border: 1px solid #604848;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin: 8px 0 0;
  padding: 17px 17px 10px 17px;
  color: rgba(96, 72, 72, 0.4);
  &::placeholder {
    color: rgba(96, 72, 72, 0.4);
  }
`;

const StatusMessage = styled.div`
  width: 325px;
  height: 48px;
  margin: 15px 0 0;
  color: #ffffff;
  text-align: center;
`;

const EnterButton = styled.button`
  margin: 14px auto 15px;
  width: 237px;
  height: 56px;
  background: #8c97ea;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  border: none;
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #321d70;
  }
`;

const TransparentButton = styled.button`
  background: transparent;
  border-radius: 10px;
  border: none;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    color: #321d70;
  }
`;
