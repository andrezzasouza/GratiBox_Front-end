import styled from 'styled-components';

const EnterHolder = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 0 0;
  img {
    width: 85%;
  }
  form {
    margin: 43px 0 0;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 600px) {
    img {
      width: 30%;
    }
  }
`;

const SuccessHeading = styled.h1`
  color: #ffffff;
  font-size: 28px;
`;

const EnterInput = styled.input`
  width: 325px;
  height: 64px;
  background: ${(props) => (props.clickable ? '#ffffff' : '#c3bfc9')};
  border: 1px solid #604848;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin: 8px 0 0;
  padding: 17px 17px 10px 17px;
  color: rgba(96, 72, 72, 0.4);
  &::placeholder {
    color: rgba(96, 72, 72, 0.4);
  }
`;

const StatusMessage = styled.div`
  width: 325px;
  height: 48px;
  margin: 15px 0 0;
  color: #ffffff;
  text-align: center;
`;

const EnterButton = styled.button`
  margin: 14px auto 15px;
  width: 237px;
  height: 56px;
  background: #8c97ea;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  border: none;
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #321d70;
  }
`;

const TransparentButton = styled.button`
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

export {
  EnterHolder,
  SuccessHeading,
  EnterInput,
  StatusMessage,
  EnterButton,
  TransparentButton
};
