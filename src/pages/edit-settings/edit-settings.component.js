import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text
} from 'react-native';

import { Container,
         HomeHeaderBar,
         InputFull,
         LazyAlert,
         Button} from "../../components";

import { COLORS } from '../../constants';
import colors from '../../resources/styles/colors';
import { SettingsService } from "../../services";



class EditSettingsComponent extends Component {

            setting$vice;

            constructor (props) {
                    super();

                    this.state = {
                        saving: false,
                        number: '',
                        openAlert: false,
                        alertMessage: '',
                        alertType: ''
                    }

                    this.setting$vice = new SettingsService();
            }


            saveNumber ()  {

                    if (this.state.saving || this.state.number === '')  return;
                    let number = this.state.number;
                    this.setState({saving: true});
                    this.setting$vice.addPayment(number)
                                     .then(() => {

                                            this.setState({
                                                saving: false,
                                                alertMessage: 'Payment added successfully',
                                                alertType: 'success',
                                                openAlert: true
                                            })

                                     }, err => {

                                            this.setState({
                                                saving: false,
                                                alertMessage: err.message,
                                                alertType: 'error',
                                                openAlert: true
                                            })

                                     });

            }



            render () {
                return (

                    <Container>

                        <HomeHeaderBar leftIcon="arrow-back"
                                       title="Add Payment"
                                       background={colors.DARK_COLOR}
                                       onLeftPress={() => this.props.navigation.goBack()}/>

                        <LazyAlert show={this.state.openAlert}
                                   type={this.state.alertType}
                                   message={this.state.alertMessage}
                                   onPress={() => this.setState({openAlert: false})}/>

                        <InputFull placeholder="Mobile money number"
                                   editable={!this.state.saving}
                                   type="phone-pad"
                                   onChangeText={(number) => this.setState({number: number})}/>

                        <Button title="Save" style={{backgroundColor: colors.LIGHT_GREY_COLOR}}
                                busy={this.state.saving}
                                titleStyle={{color: colors.DARK_COLOR}}
                                onPress={() => this.saveNumber()}/>

                    </Container>

                )
            }


}



const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: COLORS.DARK_COLOR
    }
})



export { EditSettingsComponent };
