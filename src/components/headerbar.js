import React from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity
 } from 'react-native';

import MIcon from "react-native-vector-icons/MaterialIcons";


 const HeaderBar = ({ onLeftPress, 
                      onRightPress, 
                      leftIcon, 
                      rightIcon, 
                      title, 
                      style,
                      color }) => {

        const {container, textStyle} = styles;

        return (

                <View style={[container, style]}>
                        <TouchableOpacity activeOpacity={0.5} onPress={onLeftPress}>
                            <MIcon name={leftIcon} size={25} color={color}/>
                        </TouchableOpacity>
                        <Text style={[textStyle, {color: color}]}>{title}</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={onRightPress}>
                            <MIcon name={rightIcon} size={25} color={color}/>
                        </TouchableOpacity>
                </View>
        )


 }




 const styles = StyleSheet.create({
        container: {
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10
        },
        textStyle: {
            fontSize: 20
        }
 })


 export { HeaderBar };