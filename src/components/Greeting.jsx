import styled from 'styled-components';

export default function Greeting() {
  const userInfo = JSON.parse(localStorage.getItem('loginData'));

  return (
    <GreetingBox>
      <h1>Bom te ver por aqui, {userInfo ? userInfo.name : '@User'}.</h1>
    </GreetingBox>
  );
}

const GreetingBox = styled.div`
  margin: 0 0 22px;
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  color: #ffffff;
`;
