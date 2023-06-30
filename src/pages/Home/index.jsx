import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Alert, TouchableOpacity, Platform } from "react-native";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import { Background, Container, Saldo, Title, Nome, List, Area } from "./styles"
import HistoricoList from "../../components/ListHistoric";

import firebase from "../../services/firebaseConnection";
import { format, isBefore, isPast } from "date-fns";
import DatePicker from "../../components/DatePicker";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home() {
    const { user, signOut } = useContext(AuthContext)
    const [saldo, setSaldo] = useState(0)


    const uid = user && user.uid

    const [historico, setHistorico] = useState([])
    const [newDate, setNewDate] = useState(new Date())
    const [show, setShow] = useState(false)

    function handleDelete(data) {
        alert(data.valor)

        const [dia, mes, ano] = data.date.split("/")
        const dateItem = new Date(`${ano}/${mes}/${dia}`)

        let dateHoje = format(new Date(), 'dd/MM/yyyy')
        const [diaHoje, mesHoje, anoHoje] = dateHoje.split('/')

        dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`)

        if (isBefore(dateItem, dateHoje)) {
            alert("Voce nao pode excluir um registro antigo!")
            return
        }

        Alert.alert(
            'Cuidado Atenção!',
            'Voce deseja excluir ' + data.tipo + ' - Valor: ' + data.valor,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleDeleteSuccess(data)
                }
            ]
        )
    }

    async function handleDeleteSuccess(data) {
        await firebase.database().ref('historico').child(uid)
            .child(data.key).remove().then(async () => {
                let saldoAtual = saldo

                data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor)

                await firebase.database().ref('users').child(uid)
                    .child('saldo').set(saldoAtual)
            })
            .catch((e) => {
                alert("Nao foi possivel excluir sua movimentação")
            })
    }

    function handleShowPicker() {
        setShow(true)
    }

    function handleClose() {
        setShow(false)
    }

    function onChange(date) {
        setShow(Platform.OS === 'ios')
        setNewDate(date)
    }

    useEffect(() => {
        async function loadList() {
            await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo)
            })

            await firebase.database().ref('historico').child(uid).orderByChild('date')
                .equalTo(format(newDate, 'dd/MM/yy')).limitToLast(10).on('value', (snapshot) => {
                    setHistorico([])

                    snapshot.forEach((childItem) => {
                        let list = {
                            key: childItem.key,
                            tipo: childItem.val().tipo,
                            valor: childItem.val().valor,
                            date: childItem.val().date
                        }

                        setHistorico(oldArray => [...oldArray, list].reverse())
                    })
                })
        }

        loadList()
    }, [newDate])

    return (
        <Background>
            <Header />
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2)}</Saldo>
            </Container>

            <Area>
                <TouchableOpacity onPress={handleShowPicker}>
                    <Icon name="event" color="#FFF" size={30} />
                </TouchableOpacity>

                <Title>Ultimas movimentações</Title>
            </Area>
            <List
                showsVerticalScrollIndicator={false}
                data={historico}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete}/>)}
            />
            { show && (<DatePicker onClose={handleClose} date={newDate} onChange={onChange}/>)}
        </Background>
    )
}