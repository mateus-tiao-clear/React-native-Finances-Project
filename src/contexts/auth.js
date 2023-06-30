import React, { createContext, useEffect, useState } from "react";
import firebase from "../services/firebaseConnection"

import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({})

function AuthProvider({ children }){
   
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)

    useEffect(() => {
      async function getUser(){
          const storageUser = await AsyncStorage.getItem("user")

        if(storageUser){
            setUser(JSON.parse(storageUser))
        }   

        setLoading(false)

      }

      getUser()
    }, [])

    async function signIn(email, password){
        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid

            await firebase.database().ref('users').child(uid).once('value').then((snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
            }).catch((e) => {
                alert("Nao foi possivel cadastrar o usuario")
                setLoadingAuth(false)
            })

        }).catch((e) => {
            alert("Nao foi possivel fazer o login")
            setLoadingAuth(false)
        })
    }

    async function signUp(email, password, nome){
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(async (value)=> {
            let uid = value.user.uid

            await firebase.database().ref('users').child(uid).set({
                nome: nome,
                saldo: 0
            }).then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
            }).catch((e) => {
                alert("Nao foi possivel cadastrar o usuario")
                setLoadingAuth(false)
            })
        })
    }

    async function signOut(){
        await firebase.auth().signOut()
        await AsyncStorage.clear().then(() => {
            setUser(null)
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('user', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{ user, signed: !!user, signUp, signIn, signOut, loading, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
  }

  export default AuthProvider