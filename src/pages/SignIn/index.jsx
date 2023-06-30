import React, {useState, useContext} from "react";
import { Platform } from "react-native";
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from './styles'

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function SignIn(){
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signIn } = useContext(AuthContext)

    function handleLogin(){
        signIn(email, password)
    }

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <Logo source={require("../../assets/images/Logo.png")} />

                <AreaInput>
                    <Input placeholder="Email" autoCorrect={false} autoCapitalize="none" value={email} onChangeText={(text) => setEmail(text)}/>
                </AreaInput>

                <AreaInput>
                    <Input placeholder="Senha" autoCorrect={false} autoCapitalize="none" value={password} onChangeText={(text) => setPassword(text)}/>
                </AreaInput>

                <SubmitButton onPress={handleLogin}>
                    <SubmitText>Entrar</SubmitText>
                </SubmitButton>

                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Crie uma conta!</LinkText>
                </Link>
            </Container>
        </Background>
    )
}