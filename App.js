import { StyleSheet, Text, View } from 'react-native';
import { Container, Titulo, Nome, Botao, BotaoTexto } from './src/assets/styles';

export default function App() {
  return (
    <Container>
      <Titulo>Ola!</Titulo>
      <Nome color="red">Tiao</Nome>

      <Botao onPress={() => alert("ola")}>
        <BotaoTexto>Entrar</BotaoTexto>
      </Botao>
    </Container>
  )
};

