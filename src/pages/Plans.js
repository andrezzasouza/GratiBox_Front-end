import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateStorage } from '../services/api';
import Greeting from '../components/Greeting';
import UserContext from '../contexts/UserContext';
import weekImg from '../assets/images/image04.jpg';
import monthImg from '../assets/images/image02.jpg';

import {
  InnerBigContainer,
  TopText,
  PlanBox,
  SubscribeButton,
  WarningBox
} from '../assets/styles/PlanStyle';

export default function Plans() {
  const navigate = useNavigate();
  const [warning, setWarning] = useState('');
  const { setUserData } = useContext(UserContext);

  const userInfo = JSON.parse(localStorage.getItem('loginData'));

  useEffect(() => {
    updateStorage(userInfo.token)
      .then((res) => {
        setUserData(res.data);
        setWarning('');
        localStorage.setItem('loginData', JSON.stringify(res.data));
      })
      .catch(() => {
        setWarning('Algo deu errado. Tente novamente.');
      });
  });

  useEffect(() => {
    if (!localStorage.getItem('loginData')) {
      navigate('/');
    } else if (userInfo.plan !== null) {
      navigate('/details');
    }
  }, []);

  return (
    <InnerBigContainer>
      <Greeting />
      <TopText>Você ainda não assinou um plano, que tal começar agora?</TopText>
      <WarningBox>
        <p>{warning}</p>
      </WarningBox>
      <PlanBox>
        <img src={weekImg} alt="Menina sentada entre plantas meditando." />
        <p>Você recebe um box por semana.</p>
        <p>Ideal para quem quer exercer a gratidão todos os dias.</p>
        <SubscribeButton onClick={() => navigate('/subscription?type=weekly')}>
          Assinar
        </SubscribeButton>
      </PlanBox>
      <PlanBox>
        <img src={monthImg} alt="Menina sentada no quarto meditando." />
        <p>Você recebe um box por mês.</p>
        <p>Ideal para quem está começando agora.</p>
        <SubscribeButton onClick={() => navigate('/subscription?type=monthly')}>
          Assinar
        </SubscribeButton>
      </PlanBox>
    </InnerBigContainer>
  );
}
