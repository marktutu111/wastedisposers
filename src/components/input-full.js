import React from 'react';
import { 
    StyleSheet,
    TextInput
 } from 'react-native';

import { COLORS } from "../constants";



const InputFull = ({ placeholder, password, type, style, onChangeText, editable }) => {

    const { inputStyle } = styles;

    return (
        <TextInput style={[inputStyle, style]} secureTextEntry={password}
                   placeholder={placeholder} 
                   keyboardType={type}
                   onChangeText={onChangeText} 
                   autoCapitalize='none'
                   editable={editable}
                   underlineColorAndroid="transparent"/>
    )
}



const styles = StyleSheet.create({
    inputStyle: {
        padding: 10,
        borderRadius: 0,
        backgroundColor: COLORS.WHITE_COLOR
    }

})



export { InputFull }