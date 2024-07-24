import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { Image } from 'expo-image';
import { getCertificado } from '@api/request/extract/certificado';
import { Platform, Alert } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function CertificateScreen({ navigation, route = {} }) {
    const { color, margin, font } = useContext(ThemeContext);

    const ong = route.params?.ong ? route.params?.ong : 1
    const doacao = route.params?.doacao ? route.params?.doacao : 1
    const formatValue = (val) => { return parseInt(val).toLocaleString('pt-BR') };
    const [item, setitem] = useState();
    const [loading, setloading] = useState(true);
    const [loadingImage, setloadingImage] = useState(false);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await getCertificado(ong, doacao);
                setitem(res);
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false);
            }
        }
        fecthData()
    }, [])

    const base64Image = ''
    const checkPermission = async () => {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          return status === 'granted';
      };

      const downloadImage = async () => {
        setloadingImage(true)
        if (await checkPermission()) {
          const fileUri = FileSystem.documentDirectory + 'image.png';
          const base64Data = base64Image.split('data:image/png;base64,')[1];
    
          try {
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64
            });
            
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync('Download', asset, false);
            setloadingImage(false)
          } catch (err) {
            console.log('Falha ao baixar a imagem', err);
          }
        } 
      };

    const handlePDF = () => {
    }
    return (
        <Main style={{ backgroundColor: color.background, }}>
            <Scroll>
                <Header rose />
                <Column style={{ marginHorizontal: margin.h, }}>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Image source={require('@imgs/logo.png')} style={{ width: 100, height: 60, }} contentFit='contain' />
                        <Title style={{ color: color.primary, fontSize: 16, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: color.secundary, borderRadius: 100, color: '#fff', }}>Certificado</Title>
                    </Row>

                    <Title style={{ fontSize: 24, }}>Doação generosa</Title>
                    <Title style={{ color: color.primary, fontSize: 32, }}>R$ {formatValue(item?.value)},00</Title>
                    <Title style={{ fontSize: 18, marginVertical: 12, }}>Beneficiado: {item?.instituicao}</Title>
                    <Label style={{ fontSize: 16, fontFamily: 'Font_Medium', letterSpacing: -0.6, }}>Este ato de solidariedade e generosidade contribuirá significativamente para nós. Agradecemos profundamente seu apoio e comprometimento com nossa causa.</Label>
                    <Title style={{ fontSize: 16, marginVertical: 12, }}>{item?.date}</Title>


                    <Image source={require('@imgs/assinatura.png')} style={{ width: 140, height: 60, borderBottomWidth: 2, borderBottomColor: color.secundary, }} contentFit='contain' />
                    <Title style={{ fontSize: 18, marginTop: 10, marginBottom: -4, }}>{item?.name}</Title>
                    <Title style={{ fontFamily: 'Font_Book', fontSize: 16, }}>{item?.label}</Title>

                    <Row style={{ justifyContent: 'space-evenly', alignItems: 'center', marginTop: 30, }}>
                        <ButtonPR disabled={loadingImage} style={{ paddingHorizontal: 16, paddingVertical: 8, }} onPress={downloadImage} >
                            <>
                                {loadingImage ? <LabelPR style={{  }}>Baixando...</LabelPR> : <LabelPR style={{ }}>Baixar Imagem</LabelPR>}
                            </>
                        </ButtonPR>
                        <ButtonPR style={{ backgroundColor: color.primary + 20, paddingHorizontal: 16, paddingVertical: 8, }} onPress={handlePDF} >
                            <LabelPR style={{ color: color.primary }}>Abrir PDF</LabelPR>
                        </ButtonPR>
                    </Row>

                </Column>

            </Scroll>
        </Main>
    )
}