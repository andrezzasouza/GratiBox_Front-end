import styled from 'styled-components';
import home from '../assets/images/home.png';

const Container = styled.main`
  height: 100dvh;
  width: 100dvw;
  background: url({home}) center no-repeat fixed;
`;

const TextHolder = styled.div`
  width: 341px;
  position: fixed;
  top: 33px;
  left: calc((100% - 341px) / 2);
  z-index: 1;
  p {
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #ffffff;
    margin: 17px 0 0;
  }
  @media (min-width: 600px) {
    width: 70%;
    left: 15%;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 35px;
  left: calc((100% - 202px) / 2);
`;

const LylacButton = styled.button`
  width: 202px;
  height: 45px;
  background: #8c97ea;
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
    background-color: #321d70;
  }
`;

const TransparentButton = styled.button`
  margin: 15px 0;
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

export { Container, TextHolder, ButtonHolder, LylacButton, TransparentButton };
