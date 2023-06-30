import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    background-color: #131313;
`

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#222'
})`
    height: 50px;
    width: 90%;
    background-color: rgba(255,255,255,0.9);
    margin-top: 30px;
    font-size: 17px;
    padding: 10px;
`

export const SubmitButton = styled.TouchableOpacity`
    height: 50px;
    width: 90%;
    background-color: #00b94a;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

export const SubmitText = styled.Text`
    font-size: 21px;
    font-weight: bold;
    color: #FFF;
` 