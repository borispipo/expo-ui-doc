import {H6} from "$ecomponents/Typography";
import appConfig from "$capp/config";
import View from "$ecomponents/View";
import { StyleSheet } from "react-native";
import theme from "$theme";
import {Status} from "$ecomponents/Button";

export default function DocVersionComponent(props){
    return <Status style={[theme.styles.m1]} label={`Version ${appConfig.version}`} labelProps = {{textBold:true}} {...props}/>
}