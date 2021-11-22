import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { InnerBigContainer, TopText } from '../assets/styles/PlanStyle';
import Greeting from '../components/Greeting';
import imgSubscription from '../assets/images/image03.jpg';

export default function Details() {
  const navigate = useNavigate();

  if (!localStorage.getItem('loginData')) {
    navigate('/');
  }

  return (
    <InnerBigContainer>
      <Greeting />
      <TopText>“Agradecer é arte de atrair coisas boas”</TopText>
      <SubscriptionBox>
        <img
          src={imgSubscription}
          alt="Menina meditando com uma planta do lado."
        />
        <PlanDataContainer>
          <p>
            Plano:
            <span> @tipo_de_plano</span>
          </p>
          <p>
            Data da assinatura:
            <span> dd/mm/aa</span>
          </p>
          <p>Próximas entregas:</p>
          <NextDeliveries>
            <p>
              <span>dd/mm/aaaa</span>
            </p>
            <p>
              <span>dd/mm/aaaa</span>
            </p>
            <p>
              <span>dd/mm/aaaa</span>
            </p>
          </NextDeliveries>
          <ProductsDiv>
            <p>
              <span>PRODUTOSSSSS</span>
            </p>
          </ProductsDiv>
        </PlanDataContainer>
      </SubscriptionBox>
      <Rate type="button">Avaliar entregas</Rate>
    </InnerBigContainer>
  );
}

const SubscriptionBox = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding: 0 0 4px;
  margin: 0 0 8px;
  img {
    width: 100%;
    object-fit: cover;
    height: 25.8vh;
    border-radius: 10px;
    margin: 0 0 33px;
  }
`;

const PlanDataContainer = styled.section`
  margin: 0 18px 10px 19px;
  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #4d65a8;
    margin: 0 0 13px;
  }
  p {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #4d65a8;
  }
  span {
    color: #e63c80;
  }
`;

const NextDeliveries = styled.div`
  margin: 0 0 0 40px;
`;

const ProductsDiv = styled.div`
  margin: 29px 0 0;
`;

const Rate = styled.button`
  width: 237px;
  height: 56px;
  background: #8c97ea;
  border-radius: 10px;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
  margin: 0 calc((100% - 237px) / 2);
`;
