import { useNavigate } from 'react-router-dom';
import Greeting from '../components/Greeting';
import weekImg from '../assets/images/image04.jpg';
import monthImg from '../assets/images/image02.jpg';
import {
  InnerBigContainer,
  TopText,
  PlanBox,
  SubscribeButton
} from '../assets/styles/PlanStyle';

export default function Plans() {
  const navigate = useNavigate();

  return (
    <InnerBigContainer>
      <Greeting />
      <TopText>Você ainda não assinou um plano, que tal começar agora?</TopText>
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
