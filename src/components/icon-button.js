import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import EIcon from 'react-native-vector-icons/MaterialIcons';



const IconButton = ({ name, onPress, size, color }) => {

        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
                <EIcon name={name} size={size} color={color}/>
            </TouchableOpacity>
        )


}




export { IconButton };