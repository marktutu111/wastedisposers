import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput
 } from 'react-native';

import { COLORS } from "../../constants";
import { Container, 
         InputFull, 
         Hr, 
         Button,
         Vr,
         ClearButton,
         LazyAlert } from "../../components";

import { UserService } from "../../services";


class LoginComponent extends Component {

        user$vice;

        constructor (props) {
            super();
            this.state = {
                 loading: false,
                 email: '',
                 password: '',
                 alertMessage: '',
                 openAlert: false,
                 alertType: ''
            }

            this.user$vice = new UserService();
        }


        login ()  {

            if (this.state.loading) return;
            
            let email = this.state.email;
            let password = this.state.password;
            if (email === "" || password === '') return;
            let user = {email: this.state.email, password: this.state.password};
            this.setState({loading: true})
            this.user$vice.login(user)
                          .then()
                          .catch(err => {

                            this.setState({loading: false,
                                            openAlert: true,
                                            alertMessage: err.message,
                                            alertType: 'error'})
                                console.log(err);

                          });
        }


        render () {

            return (
                <Container style={styles.container}>

                    <LazyAlert show={this.state.openAlert}
                            type={this.state.alertType}
                            message={this.state.alertMessage}
                            onPress={() => this.setState({openAlert: false})}/>

                    <View style={styles.titleContainer}>
                        <Text style={styles.welcomeStyle}>Welcome back</Text>
                        <Text style={styles.welcome2}>Please login into your account.</Text>
                    </View>
                    <View>
                        <InputFull placeholder="Email" 
                                   onChangeText={(email) => this.setState({email: email})}
                                   editable={!this.state.loading} />
                        <Hr/>
                        <InputFull placeholder="Password" password={true} 
                                   onChangeText={(password) => this.setState({password: password})}
                                   editable={!this.state.loading}/>
                    </View>
                    
                    <Button title="CONTINUE" style={styles.loginButtonStyle} 
                            onPress={() => this.login()}
                            busy={this.state.loading}
                            disabled={this.state.loading}/>

                    <View style={styles.buttonsContainer}>

                        <ClearButton text="Signup" textStyle={styles.signupButtonStyle}
                                     onPress={() => this.props.navigation.navigate('Signup')}/>
                        <Vr size={50} color={COLORS.LIGHT_DARK_COLOR}/>
                        <ClearButton text="Reset" textStyle={styles.signupButtonStyle}
                                     onPress={() => this.props.navigation.navigate('ResetPassword')}/>

                    </View>

                </Container>
            )
        }

}




const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    titleContainer: {
        padding: 20
    },
    welcomeStyle: {
        fontSize: 25,
        color: COLORS.DARK_COLOR
    },
    welcome2: {
        color: COLORS.LIGHT_DARK_COLOR
    },
    loginButtonStyle: {
        backgroundColor: COLORS.DARK_COLOR
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 50,
    },
    signupButtonStyle: {
        color: COLORS.DARK_COLOR
    }
})


export { LoginComponent };