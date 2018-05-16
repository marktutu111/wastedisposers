import React from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
 } from 'react-native';
 import FIcon from "react-native-vector-icons/FontAwesome";
import { COLORS } from '../constants';
import colors from '../resources/styles/colors';

 
const ListItemAvatar = ({ title, subTitle, onPress, image }) => {

        return (

            <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>

                <View style={styles.container2}>
                    <View style={styles.imageContainer}>
                        <Image source={image}
                            style={styles.imageStyle}/>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.titleStyle}>{ title }</Text>
                        <Text style={styles.infoTextStyle2}>{ subTitle }</Text>
                    </View>
                </View>

                <FIcon name="chevron-right" size={8} color={COLORS.LIGHT_DARK_COLOR}/>

            </TouchableOpacity>

        )

}


const styles = StyleSheet.create({ 
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
            borderBottomColor: colors.LIGHT_GREY_COLOR,
            borderBottomWidth: 1,
        },
        container2: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        imageStyle: {
            flex: 1,
            height: '100%',
            width: '100%'
        },
        imageContainer: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: COLORS.LIGHT_GREY_COLOR,
            borderRadius: 50,
        },
        infoContainer: {
            marginLeft: 20
        },
        infoTextStyle2: {
            color: COLORS.LIGHT_DARK_COLOR,
            fontSize: 13,
            marginTop: 3
        },
        titleStyle: {
            color: colors.DARK_COLOR
        }
 })



 export { ListItemAvatar };