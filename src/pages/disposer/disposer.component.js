import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image
 } from 'react-native';


import { Container,
         HeaderBar,
         Hr,
         Button, 
         LazyAlert,
         HomeHeaderBar} from "../../components";

import MIcon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from '../../constants';
import colors from '../../resources/styles/colors';
import { DisposersService, SettingsService, UserService } from "../../services";


class DisposerComponent extends Component {

            disposer$vice;
            profile$vice;
            user$vice;

            constructor (props) {
                    super(props);
                    this.state = {
                        disposer: this.props.navigation.state.params,
                        senderName: '',
                        sendingRequest: false,
                        openAlert: false,
                        alertType: '',
                        alertMessage: '',
                    }

                    this.disposer$vice = new DisposersService();
                    this.profile$vice = new SettingsService;
                    
            }


            componentDidMount ()  {

                    this.profile$vice.getUsername()
                                     .then(name => this.setState({senderName:  name}))

            }


            sendRequest ()  {

                    const { key } = this.state.disposer;
                    const user = UserService.getCurrentUser();

                    if (!user) return (
                        this.setState({
                            sendingRequest: false,
                            openAlert: true,
                            alertMessage: 'You are not logged in, please login to continue.',
                            alertType: 'error'
                        })
                    )

                    const data = { 
                        disposer: key,
                        sender: user.uid,
                        date: Date(),
                        disposerName: this.state.disposer.name,
                        senderName: this.state.senderName,
                        status: 'PENDING' };

                    this.setState({sendingRequest: true});
                    this.disposer$vice.request(data)
                                      .then(() => this.setState({
                                            sendingRequest: false,
                                            openAlert: true,
                                            alertMessage: 'Request send',
                                            alertType: 'success'}),
                                       err => this.setState({
                                            sendingRequest: false,
                                            openAlert: true,
                                            alertMessage: err.message,
                                            alertType: 'error'
                                        }));
            }



            render () {

                return (

                    <Container>

                        <HeaderBar leftIcon="arrow-back"
                                       color={colors.DARK_COLOR}
                                       onLeftPress={() => this.props.navigation.goBack()}/>

                        <LazyAlert show={this.state.openAlert}
                                   type={this.state.alertType}
                                   message={this.state.alertMessage}
                                   onPress={() => this.setState({openAlert: false})}/>
                        
                        <View style={styles.container}>
                            <View style={styles.imageContainer}>
                                <Image source={{uri: this.state.disposer.photoUrl}}
                                       style={styles.imageStyle}/>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.titleStyle}>{ this.state.disposer.name }</Text>
                                <View style={styles.locationContainer}>
                                    <MIcon name="location-on"/>
                                    <Text style={styles.locationStyle}>{ this.state.disposer.location }</Text>
                                </View>
                                <View style={styles.locationContainer}>
                                    <MIcon name="phone"/>
                                    <Text style={styles.locationStyle}>{ this.state.disposer.phonenumber || '' }</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.amountContinaer}>
                            <Text style={styles.amountStyle}>Amount:</Text>
                            <View style={styles.amountValueContainer}>
                                <Text style={styles.amountValue}>{ this.state.disposer.amount }</Text>
                                <Text style={styles.currencyStyle}>cedis</Text>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button title="Request" style={styles.buttonStyle}
                                    onPress={() => this.sendRequest()}
                                    busy={this.state.sendingRequest}/>
                        </View>


                    </Container>

                )
            }

}



const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 20
        },
        imageContainer: {
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        imageStyle: {
            flex: 1,
            height: '100%',
            width: '100%'
        },
        infoContainer: {
            marginLeft: 20
        },
        titleStyle: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        locationStyle: {
            color: COLORS.LIGHT_DARK_COLOR,
            marginLeft: 5
        },
        locationContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10
        },
        amountContinaer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 20,
            marginTop: 10
        },
        amountStyle: {
            fontSize: 20
        },
        amountValueContainer: {
            flexDirection: 'row',
            alignItems: 'baseline',
            marginLeft: 10
        },
        amountValue: {
            fontSize: 30
        },
        currencyStyle: {
            marginLeft: 5,
            fontSize: 18,
            color: COLORS.LIGHT_DARK_COLOR,
            paddingBottom: 5
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: 30
        },
        buttonStyle: {
            backgroundColor: COLORS.DARK_COLOR,
            width: '80%'
        }
})



export { DisposerComponent };