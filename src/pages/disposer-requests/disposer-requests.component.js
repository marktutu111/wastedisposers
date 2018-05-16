import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator
 } from 'react-native';
import { NavigationActions } from "react-navigation";
import { 
        Container, 
        HeaderBar,
        ListItemNoAvatar,
        Hr, 
        HomeHeaderBar } from "../../components";
import { COLORS } from '../../constants';
import colors from '../../resources/styles/colors';
import { UserRequestService } from "../../services";
import moment from "moment";

class DisposerRequestsComponent extends Component {

        request$vice;

        constructor (props) {
                super(props);
                this.state = {
                        loading: false,
                        requests: UserRequestService.disposerRequests
                }

                this.request$vice = new UserRequestService();
        }

        componentDidMount () {

                if (UserRequestService.requests.length === 0) this.setState({loading: true});
                this.request$vice.getDisposerRequests()
                                 .then(() => this.setState({loading: false, requests: UserRequestService.disposerRequests}))
                                 .catch(err => this.setState({loading: false}))

        }



        renderList (request)  {

                return (
                        <ListItemNoAvatar title={request.senderName}
                                          subTitle={moment(new Date(request.date)).fromNow()} 
                                          onPress={() => this.props.navigation.navigate('RequestDetails', request)}/>
                )

        }


        renderView ()  {

                if (this.state.loading) return (
                        <View style={styles.container}>
                                <ActivityIndicator color={colors.DARK_COLOR} size={30}/>
                        </View>
                );

                return (

                        <FlatList data={this.state.requests}
                                keyExtractor={(item,index) => item.key}
                                renderItem={({ item }) => this.renderList(item)}/>
                )

        }


        render () {

            return (
                    <Container>

                            <HomeHeaderBar leftIcon="arrow-back"
                                           background={colors.DARK_COLOR}
                                           onLeftPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                                           title="Requests"/>

                                        { this.renderView() }

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






export { DisposerRequestsComponent };