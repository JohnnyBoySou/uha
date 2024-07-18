import React, { useEffect, useState } from 'react';
import { Main, Scroll, Column } from '@theme/global';
import { getPaySingle } from '@request/payment/pay';
import { Skeleton } from 'moti/skeleton';
import PaymentBoletoList from '@components/payments/boleto_list';
import PaymentPixList from '@components/payments/pix_list';
import Header from '@components/header';

export default function ExtractPaymentScreen({ route, }) {

    const { id } = route.params

    const [loading, setloading] = useState(true);
    const [item, setitem] = useState();
    const [type, settype] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const res = await getPaySingle(id);
                setitem(res);
                if (res?.barcode) {
                    settype('Boleto')
                } else if (res?.qrcode) {
                    settype('Pix')
                }
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        }
        if (id != undefined) {
            fetchData()
        }
    }, [id]);


    if (loading) return <SkeletonList />
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{}}>
                <Header title='Pagamento' rose />
                <Column style={{ paddingTop: 50, }}>
                    {type == 'Boleto' ? <PaymentBoletoList item={item} /> : <PaymentPixList item={item} />}
                </Column>
            </Scroll>
        </Main>
    )
}


const SkeletonList = () => {
    return (
        <Column style={{ paddingVertical: 50, alignItems: 'center', flex: 1, backgroundColor: '#fff', }}>
            <Column style={{ justifyContent: 'space-between', marginHorizontal: 28, marginVertical: 22, alignItems: 'center', }}>
                <Skeleton height={40} width={160} radius={8} colorMode='light' />
                <Column style={{ height: 8, }} />
                <Skeleton height={30} width={180} radius={6} colorMode='light' />
            </Column>
            <Skeleton height={260} width={260} radius={18} colorMode='light' />
            <Column style={{ height: 12, }} />
            <Skeleton height={30} width={180} radius={12} colorMode='light' />
            <Column style={{ height: 12, }} />
            <Skeleton height={60} width={230} radius={12} colorMode='light' />
            <Column style={{ height: 32, }} />
            <Skeleton height={50} width={170} radius={100} colorMode='light' />
        </Column>
    )
}