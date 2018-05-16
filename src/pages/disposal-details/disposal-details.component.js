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
         BreadCrumb} from "../../components";

import MIcon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from '../../constants';
import colors from '../../resources/styles/colors';

class DisposalDetailsComponent extends Component {

            constructor (props) {
                    super(props);
                    this.state = {
                        status: 'PENDING',
                        disposal: this.props.navigation.state.params
                    }
            }




            renderButtons () {

                    if (this.state.status === 'PENDING' && 
                        this.state.paid === false) {
                            return <Button title="Cancel Request" 
                                           style={styles.buttonStyle}
                                           onPress={() => this.cancelRequest()}/>
                    }

                    if (this.state.status === 'COMPLETED' && this.state.paid === false) return (
                        <Button title="Cancel Request" 
                                style={styles.buttonStyle}
                                onPress={() => this.cancelRequest()}/>
                    )

            }


            render () {
                return (

                    <Container>

                        <HeaderBar leftIcon="arrow-back" 
                                   color={colors.DARK_COLOR}
                                   onLeftPress={() => this.props.navigation.goBack()}/>
                        
                        <View style={styles.container}>
                            <View style={styles.imageContainer}>
                                <Image source={{uri: this.state.disposal.photoUrl}}
                                       style={styles.imageStyle}/>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.titleStyle}>{ this.state.disposal.name }</Text>
                                <View style={styles.locationContainer}>
                                    <MIcon name="location-on"/>
                                    <Text style={styles.locationStyle}>{ this.state.disposal.location }</Text>
                                </View>
                                <View style={styles.locationContainer}>
                                    <MIcon name="date-range"/>
                                    <Text style={styles.locationStyle}>{ this.state.disposal.date }</Text>
                                </View>
                                <View style={styles.statusContainer}>
                                    <Text>PAYMENT</Text>
                                    <Vr size={20}/>
                                    <BreadCrumb text={ this.state.disposal.payment }/>
                                </View>
                            </View>
                        </View>

                        <View style={styles.amountContinaer}>
                            <Text style={styles.amountStyle}>Amount:</Text>
                            <View style={styles.amountValueContainer}>
                                <Text style={styles.amountValue}>{ this.state.disposal.amount }</Text>
                                <Text style={styles.currencyStyle}>cedis</Text>
                            </View>
                        </View>

                        {/* <View style={styles.buttonContainer}>
                            { this.renderButtons() }
                        </View> */}


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
            marginTop: 5
        }
})



export { DisposalDetailsComponent };