import React, { Component } from 'react';
import {  View, Text, TextInput, StyleSheet } from 'react-native';

import { 
    HomeHeaderBar,
    Container
 } from "../../components";

import { COLORS } from "../../constants";




class CommentsComponent extends Component {

        constructor (props) {
                super(props);

                this.state = {
                    loading: false
                }
        }

        render() {
            return (

                <Container>

                    <HomeHeaderBar leftIcon="arrow-back"
                                   title="Comments"
                                   background={COLORS.DARK_COLOR}
                                   onLeftPress={() => this.props.navigation.goBack()}/>

                    <View style={styles.container}>


                        <TextInput multiline={true} 
                                   underlineColorAndroid="transparent"
                                   style={styles.inputStyle}/>


                    </View>


                </Container>

            );
        }
}



const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        inputStyle: {
            borderColor: '#eee',
            maxHeight: 200,
            width: '90%',
            borderRadius: 5,
            borderWidth: 1,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: '10%',
        }
});




export { CommentsComponent };
