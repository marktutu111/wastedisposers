import React, { Component } from 'react';
import {  View, Text,StyleSheet } from 'react-native';
import { Container, HomeHeaderBar } from '../../components';
import colors from '../../resources/styles/colors';




class AboutComponent extends Component {

            constructor (props) {
                super(props);
            }

            render() {
                return (
                    <Container>

                        <HomeHeaderBar leftIcon="arrow-back"
                                       title="About"
                                       background={colors.DARK_COLOR}
                                       onLeftPress={() => this.props.navigation.goBack()}/>

                        <View style={styles.container}>

                                <Text style={styles.text}>
                                    
                                    Waste Disposers helps in waste management. very simple app where users can request for waste 
                                    management organisations to empty their trush for a little fee. users can find these organisation or companies if they are registered on the system. they can send them a request along with their location.

                                </Text>

                        </View>

                    </Container>
                );
            }

}


const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        text: {
            color: colors.DARK_COLOR,
            fontSize: 20,
        }
});



export { AboutComponent };