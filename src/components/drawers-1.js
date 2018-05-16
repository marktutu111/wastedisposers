import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
 } from 'react-native';

import { Container, RoundAvatar, ClearButton, Hr, HeaderBar, HomeHeaderBar } from "../components";
import { COLORS } from '../constants';
import MIcon from "react-native-vector-icons/MaterialIcons";
import colors from '../resources/styles/colors';
import { DisposersService, UserService } from "../services";

class DrawerComponent_ONE extends Component {

            disposer$vice;
            user$vice;

            constructor (props) {

                    super(props);
                    this.state = {
                        disposer: false,
                        loading: false
                    }

                    this.disposer$vice = new DisposersService();
                    this.user$vice = new UserService();
            }



            componentDidMount ()  {

                    this.setState({loading: false});
                    this.disposer$vice.checkDisposer()
                                      .then(res => this.setState({loading: false,disposer: res}))
            }



            renderDisposer () {

                    if (!this.state.loading && this.state.disposer) return (
                            <ClearButton text="Disposer" textStyle={styles.buttonTextStyle}
                                        onPress={() => this.props.navigation.navigate('DisposerRequests')}
                                        style={styles.buttonStyle}/>
                    )

                    if (!this.state.loading && !this.state.disposer) return (
                        <ClearButton text="Disposer Signup" textStyle={styles.buttonTextStyle}
                                        onPress={() => this.props.navigation.navigate('NewDisposer')}
                                        style={styles.buttonStyle}/>
                    )
                
            }



            render () {
                return (
                    <Container>

                            <HomeHeaderBar rightIcon="settings" color={colors.WHITE_COLOR} 
                                        title="Settings"
                                        onRightPress={() => this.props.navigation.navigate('Settings')}
                                        background={colors.DARK_COLOR}/>
                            <View style={styles.container2}>
                                <ClearButton text="Home" textStyle={styles.buttonTextStyle} 
                                                onPress={() => this.props.navigation.navigate('Home')}
                                                style={styles.buttonStyle}/>
                                <ClearButton text="Disposals" textStyle={styles.buttonTextStyle} 
                                            onPress={() => this.props.navigation.navigate('Disposals')}
                                            style={styles.buttonStyle}/>
                                <ClearButton text="Requests" textStyle={styles.buttonTextStyle} 
                                            onPress={() => this.props.navigation.navigate('UserRequests')}
                                            style={styles.buttonStyle}/>
                                <ClearButton text="About" textStyle={styles.buttonTextStyle} 
                                             onPress={() => this.props.navigation.navigate('About')}
                                             style={styles.buttonStyle}/>
                                <ClearButton text="Comments" textStyle={styles.buttonTextStyle} 
                                             onPress={() => this.props.navigation.navigate('Comments')}
                                             style={styles.buttonStyle}/>
                                <Hr />

                                { this.renderDisposer() }

                                <ClearButton text="Logout" textStyle={styles.buttonTextStyle} 
                                             style={styles.buttonStyle}
                                             onPress={() => this.user$vice.logout()}/>
                            </View>

                    </Container>
                )
            }


 }




 const styles = StyleSheet.create({
        container1: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.DARK_COLOR,
            padding: 30
        },
        nameStyle: {
            color: COLORS.WHITE_COLOR,
            marginTop: 20
        },
        container2: {
            flex: 1,
            justifyContent: 'flex-start',
        },
        buttonTextStyle: {
            color: COLORS.DARK_COLOR,
            fontSize: 20,
        },
        buttonStyle: {
            margin: 20
        },
        logoutContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20
        },
        headerStyle: {
            backgroundColor: colors.DARK_COLOR
        },
 })



 export { DrawerComponent_ONE };