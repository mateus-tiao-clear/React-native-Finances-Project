import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";

import { Container, Nome, NewLink, NewText, Logout, LogoutText } from "./styles";

export default function Profile() {
    const { signOut, user } = useContext(AuthContext)
    const navigation = useNavigation(AuthContext)

    return (
        <Container>
            <Header />
            <Nome>{user && user.nome}</Nome>
            <NewLink onPress={() => navigation.navigate("Registrar")}>
                <NewText>Cadastrar gastos</NewText>
            </NewLink>

            <Logout onPress={() => signOut()}>
                <LogoutText>Logout</LogoutText>
            </Logout>
        </Container>
    )
}