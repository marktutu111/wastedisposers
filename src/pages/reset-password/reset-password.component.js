import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Alert
 } from 'react-native';


import { Container, HeaderBar, ClearButton, Button, LazyAlert, InputFull } from "../../components";
import colors from '../../resources/styles/colors';
import { UserService } from "../../services";


class ResetPasswordComponent extends Component {

            user$vice;

            constructor (props) {

                    super(props);
                    this.state = {
                        email: '',
                        loading: false,
                        openAlert: false,
                        alertMessage: '',
                        alertType: ''
                    }

                    this.user$vice = new UserService();
            }

            
            goBack () { this.props.navigation.goBack() }


            resetPassword ()  {

                    if (this.state.loading || this.state.email === '') return;
                    let email = this.state.email;
                    this.user$vice.resetPassword(email)
                                  .then(() => {

                                        this.setState({
                                            loading: false,
                                            openAlert: true,
                                            alertType: 'success',
                                            alertMessage: 'Password reset link has being sent to your email, please click on the link to reset password'
                                        })

                                  }, err => {

                                        this.setState({
                                            loading: false,
                                            openAlert: true,
                                            alertType: 'error',
                                            alertMessage: err.message
                                        })

                                  })


            }




            render ()  {

                return (

                        <Container>
                                <HeaderBar leftIcon="arrow-back"
                                            color={colors.DARK_COLOR}
                                           onLeftPress={() => this.goBack()}/>

                                <LazyAlert show={this.state.openAlert}
                                   type={this.state.alertType}
                                   message={this.state.alertMessage}
                                   onPress={() => this.setState({openAlert: false})}/>

                                <View style={styles.titleContainer}>
                                    <Text style={styles.title1}>Forgot</Text>
                                    <Text style={styles.title2}>Password</Text>
                                    <Text style={styles.title3}>Enter your email address, you will receive a link
                                                                to reset your password.
                                    </Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <InputFull placeholder="Email"
                                            editable={ !this.state.loading }
                                           onChangeText={(e) => this.onInputChange(e)}/>
                                </View>
                                <Button title="Continue" 
                                        style={styles.button2Style}
                                        onPress={() => this.resetPassword()}
                                        busy={this.state.loading}/>
                        </Container>

                )

            }



}






 const styles = StyleSheet.create({
        titleContainer: {
            padding: 15
        },
        title1: {
            fontSize: 30,
            color: colors.DARK_COLOR
        },
        title2: {
            fontSize: 40,
            color: colors.DARK_COLOR            
        },
        title3: {
            color: colors.LIGHT_DARK_COLOR,
            marginTop: 10
        },
        inputContainer: {
                marginTop: 50
        },
        inputStyle: {
            width: '90%'
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonStyle: {
            fontSize: 20,
            color: colors.DARK_COLOR
        },
        button2Style: {
            backgroundColor: colors.DARK_COLOR
        }
 })



 export { ResetPasswordComponent };