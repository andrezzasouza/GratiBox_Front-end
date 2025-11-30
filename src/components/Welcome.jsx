import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Welcome() {
  return (
    <Link to="/">
      <WelcomeText>Bem-vindo ao Gratibox</WelcomeText>
    </Link>
  );
}

const WelcomeText = styled.h1`
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  text-align: center;
  color: #ffffff;
`;
