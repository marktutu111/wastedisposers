import React, { Component } from 'react';
import {  
    View, 
    Text, 
    StyleSheet,
    Sear
} from 'react-native';

import { 
    Container,
    HeaderBar,
    InputFull,
    HomeHeaderBar
 } from "../../components";
import colors from '../../resources/styles/colors';


class SearchComponent extends Component {

            constructor (props) {
                    super(props);
            }


            render() {
                return (
                        <Container>

                            <HomeHeaderBar leftIcon="arrow-back"
                                       title="Search Disposers"
                                       color={colors.DARK_COLOR}
                                       background={colors.DARK_COLOR}
                                       
                                       onLeftPress={() => this.props.navigation.goBack()}/>

                            <InputFull placeholder='Search disposer..'/>

                        </Container>
                    );
            }
}


const styles = StyleSheet.create({
    
});


export { SearchComponent }