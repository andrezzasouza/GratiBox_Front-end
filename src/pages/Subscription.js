import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ImArrowDown2, ImArrowUp2 } from 'react-icons/im';
import { InnerBigContainer, TopText } from '../assets/styles/PlanStyle';
import { updateStorage } from '../services/api';
import UserContext from '../contexts/UserContext';
import OrderContext from '../contexts/OrderContext';
import Greeting from '../components/Greeting';
import imgSubscription from '../assets/images/image03.jpg';

export default function Subscription() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setOrderInfo } = useContext(OrderContext);
  const { setUserData } = useContext(UserContext);

  const [planType, setPlanType] = useState('Plano');
  const [openPlanList, setOpenPlanList] = useState(false);
  const [chooseDay, setChooseDay] = useState('Dia');
  const [openDayList, setOpenDayList] = useState(false);
  const [warning, setWarning] = useState('');
  const [tea, setTea] = useState(false);
  const [incense, setIncense] = useState(false);
  const [organic, setOrganic] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('loginData'));
  const subscriptionData = {};

  const validType = planType === 'Mensal' || planType === 'Semanal';
  const validProducts = tea || incense || organic;
  const validDay =
    (planType === 'Mensal' &&
      (chooseDay === 'Dia 01' ||
        chooseDay === 'Dia 10' ||
        chooseDay === 'Dia 20')) ||
    (planType === 'Semanal' &&
      (chooseDay === 'Segunda' ||
        chooseDay === 'Quarta' ||
        chooseDay === 'Sexta'));

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
    if (location.search.includes('weekly')) {
      setPlanType('Semanal');
    } else if (location.search.includes('monthly')) {
      setPlanType('Mensal');
    } else {
      setPlanType('Plano');
    }
  }, []);

  function goToAddress() {
    setWarning('');
    if (validType && validDay && validProducts) {
      subscriptionData.type = planType;
      subscriptionData.day = chooseDay;
      subscriptionData.tea = tea;
      subscriptionData.incense = incense;
      subscriptionData.organic = organic;
      setOrderInfo(subscriptionData);
      navigate('/place-order');
    }
    if (!validProducts) {
      setWarning(
        'Você deve escolher pelo menos um dos produtos que deseja receber.'
      );
    }
    if (!validDay) {
      setWarning(
        'Você deve escolher entre os dias 01, 10 e 20 para o plano mensal ou seguda, quarta e sexta para o plano semanal '
      );
    }
    if (!validType) {
      setWarning(
        'Você deve escolher o plano mensal ou o plano semanal para continuar.'
      );
    }
  }

  const plans = ['Semanal', 'Mensal'];
  const weeklyDays = ['Segunda', 'Quarta', 'Sexta'];
  const monthlyDays = ['Dia 01', 'Dia 10', 'Dia 20'];

  return (
    <InnerBigContainer>
      <Greeting />
      <TopText>“Agradecer é arte de atrair coisas boas”</TopText>
      <SubscriptionBox>
        <img
          src={imgSubscription}
          alt="Menina meditando com uma planta do lado."
        />
        <LowerContainer>
          <CategoryBox
            visible={openPlanList}
            onClick={() => setOpenPlanList(!openPlanList)}
          >
            <AlwaysVisible>
              <h2 visible={openPlanList}>{planType}</h2>
              {openPlanList ? (
                <ImArrowUp2 className="arrow" />
              ) : (
                <ImArrowDown2 className="arrow" />
              )}
            </AlwaysVisible>
            <DropDown visible={openPlanList}>
              {plans.map((type, index) => (
                <TypeHolder
                  key={index}
                  onClick={() => {
                    if (planType !== type) {
                      setPlanType(type);
                      setChooseDay('Dia');
                    }
                  }}
                >
                  {type}
                </TypeHolder>
              ))}
            </DropDown>
          </CategoryBox>
          <CategoryBox
            visible={openDayList}
            onClick={() => setOpenDayList(!openDayList)}
          >
            <AlwaysVisible>
              <h2 visible={openDayList}>
                {planType === 'Plano' ? 'Dia' : chooseDay}
              </h2>
              {openDayList ? (
                <ImArrowUp2 className="arrow" />
              ) : (
                <ImArrowDown2 className="arrow" />
              )}
            </AlwaysVisible>
            <DropDown visible={openDayList}>
              {planType === 'Plano' ? (
                <p>Escolha um plano acima para ver as opções de dias.</p>
              ) : planType === 'Semanal' ? (
                weeklyDays.map((type, index) => (
                  <TypeHolder key={index} onClick={() => setChooseDay(type)}>
                    {type}
                  </TypeHolder>
                ))
              ) : (
                monthlyDays.map((type, index) => (
                  <TypeHolder key={index} onClick={() => setChooseDay(type)}>
                    {type}
                  </TypeHolder>
                ))
              )}
            </DropDown>
          </CategoryBox>
          <ProductsBox>
            <h2>Quero receber</h2>
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Chás"
                  id="tea"
                  onChange={(e) => setTea(e.target.checked)}
                />
                <label htmlFor="tea">Chás</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Incensos"
                  id="incense"
                  onChange={(e) => setIncense(e.target.checked)}
                />
                <label htmlFor="incense">Incensos</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Produtos orgânicos"
                  id="organic"
                  onChange={(e) => setOrganic(e.target.checked)}
                />
                <label htmlFor="organic">Produtos orgânicos</label>
              </li>
            </ul>
          </ProductsBox>
        </LowerContainer>
      </SubscriptionBox>
      <WarningBox>
        <p>{warning}</p>
      </WarningBox>
      <SubscriptionButton onClick={() => goToAddress()}>
        Próximo
      </SubscriptionButton>
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

const LowerContainer = styled.section`
  margin: 0 37px 0 27px;
  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #4d65a8;
    margin: 0 0 13px;
  }
`;

const CategoryBox = styled.div`
  width: 290px;
  height: ${(props) => (props.visible ? 'auto' : '44px')};
  background: rgba(224, 209, 237, 0.62);
  border-radius: 5px;
  padding: 10px 12px 5px;
  margin: 0 0 7px;

  .arrow {
    color: #4d65a8;
    font-size: 21px;
    margin: 0 0 13px;
  }
`;

const AlwaysVisible = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropDown = styled.div`
  width: 290px;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  p {
    max-width: 85%;
    font-size: 18px;
    line-height: 21px;
    color: #4d65a8;
  }
`;

const TypeHolder = styled.div`
  width: 85%;
  height: 44px;
  padding: 11.5px 0;
  font-size: 18px;
  line-height: 21px;
  border-top: 1px solid rgba(77, 101, 168, 0.3);
  color: #4d65a8;
`;

const ProductsBox = styled.div`
  width: 290px;
  background: rgba(224, 209, 237, 0.62);
  border-radius: 5px;
  padding: 5px 31px 0 12px;
  margin: 0 0 7px;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  li {
    margin: 0 0 17px;
  }
  label {
    font-size: 18px;
    line-height: 21px;
    color: #4d65a8;
    vertical-align: middle;
  }
  input {
    width: 20px;
    height: 20px;
    vertical-align: middle;
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

const SubscriptionButton = styled.button`
  width: 202px;
  height: 39px;
  background: #8c97ea;
  border-radius: 10px;
  border: none;
  margin: 0 calc((100% - 202px) / 2);
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
`;
