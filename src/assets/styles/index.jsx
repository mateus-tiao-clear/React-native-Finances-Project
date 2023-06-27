import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0F0F0F;
`

export const Titulo = styled.Text`
  color: #FFF;
  font-size: 25px;
`

export const Nome = styled.Text`
  color: ${props => props.color};
  font-size: 20px;
`

export const Botao = styled.TouchableOpacity`
  background-color: #DDD;
  padding: 5px;
  border-radius: 5;
  width: 90%;
  justify-content: center;
  align-items: center;
`

export const BotaoTexto = styled.Text`
    color: #000;
    font-size: 20px;
`