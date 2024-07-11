import React, { useEffect, useState } from 'react';
import { Text, Alert, ActivityIndicator, TextInput, Pressable } from 'react-native';
//import { WebView } from 'react-native-webview';
import { Button, Column, Title } from '@theme/global';
import { loadMercadoPago } from "@mercadopago/sdk-js";


export default function PaymentCredito({ product, user }) {
    const id = 'product.id'
    const email = 'user.email'
    const descricao = 'product.name'
    const valor = 'product.price'

    const url = `${id}/${email}/${descricao}/${valor}`
    const stateChange = (state) => {
        switch (state.title) {
            case 'success':
                Alert.alert("Pagamento aprovado!", `Recebemos seu pagamento de ${vlrPagamento}`)
                break;
            case 'pending':
                Alert.alert("Pagamento pendente!", `Seu pagamento de ${vlrPagamento} está pendente de processamento, assim que for processado seguiremos com o pedido!`)
                break;
            case 'failure':
                Alert.alert("Pagamento não aprovado!", 'Verifique os dados e tente novamente')
                break;
        }
    }

    useEffect(() => {
        const fecthData = async () => {
        try {
            await loadMercadoPago()
            console.log(mp)
        } catch (error) {
            console.log(error)
        } finally {
            console.log('terminou')
        }
        }
        fecthData()

    }, [])







    return (
        <Column style={{ flex: 1, justifyContent: 'center' }}>
            <Column>
                <Title>Pagamento do pedido</Title>
            </Column>
        </Column>
    )

}

/*

<WebView
source={{ uri: `https://3333-f242b4a4-9b16-45ad-92f8-80bcd2dc363a.ws-us02.gitpod.io/payments/checkout/${url}` }}
onNavigationStateChange={state => stateChange(state)}
startInLoadingState={true}
renderLoading={() => <ActivityIndicator></ActivityIndicator>}
/> 
*/