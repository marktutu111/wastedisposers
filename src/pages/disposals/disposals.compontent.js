import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator
 } from 'react-native';
import { NavigationActions } from "react-navigation";
import { Container, HeaderBar, ListItemAvatar, Hr, HomeHeaderBar } from "../../components";
import { COLORS } from '../../constants';
import colors from '../../resources/styles/colors';
import { DisposalService } from "../../services";

class DisposalsComponent extends Component {

        disposal$vice;

        constructor (props) {
                super(props);
                this.state = {
                        loading: false,
                        disposals: DisposalService.disposals
                }

                this.disposal$vice = new DisposalService();
        }

        componentDidMount () {

                if (DisposalService.disposals.length === 0) this.setState({loading: true});
                this.disposal$vice.getDisposals()
                                  .then(() => this.setState({loading: false, disposals: DisposalService.disposals}))
                                  .catch(err => this.setState({loading: false}))

        }

        renderList (disposer)  {

                return (
                        <ListItemAvatar image={{uri: disposer.photoUrl}}
                                        title={disposer.name}
                                        subTitle={disposer.date} 
                                        onPress={() => this.props.navigation.navigate('Details', disposer)}/>
                )

        }


        renderSpinner ()  {

                if (this.state.loading) return (
                        <View style={styles.container}>
                                <ActivityIndicator color={colors.DARK_COLOR} />

                        </View>
                )

        }


        render () {
            return (
                <Container>

                        <HomeHeaderBar leftIcon="arrow-back"
                                       title="Disposals"
                                       onLeftPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                                       background={colors.DARK_COLOR}/>

                        <FlatList data={this.state.disposals}
                                  keyExtractor={(item,index) => item.key}
                                  renderItem={({ item }) => this.renderList(item)}/>

                        { this.renderSpinner() }

                

                        

                </Container>
            )
        }

}



const styles = StyleSheet.create({
        headerStyle: {
            backgroundColor: COLORS.DARK_COLOR
        },
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
        }

})



export { DisposalsComponent };