import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/auth";

export default function New(){
    const {signOut} = useContext(AuthContext)

    return (
        <View>
            <Text>Tiao</Text>
            <Button 
            title="Sair da conta"
            onPress={() => signOut()}
            />
        </View>
    )
}