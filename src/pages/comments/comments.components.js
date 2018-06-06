import React, { Component } from 'react';
import {  View, Text, TextInput, StyleSheet } from 'react-native';

import { 
    HomeHeaderBar,
    Container,
    Button
 } from "../../components";

import { COLORS } from "../../constants";
import colors from '../../resources/styles/colors';




class CommentsComponent extends Component {

        constructor (props) {
                super(props);

                this.state = {
                    loading: false,
                    comment: '',
                }
        }


        sendComment () {

            this.setState({ loading: true });
            setTimeout(() => this.setState({ comment: '', loading: false }), 500);
        }

        render() {
            return (

                <Container>

                    <HomeHeaderBar leftIcon="arrow-back"
                                   title="Comments"
                                   background={COLORS.DARK_COLOR}
                                   onLeftPress={() => this.props.navigation.goBack()}/>

                    <View style={styles.container}>

                        <Text style={styles.title}>Send us your comments: </Text>

                        <TextInput multiline={true} 
                                   underlineColorAndroid="transparent"
                                   style={styles.inputStyle}
                                   onChangeText={(text) => this.setState({ comment: text })}
                                   value={this.state.comment}
                                   placeholder='Comment:'
                                   editable={!this.state.loading}/>


                        <Button title="send" 
                                style={styles.buttonStyle}
                                onPress={this.sendComment.bind(this)}
                                busy={this.state.loading}>
                        </Button>


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
        },
        title: {
            fontSize: 20,
            margin: 30,
            color: colors.DARK_COLOR
        },
        buttonStyle: {
            marginTop: 50,
            backgroundColor: colors.DARK_COLOR,
        }
});




export { CommentsComponent };
