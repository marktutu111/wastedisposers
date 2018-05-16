import React from 'react';
import { 
    StyleSheet,
    View
 } from 'react-native';

import { COLORS } from "../constants";



const Vr = ({ size, color }) => {
    return (
        <View style={[styles.default, 
                    {height: size, backgroundColor: color || COLORS.LIGHT_GREY_COLOR}]}></View>
    )
}



const styles = StyleSheet.create({
    default: {
        width: 1,
        padding: 0,
        margin: 0
    }

})



export { Vr }