import { Link } from "react-router-dom";
import styled from "styled-components";
import home from "../assets/images/home.png";

export default function Home() {
  return (
    <Container>
      <img src={home} alt="Girl meditating" />
      <TextHolder>
        <h1>Bem-vindo ao Gratibox</h1>
        <p>
          Receba em casa um box com chás, produtos organicos, incensos e muito
          mais...
        </p>
      </TextHolder>
      <ButtonHolder>
        <Link to="/sign-up">
          <LylacButton type="button">Quero começar</LylacButton>
        </Link>
        <Link to="/login">
          <TransparentButton type="button">Já sou grato</TransparentButton>
        </Link>
      </ButtonHolder>
    </Container>
  );
}

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const TextHolder = styled.div`
  width: 341px;
  position: fixed;
  top: 30px;
  left: calc((100% - 341px) / 2);
  z-index: 1;
  h1 {
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    text-align: center;
    color: #ffffff;
    margin: 0 0 17px;
  }
  p {
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #ffffff;
  }
  @media (min-width: 1000px) {
    width: 70%;
    left: 15%;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 30px;
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
  &:hover {
    background-color: #321d70;
  }
`;

const TransparentButton = styled.button`
  width: 202px;
  height: 45px;
  background: transparent;
  border-radius: 10px;
  border: none;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
  &:hover {
    color: #321d70;
  }
`;
