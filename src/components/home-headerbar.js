import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Colors from "../resources/styles/colors";
import { IconButton } from "../components";
import colors from '../resources/styles/colors';



const HomeHeaderBar = ({ onLeftPress, onRightPress, title, leftIcon, rightIcon, background }) => {

        const { container, textStyle, titleContainer } = styles;

        return (

            <View style={[container, {backgroundColor: background}]}>
                
                <View style={titleContainer}>
                    <IconButton name={leftIcon} size={25} onPress={onLeftPress} 
                                color={colors.WHITE_COLOR}/>
                    <Text style={textStyle}>{ title }</Text>
                </View>
                <IconButton name={rightIcon} size={25}
                            onPress={onRightPress}
                            color={colors.WHITE_COLOR}/>

            </View>

        )


}



const styles = StyleSheet.create({
        container: {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
        },
        textStyle: {
            fontSize: 20,
            color: Colors.WHITE_COLOR,
            paddingLeft: 15,
            marginBottom: 3
        },
        titleContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }
})


export { HomeHeaderBar }