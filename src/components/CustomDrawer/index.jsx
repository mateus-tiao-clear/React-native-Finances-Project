import { View, Text, Image } from "react-native";

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer({props}){
    const { user, signOut} = useContext(AuthContext)

    return (
        <DrawerContentScrollView {...props}>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                <Image
                 source={require('../../assets/Logo.png')}
                 style={{width: 85, height: 85}}
                 resizeMode="contain"
                 />

                 <Text style={{color: '#FFF', fontSize: 18, marginTop: 5}}>
                    Welcome!!!!
                 </Text>

                 <Text style={{color: '#FFF', fontWeight: 'bold', paddingBottom: 25}}>
                    {user && user.nome}
                 </Text>
            </View>

            <DrawerItemList {...props}/>

            <DrawerItem {...props} label='Sair da app' inactiveBackgroundColor="c62c36" onPress={() => signOut()}/>

        </DrawerContentScrollView>
    )
}