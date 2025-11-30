import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImArrowDown2, ImArrowUp2 } from 'react-icons/im';
import { InnerBigContainer, TopText } from '../assets/styles/PlanStyle';
import { placeOrder, updateStorage } from '../services/api';
import UserContext from '../contexts/UserContext';
import OrderContext from '../contexts/OrderContext';
import Greeting from '../components/Greeting';
import imgSubscription from '../assets/images/image03.jpg';

export default function PlaceOrder() {
  const navigate = useNavigate();
  const { orderInfo } = useContext(OrderContext);
  const { setUserData } = useContext(UserContext);

  const [openStateList, setOpenStateList] = useState(false);
  const [warning, setWarning] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Estado');

  const cepMask = (cepFormat) => cepFormat.replace(/(\d{5})(\d{3})/, '$1-$2');
  const userInfo = JSON.parse(localStorage.getItem('loginData'));

  useEffect(() => {
    updateStorage(userInfo?.token)
      .then((res) => {
        setUserData(res.data);
        localStorage.setItem('loginData', JSON.stringify(res.data));
      })
      .catch(() => {
        setWarning('Algo deu errado. Tente novamente.');
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('loginData')) {
      navigate('/');
    }
    if (!orderInfo.type) {
      if (userInfo.plan === null) {
        navigate('/plans');
      } else {
        navigate('/details');
      }
    }
  }, []);

  const ufs = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MS',
    'MT',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ];

  function finishOrder() {
    setWarning('');
    const formattedCep = cep.replace('-', '');
    let orderData = orderInfo;
    orderData = { ...orderData, name, street, formattedCep, city, state };
    placeOrder(orderData, userInfo.token)
      .then(() => {
        setName('');
        setStreet('');
        setCep('');
        setCity('');
        navigate('/details');
      })
      .catch(() => {
        setWarning('Algo deu errado. Tente novamente.');
      });
  }

  function checkData() {
    setWarning('');
    setDisabled(true);
    const validName = name.length >= 4 && typeof name === 'string';
    const validStreet = street.length >= 5 && typeof street === 'string';
    const validCep = cep.length === 8 || cep.length === 9;
    const validCity = city.length >= 2 && typeof city === 'string';
    const validState = state.length === 2 && typeof state === 'string';

    if (validName && validStreet && validCep && validCity && validState) {
      finishOrder();
    } else if (!validState) {
      setWarning(
        'Você deve selecionar a sigla de duas letras de um estado ou distrito válido.'
      );
      setDisabled(false);
    } else if (!validCity) {
      setWarning('O nome da cidade deve ter pelo menos 2 letras.');
      setDisabled(false);
    } else if (!validCep) {
      setWarning(
        'O CEP deve conter apenas 8 números e um traço. Não deve ter letras, pontos ou símbolos.'
      );
      setDisabled(false);
    } else if (!validStreet) {
      setWarning('O endereço deve ter pelo menos 5 caracteres.');
      setDisabled(false);
    } else if (!validName) {
      setWarning(
        'O nome completo deve ter ao total pelo menos 4 letras e/ou espaços.'
      );
      setDisabled(false);
    }
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
        <LowerContainer>
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
          />
          <input
            type="text"
            placeholder="Endereço de entrega"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            disabled={disabled}
          />
          <input
            type="string"
            placeholder="CEP"
            value={cepMask(cep)}
            onChange={(e) => setCep(e.target.value)}
            pattern=".{8,9}"
            disabled={disabled}
          />
          <CityAndState>
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={disabled}
            />
            <CategoryBox
              visible={openStateList}
              onClick={() => setOpenStateList(!openStateList)}
            >
              <AlwaysVisible>
                <h2>{state}</h2>
                {openStateList ? (
                  <ImArrowUp2 className="arrow" />
                ) : (
                  <ImArrowDown2 className="arrow" />
                )}
              </AlwaysVisible>
              <DropDown visible={openStateList}>
                {ufs.map((uf, index) => (
                  <TypeHolder key={index} onClick={() => setState(uf)}>
                    <p>{uf}</p>
                  </TypeHolder>
                ))}
              </DropDown>
            </CategoryBox>
          </CityAndState>
        </LowerContainer>
      </SubscriptionBox>
      <WarningBox>
        <p>{warning}</p>
      </WarningBox>
      <SubscriptionButton
        onClick={() => checkData(name, street, cep, city, state)}
      >
        Finalizar
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
    margin: 0 0 9px;
  }
  input {
    width: 290px;
    height: 44px;
    background: rgba(224, 209, 237, 0.62);
    border-radius: 5px;
    border: none;
    padding: 10px 12px 5px;
    margin: 0 0 7px;
    font-size: 18px;
    line-height: 21px;
    color: #4d65a8;
    font-weight: 700;
    font-family: Roboto, sans-serif;

    &::placeholder {
      font-size: 18px;
      line-height: 21px;
      color: #4d65a8;
      font-weight: 700;
      font-family: Roboto, sans-serif;
    }
  }
`;

const CityAndState = styled.div`
  display: flex;
  input {
    width: 168px;
  }
`;

const CategoryBox = styled.div`
  width: 108px;
  height: ${(props) => (props.visible ? '132px' : '44px')};
  overflow-y: ${(props) => (props.visible ? 'scroll' : 'visible')};
  background: rgba(224, 209, 237, 0.62);
  border-radius: 5px;
  padding: 10px 12px 5px;
  margin: 0 0 7px 13px;

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
  width: 83.8px;
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
  width: 83.8px;
  height: 44px;
  padding: 11.5px 0;
  font-size: 18px;
  line-height: 21px;
  border-top: 1px solid rgba(77, 101, 168, 0.3);
  color: #4d65a8;
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
