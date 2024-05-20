import styled from 'styled-components/native';
import {  TouchableRipple } from 'react-native-paper';

export const Main = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.background};
`
export const Scroll = styled.ScrollView`
  flex: 1;
`

export const View = styled.View`

`
export const Row = styled.View`
  flex-direction: row;
  display: flex;
`

export const Column = styled.View`
  flex-direction: column;
  display: flex;
`

export const Spacer = ({ height = 16, width = 16, }) => <Column style={{ height, width }} />


export const Button = styled(TouchableRipple).attrs(() => ({
  borderless: true, 
  rippleColor: "#FFFFFF90",
}))`
`


export const ButtonPR = styled(TouchableRipple).attrs(() => ({
  borderless: true, 
  rippleColor: "#FFFFFF90",
}))`
  background-color: ${props => props.theme.color.primary};
  border-radius: 100px;
  text-align: center;
  align-items: center;
  justify-content: center;
`
export const ButtonSE = styled(TouchableRipple).attrs(() => ({
  borderless: true, 
  rippleColor: "#FFFFFF90",
}))`
  border-radius: 100px;
  text-align: center;
  padding-vertical: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.secundary};
`


export const ButtonLI = styled(TouchableRipple).attrs(() => ({
  borderless: true, 
  rippleColor: "#FFFFFF90",
}))`
  border-radius: 100px;
  text-align: center;
  align-items: center;
  padding-vertical: 12px;
  justify-content: center;
  background-color: ${props => props.theme.color.light};
`





export const LineD = styled.View`
  color: #00000030;
  height: 2px;
  width: 100%;
`;

export const LineL = styled.View`
  color: #ffffff30;
  height: 2px;
  width: 100%;
`;

export const LabelLI = styled.Text`
  color: ${props => props.theme.color.title};
  font-size: 18px;
  font-family: ${props => props.theme.font.bold};
`;


export const LabelSE = styled.Text`
  color: ${props => props.theme.color.light};
  font-size: 18px;
  font-family: ${props => props.theme.font.bold};
`;


export const ButtonLabel = styled.Text`
  color: ${props => props.theme.color.light};
  font-size: 18px;
  text-align: center;
  margin-top: 8px;
  flex-grow: 2;
  font-family: ${props => props.theme.font.medium};
`;

export const ButtonIcon = styled.View`
  width: 50px;
  border-left-color: #FFF;
  border-left-width: 2px;
  margin-top: -20px;
  margin-bottom: -20px;
`



export const Label = styled.Text`
  color: ${props => props.theme.color.label};
  font-size: 18px;
  font-family: ${props => props.theme.font.book};
`;

export const Title = styled.Text`
  color: ${props => props.theme.color.title};
  letter-spacing: -.5px;
  font-size: 24px;
  font-family: ${props => props.theme.font.bold};
`;

export const AuthorLabel = styled.Text`
  color: ${props => props.theme.color.secundary};
  font-size: 18px;
  font-family: ${props => props.theme.font.medium};
`;



export const BtCircle = styled(TouchableRipple).attrs(() => ({
  borderless: true, 
  rippleColor: "#FFFFFF90",
}))`
  background: ${props => props.theme.color.primary};
  border-radius: 100px;
  align-items: center;
  text-align: center;
  justify-content: center;
  `


  export const HeadTitle = styled.Text`
  color: ${props => props.theme.color.title};
  font-size: 22px;
  font-family: ${props => props.theme.font.medium};
`


