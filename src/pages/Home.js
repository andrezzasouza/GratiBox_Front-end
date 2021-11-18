import { Link } from "react-router-dom";
import styled from "styled-components";
import home from "../assets/images/home.png";

export default function Home() {
  return (
    <Container>
      <div>
        <h1>Bem vindo ao Gratibox</h1>
        <p>
          Receba em casa um box com chás, produtos organicos, incensos e muito
          mais...
        </p>
      </div>
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
  background-image: url(${home});
  background-size: auto 100%;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px 23px 50px;

  h1 {
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    text-align: center;
    color: #ffffff;
    margin: 0 0 40px;
  }
  p {
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #ffffff;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  }
`;
