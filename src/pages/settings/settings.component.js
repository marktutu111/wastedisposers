import React, { Component } from 'react';
import {  
    View, 
    Text, 
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { Container, HeaderBar, HomeHeaderBar, RoundAvatar, Hr, ClearButton, IconButton, LazyAlert } from '../../components';
import colors from '../../resources/styles/colors';
import MIcon from "react-native-vector-icons/MaterialIcons";
import { SettingsService } from "../../services";
import { showImagePicker } from "react-native-image-picker";
import { NavigationActions } from "react-navigation";

class SettingsComponent extends Component {

            setting$vice;

            constructor (props) {

                    super(props);
                    this.setting$vice = new SettingsService();

                    this.state = {
                            loading: false,
                            profile: SettingsService.profile,
                            openAlert: false,
                            alertMessage: '',
                            alertType: ''
                    }


            }


            componentDidMount ()  {

                    if (SettingsService.profile.name === '' && 
                        SettingsService.profile.phonenumber === '') this.setState({loading: true});
                    this.setting$vice.fetchProfile()
                                     .then((profile) => this.setState({profile: SettingsService.profile, loading: false}))
                                     .catch(err => this.setState({loading: false}));

            }



            renderMobileMoney ()  {

                    if (this.state.profile.mobilemoneyWallet) return (
                        <View style={styles.container3}>
                            <View style={styles.container3}>
                                <MIcon name="payment"/>
                                <Text style={styles.paymentLable}>{this.state.profile.mobilemoneyWallet}</Text>
                            </View>
                            <IconButton name="close" onPress={() => this.removePayment()}/>
                        </View>
                    );

            }


            renderSpinner ()  {

                    if (this.state.loading) return <ActivityIndicator color={colors.LIGHT_DARK_COLOR}/>

            }


            pickPhoto ()  {

                    showImagePicker((photo) => {

                        this.setState({profile: {photoUrl: photo.uri}, loading: true});
                        this.setting$vice.updateProfile({photoUrl: photo.data})
                                        .then(() => this.setState({loading: false}))
                                        .catch(err => console.log(err));

                    })

            }


            removePayment ()  {

                    if (this.state.loading) return;
                    this.setState({loading: true});
                    this.setting$vice.removePayment()
                                     .then(() => {

                                            this.setState({ loading: false, 
                                                            profile: { mobilemoneyWallet: null },
                                                            openAlert: true,
                                                            alertMessage: 'Payment removed, you will not be able to make payment from your mobile money account.',
                                                            alertType: 'success'})

                                     })
                                     .catch(err => {

                                            this.setState({ loading: false,
                                                            openAlert: true,
                                                            alertMessage: err.message,
                                                            alertType: 'error'})

                                     })

            }


            render() {
                return (
                    <Container>

                        <LazyAlert show={this.state.openAlert}
                                   type={this.state.alertType}
                                   message={this.state.alertMessage}
                                   onPress={() => this.setState({openAlert: false})}/>

                        <View style={styles.container1}>

                                <HomeHeaderBar title="Settings"
                                               leftIcon="arrow-back"
                                               rightIcon="camera-alt"
                                               onLeftPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                                               onRightPress={() => this.pickPhoto()}/>

                                <View style={styles.imageContainer}>
                                    <RoundAvatar style={styles.imageStyle} source={{uri: this.state.profile.photoUrl}}/>
                                    <Text style={styles.emailStyle}>{ this.state.profile.name }</Text>
                                    <Text style={styles.phoneStyle}>{ this.state.profile.phonenumber }</Text>
                                    { this.renderSpinner() }
                                </View>

                        </View>

                        <View style={styles.container2}>

                                <Text style={styles.text1}>Payment Methods</Text>
                                <View style={styles.container3}>
                                    <View style={styles.container3}>
                                        <MIcon name="payment"/>
                                        <Text style={styles.paymentLable}>Cash Payment</Text>
                                    </View>
                                    <MIcon name="check" color={colors.GREEN_COLOR} size={20}/>
                                </View>
                                <Hr space="10" style={{marginBottom: 10, marginTop: 10}}/>

                                { this.renderMobileMoney() }

                                <ClearButton text="Add payment" style={styles.addPaymentStyle}
                                             onPress={() => this.props.navigation.navigate('EditSettings')}/>

                        </View>

                    </Container>
                );
            }


}


const styles = StyleSheet.create({
            container1: {
                backgroundColor: colors.DARK_COLOR,
                height: '50%',
                flexDirection: 'column',
                alignItems: 'center',
            },
            imageContainer: {
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
            },
            imageStyle: {
                borderWidth: 2,
            },
            emailStyle: {
                color: colors.WHITE_COLOR,
                marginTop: 20,
                marginBottom: 5
            },
            phoneStyle: {
                color: colors.WHITE_COLOR,
            },
            container2: {
                flex: 1,
                padding: 20,
            },
            container3: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            text1: {
                fontSize: 20,
                marginBottom: 20,
            },
            paymentLable: {
                marginLeft: 10,
            },
            addPaymentStyle: {
                marginTop: 30
            }
});



export { SettingsComponent };