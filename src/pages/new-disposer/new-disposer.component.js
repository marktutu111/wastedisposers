import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text
} from 'react-native';
import { Container, HomeHeaderBar, 
        InputFull, 
        Hr, 
        Button,
        LazyAlert } from '../../components';
import colors from '../../resources/styles/colors';
import { DisposersService } from "../../services";


class NewDisposerComponent extends Component {

            disposer$vice;

            constructor (props) {
                super(props);
                this.state = {
                    name: '',
                    location: '',
                    amount: '',
                    phonenumber: '',
                    saving: false,
                    openAlert: false,
                    alertMessage: '',
                    alertType: ''
                }

                this.disposer$vice = new DisposersService();

            }


            send ()  {

                    if (this.saving || 
                        this.state.name === '' ||
                        this.state.location === '' ||
                        this.state.amount === '' ||
                        this.state.phonenumber === '') return;

                    let data = {
                        name: this.state.name,
                        location: this.state.location,
                        amount: this.state.amount,
                        phonenumber: this.state.phonenumber
                    }

                    this.setState({saving: true})
                    this.disposer$vice.addDisposer(data)
                                      .then((res) => this.setState({ saving: false,
                                                                     alertMessage: 'Disposer request has being granted, you are now a disposer',
                                                                     openAlert: true,
                                                                     alertType: 'success'}),
                                        err => {

                                            this.setState({ saving: false,
                                                            alertMessage: err.message || err,
                                                            openAlert: true,
                                                            alertType: 'error'})

                                        })

            }
            

            render() {
                return (

                    <View>

                        <LazyAlert show={this.state.openAlert}
                                   type={this.state.alertType}
                                   message={this.state.alertMessage}
                                   onPress={() => this.setState({openAlert: false})}/>

                        <View style={styles.textContainer}>
                            <Text style={styles.text1}>Want to be a Disposer,</Text>
                            <Text style={styles.text2}>Create an account.</Text>
                        </View>

                        <InputFull placeholder="Name" onChangeText={(name) => this.setState({name: name})}
                                   editable={!this.state.saving}/>
                        <Hr/>
                        <InputFull placeholder="Location" onChangeText={(location) => this.setState({location: location})}
                                   editable={!this.state.saving}/>
                        <Hr/>
                        <InputFull placeholder="Phonenumber" 
                                   onChangeText={(phone) => this.setState({phonenumber: phone})}
                                   type="phone-pad"
                                   editable={!this.state.saving}/>
                        <Hr/>
                        <InputFull placeholder="Charge / Amount"
                                   type="numeric"
                                   onChangeText={(amount) => this.setState({amount: amount})}
                                   editable={!this.state.saving}/>
                                   
                        <Button title="Send" onPress={() => this.send()}
                                style={styles.buttonStyle}
                                busy={this.state.saving}/>
                        


                    </View>

                )
            }

}


const styles = StyleSheet.create({
    textContainer: {
        padding: 20,
        marginBottom: 10,
    },
    text1: {
        fontSize: 25,
        color: colors.DARK_COLOR
    },
    text2: {
        fontSize: 18,
        color: colors.DARK_COLOR
    },
    buttonStyle: {
        backgroundColor: colors.DARK_COLOR
    }

});



export { NewDisposerComponent };




