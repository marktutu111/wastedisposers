import React from "react";
import { TextInput,
         StyleSheet
} from "react-native";
import Colors from "../../resources/styles/colors";



const Input = ({ placeholder, password, type, style, onChangeText, editable }) => {

        const { inputStyle } = styles;

        return (
            <TextInput style={[inputStyle, style]} secureTextEntry={password}
                       placeholder={placeholder} 
                       keyboardType={type}
                       onChangeText={onChangeText} 
                       autoCapitalize='none'
                       editable={editable}/>
        )
}



const styles = StyleSheet.create({
    inputStyle: {
        padding: 10,
        borderRadius: 2,
        borderColor: Colors.INPUT_BORDER_COLOR,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: Colors.WHITE_COLOR
    }

})



export { Input };