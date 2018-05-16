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
         HeaderBar,
         Button,
         LazyAlert,
         HomeHeaderBar} from "../../components";
import colors from '../../resources/styles/colors';
import { UserService } from "../../services";


class SignupComponent extends Component {

        user$vice;

        constructor (props) {
            super(props);
            this.state = {
                 saving: false,
                 name: '',
                 phonenumber: '',
                 email: '',
                 password: '',
                 alertType: '',
                 alertMessage: '',
                 openAlert: false
            }

            this.user$vice = new UserService();

        }


        signup ()  {

            if (this.state.saving) return;

            let email = this.state.email;
            let password = this.state.password;
            let phonenumber = this.state.phonenumber;
            let name = this.state.name;

            if (email === "" || password === '' || phonenumber === '' || name === '') return;
            let user = {email: this.state.email, password: this.state.password};

            this.setState({saving: true});
            this.user$vice.signUp(user)
                          .then((user) => {

                                this.user$vice.updateUser({ key: user.uid, 
                                                            name: name, 
                                                            phonenumber: phonenumber })
                                                            
                                              .then(() => {

                                                    this.setState({ saving: false,
                                                                    openAlert: true,
                                                                    alertMessage: 'Account created successfully, please login to continue.',
                                                                    alertType: 'success'});

                                              },err => {

                                                    this.setState({saving: false,
                                                        openAlert: true,
                                                        alertMessage: err.message,
                                                        alertType: 'error'});
                                              })

                          }, err => {

                                this.setState({ saving: false,
                                                openAlert: true,
                                                alertMessage: err.message,
                                                alertType: 'error'});

                          });


        }


        onSuccess ()  {

                if (this.state.alertType === 'success') {
                    this.setState({openAlert: false});
                    return this.props.navigation.goBack()
                }
                return this.setState({openAlert: false});
                

        }


        render () {

            return (
                <Container style={styles.container}>

                    <HomeHeaderBar leftIcon="arrow-back"  title="Create account"
                                   onLeftPress={() => this.props.navigation.goBack()}
                                   background={colors.DARK_COLOR}/>

                    <LazyAlert show={this.state.openAlert}
                            type={this.state.alertType}
                            message={this.state.alertMessage}
                            onPress={() => this.onSuccess()}/>

                    <View>
                        <InputFull placeholder="Fullname"
                                    editable={!this.state.saving}
                                    onChangeText={(name) => this.setState({name: name})}/>
                            <Hr/>
                        <InputFull placeholder="Phonenumber"
                                editable={!this.state.saving}
                                type="phone-pad"
                                onChangeText={(phone) => this.setState({phonenumber: phone})}/>
                        <Hr/>
                        <InputFull placeholder="Email" 
                                    editable={!this.state.saving}
                                    type="email-address"
                                   onChangeText={(email) => this.setState({email: email})}/>
                        <Hr/>
                        <InputFull placeholder="Password" password={true}
                                   editable={!this.state.saving}
                                   onChangeText={(password) => this.setState({password: password})}/>
                    </View>
                    
                    <Button title="Signup" style={styles.loginButtonStyle} 
                            onPress={() => this.signup()}
                            busy={this.state.saving}
                            disabled={this.state.saving}/>

                </Container>
            )
        }

}




const styles = StyleSheet.create({
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
        flex: 1,
        width: '50%',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    signupButtonStyle: {
        color: COLORS.DARK_COLOR
    },
    headerStyle: {
        backgroundColor: colors.DARK_COLOR
    }
})


export { SignupComponent };