import { useState, useContext } from 'react'
import { Background, Input, SubmitButton, SubmitText} from './styles'

import Picker from '../../components/Picker/index.android'

import firebase from '../../services/firebaseConnection'

import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'

import { AuthContext } from '../../contexts/auth'

export default function New(){
    const [valor, setValor] = useState('')
    const [tipo, setTipo] = useState('receita')

    const navigation = useNavigation()

    const { user } = useContext(AuthContext)

    function handleSubmit(){
        Keyboard.dismiss()

        if(isNaN(parseFloat(valor)) || tipo === null){
            alert('preencha todos os campos')
            return
        }

        Alert.alert(
        'Confirmando dados',
        'Tipo' + tipo + ' - Valor' + parseFloat(valor),
        [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Continuar',
                onPress: () => handleAdd()
            }
        ]
        )
    }

    async function handleAdd(){
        let uid = user.uid

        let key = await firebase.database().ref('historico').child(uid).push().key

        await firebase.database().ref('historico').child(uid).child(key).set({
            tipo: tipo,
            valor: parseFloat(valor),
            date: format(new Date(), 'dd/MM/yy')
        })

        let usuario = firebase.database().ref('users').child(uid)

        await usuario.once('value').then((snapshot) => {
            let saldo = parseFloat(snapshot.val().saldo)

            tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor)

            usuario.child('saldo').set(saldo)
        })

        setValor('')
        Keyboard.dismiss()
        navigation.navigate('Home')
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Background>
            <Header />

            <SafeAreaView style={{ alignItems: 'center' }}>
                <Input 
                placeholder='Valor desejado' 
                keyboardType="numeric"
                onSubmitEditing={() => Keyboard.dismiss()} 
                value={valor}
                onChangeText={(text) => setValor(text)}
                />

                <Picker onChange={setTipo} tipo={tipo}/>

                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Register</SubmitText>
                </SubmitButton>
            </SafeAreaView>


        </Background>
    </TouchableWithoutFeedback>
    )
}