import styled from 'styled-components';
import dayjs from 'dayjs';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { details, updateStorage } from '../services/api';
import { InnerBigContainer, TopText } from '../assets/styles/PlanStyle';
import UserContext from '../contexts/UserContext';
import OrderContext from '../contexts/OrderContext';
import Greeting from '../components/Greeting';
import imgSubscription from '../assets/images/image03.jpg';

export default function Details() {
  const navigate = useNavigate();
  const [warning, setWarning] = useState('');
  const [planInfo, setPlanInfo] = useState({});
  const [formattedDate, setFormattedDate] = useState('');
  const [planType, setPlanType] = useState('');
  const { setUserData } = useContext(UserContext);
  const { orderInfo } = useContext(OrderContext);

  const userInfo = JSON.parse(localStorage.getItem('loginData'));

  useEffect(() => {
    updateStorage(userInfo?.token)
      .then((res) => {
        setUserData(res.data);
        localStorage.setItem('loginData', JSON.stringify(res.data));
        setWarning('');
      })
      .catch(() => {
        setWarning('Algo deu errado. Tente novamente.');
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('loginData')) {
      navigate('/');
    }
    if (!orderInfo?.type) {
      if (userInfo.plan === null) {
        navigate('/plans');
      } else {
        navigate('/details');
      }
    }
  }, []);

  function formatDate(date) {
    const newDate = dayjs(date).format(' DD/MM/YYYY');
    console.log(newDate);
    setFormattedDate(newDate);
  }

  function generateNextDates(type, deliveryDay) {
    const today = Date.now();
    console.log(today);
    today.getDay();
    deliveryDay.getDay();

    if (type === 'semanal') {
      //
    } else if (type === 'mensal') {
      // do sth
    }
  }

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('loginData'));
    details(userLogin.token)
      .then((res) => {
        setPlanInfo(res.data);
        const delivery = res.data[0].day;
        if (
          delivery === 'Segunda' ||
          delivery === 'Quarta' ||
          delivery === 'Sexta'
        ) {
          setPlanType('semanal');
        } else if (
          delivery === 'Dia 01' ||
          delivery === 'Dia 10' ||
          delivery === 'Dia 20'
        ) {
          setPlanType('mensal');
        }
        formatDate(res?.data[0].subscription_date);
        generateNextDates(planType, delivery);
      })
      .catch((err) => {
        setWarning(err.response?.data.message);
      });
  }, []);

  return (
    <InnerBigContainer>
      <Greeting />
      <TopText>“Agradecer é arte de atrair coisas boas”</TopText>
      <SubscriptionBox>
        <img
          src={imgSubscription}
          alt="Menina meditando com uma planta do lado."
        />
        {warning ? (
          warning
        ) : (
          <PlanDataContainer>
            <p>
              Plano:
              <span> {planType ? planType : '@tipo_de_plano'}</span>
            </p>
            <p>
              Data da assinatura:
              <span>{formattedDate ? formattedDate : 'dd/mm/aa'}</span>
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
              {planInfo[0]?.name
                ? planInfo.map((product) => (
                    <p>
                      <span>{product.name}</span>
                    </p>
                  ))
                : 'Produtos'}
            </ProductsDiv>
          </PlanDataContainer>
        )}
      </SubscriptionBox>
      <WarningBox>
        <p>{warning}</p>
      </WarningBox>
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
  display: flex;
  justify-content: space-between;
  p {
    font-weight: 400;
  }
`;

const WarningBox = styled.div`
  width: 290px;
  margin: 15px calc((100% - 290px) / 2);
  p {
    color: #ffffff;
    text-align: center;
    width: 90%;
  }
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
