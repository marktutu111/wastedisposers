'use strict'
import React, { Component } from 'react'
import {
    StatusBar, StyleSheet, View, Platform
} from 'react-native'


import { COLORS } from "../constants";
import colors from '../resources/styles/colors';


class Container extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container, this.props.style || {}]}>
                {/* Replace status on iOS */}
                <StatusBar backgroundColor={colors.DARK_COLOR}/>
                { this.props.children }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.BACKGROUND_COLOR,
        alignItems: 'stretch',
        flex: 1
    }
})

export { Container };
