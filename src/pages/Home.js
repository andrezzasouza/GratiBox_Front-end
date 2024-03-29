import { Link } from 'react-router-dom';
import home from '../assets/images/home.png';
import Welcome from '../components/Welcome';
import {
  Container,
  TextHolder,
  ButtonHolder,
  LylacButton,
  TransparentButton
} from '../assets/styles/HomeStyle';

export default function Home() {
  return (
    <Container>
      <img src={home} alt="Girl meditating" />
      <TextHolder>
        <Welcome />
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
