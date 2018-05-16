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
         Vr, 
         BreadCrumb,
         LazyAlert,
         ClearButton} from "../../components";

import MIcon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from '../../constants';
import colors from '../../resources/styles/colors';
import { UserService, UserRequestService } from "../../services";
import moment from "moment";


class RequestDetailsComponent extends Component {

            request$vice;

            constructor (props) {

                    super(props);
                    this.state = {
                        request: this.props.navigation.state.params,
                        user: UserService.getCurrentUser(),
                        busy: false,
                        openAlert: false,
                        alertMessage: '',
                        alertType: ''
                    }

                    this.request$vice = new UserRequestService();

            }




            renderButtons () {

                    let user = this.state.user;
                    let status = this.state.request.status;
                    let sender = this.state.request.sender;
                    let disposer = this.state.request.disposer;

                    if (status === 'PENDING' && 
                        user && 
                        sender === user.uid &&
                        disposer !== user.uid) return (
                            <Button title="Cancel Request" 
                                    style={styles.buttonStyle}
                                    busy={this.state.busy}
                                    onPress={() => this.cancelRequest()}/>
                    )

                    if (status === 'PENDING' && 
                        user && 
                        disposer === user.uid &&
                        sender !== user.uid) return (
                            <View style={styles.buttonsContainer}>
                                <ClearButton textStyle={styles.acceptColor} 
                                            text="Accept" 
                                            onPress={() => this.acceptedRequest()}/>
                                <ClearButton textStyle={styles.cancelColor} 
                                            text="Cancel" 
                                            onPress={() => this.cancelRequest()}/>
                            </View>
                    )

            }


            acceptedRequest () {

                if (this.state.busy) return;
                this.setState({busy: true});
                this.request$vice.acceptRequest(this.state.request.key)
                                 .then(() => {

                                     this.setState({busy: false,
                                                    openAlert: true,
                                                    alertMessage: 'Request has being Accepted!',
                                                    alertType: 'success'})

                                 })
                                .catch(err => {

                                    this.setState({busy: false,
                                        openAlert: true,
                                        alertMessage: err.message || err,
                                        alertType: 'error'})

                                });
                

            }


            cancelRequest () {

                if (this.state.busy) return;
                if (this.state.busy) return;
                this.setState({busy: true});
                this.request$vice.cancelRequest(this.state.request.key)
                                 .then(() => {

                                     this.setState({busy: false,
                                                    openAlert: true,
                                                    alertMessage: 'Request has being Canceled!',
                                                    alertType: 'success'})

                                 })
                                .catch(err => {

                                    this.setState({busy: false,
                                        openAlert: true,
                                        alertMessage: err.message || err,
                                        alertType: 'error'})

                                });

            }


            getDate () {

                return moment(new Date(this.state.request.date)).format('LLLL');

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
                        
                            <View style={styles.infoContainer}>
                                <Text style={styles.titleStyle}>

                                    { this.state.request.sender === this.state.user.uid ? this.state.request.disposerName : 
                                                                                          this.state.request.senderName }
                                </Text>
                                <View style={styles.locationContainer}>
                                    <MIcon name="date-range"/>
                                    <Text style={styles.locationStyle}>{ this.getDate() }</Text>
                                </View>
                                <View style={styles.statusContainer}>
                                    <Text>STATUS</Text>
                                    <Vr size={20}/>
                                    <BreadCrumb text={ this.state.request.status }/>
                                </View>
                            </View>

                        <View style={styles.buttonContainer}>

                            { this.renderButtons() }

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
            fontSize: 25,
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
        },
        statusContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '50%',
            marginTop: 5
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '50%',
            marginRight: 'auto',
            marginLeft: 'auto',
        },
        button2style: {
            color: colors.DARK_COLOR
        },
        acceptColor: {
            color: colors.GREEN_COLOR
        },
        cancelColor: {
            color: colors.txtMainRed
        }
})



export { RequestDetailsComponent };