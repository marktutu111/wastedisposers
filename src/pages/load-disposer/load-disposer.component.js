import React, { Component } from 'react';
import {  
    View, 
    Text, 
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import { 
    Container,
    HeaderBar,
    HomeHeaderBar
} from "../../components";
import { 
    NewDisposerComponent,
 } from "../../pages";
import { DisposerRequestRoute } from "../../app.routing";
import colors from '../../resources/styles/colors';
import { DisposersService } from "../../services";


class LoadDisposerComponent extends Component {

        disposer$vice;


        constructor (props) {
                super(props);
                this.state = {
                    loading: false,
                    disposer: false
                }

                this.disposer$vice = new DisposersService();
        }


        componentDidMount ()  {

                this.setState({loading: true});
                this.disposer$vice.checkDisposer()
                                  .then(res => this.setState({loading: false, disposer: res}))
                                  .catch(err => this.setState({loading: false, disposer: false}))
        }


        renderDisposer () {

                if (this.state.loading) return (
                    <View style={styles.spinnerContainer}>

                        <ActivityIndicator size={30} color={colors.DARK_COLOR} />

                    </View>
                );

                if (!this.state.loading && !this.state.disposer) return <NewDisposerComponent />
                if (!this.state.loading && this.state.disposer) return <DisposerRequestRoute />
                
        }



        renderHeader ()  {

                if (!this.state.loading)  return (

                        <HomeHeaderBar leftIcon="arrow-back"
                                title={this.state.disposer ? 'Requests' : 'Disposer'}
                                onLeftPress={() => this.props.navigation.goBack()}
                                background={colors.DARK_COLOR}/>

                )

        }



        render () {

                return (
                    <Container>


                            { this.renderHeader() }
                            { this.renderDisposer() }


                    </Container>
                )

        }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});



export { LoadDisposerComponent };
