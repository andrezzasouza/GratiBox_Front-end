import styled from 'styled-components';

const InnerBigContainer = styled.main`
  padding: 101px 10px 5px;
  @media (min-width: 800px) {
    width: 70%;
    margin: 0 auto;
  }
`;

const TopText = styled.p`
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
  margin: 0 0 51px;
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

const PlanBox = styled.div`
  width: 100%;
  background: #e5cdb3;
  border-radius: 25px;
  margin: 0 0 75px;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 25px;
    height: 32.8vh;
    margin: 0 0 15px;
    @media (min-width: 600px) {
      object-fit: contain;
    }
  }
  p {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #4d65a8;
    margin: 0 36px 21px;
  }
`;

const SubscribeButton = styled.button`
  width: 168px;
  height: 39px;
  background: #8c97ea;
  border-radius: 10px;
  border: none;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
  margin: 36px calc((100% - 168px) / 2) 20px;
  cursor: pointer;
`;

export { InnerBigContainer, TopText, PlanBox, SubscribeButton, WarningBox };
