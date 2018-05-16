import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator
 } from 'react-native';
import { NavigationActions } from "react-navigation";
import { Container, HeaderBar, ListItemNoAvatar, Hr, HomeHeaderBar } from "../../components";
import { COLORS } from '../../constants';
import colors from '../../resources/styles/colors';
import { UserRequestService } from "../../services";
import moment from "moment";

class UserRequestsComponent extends Component {

        request$vice;

        constructor (props) {
                super(props);
                this.state = {
                        loading: false,
                        requests: UserRequestService.requests
                }

                this.request$vice = new UserRequestService();
        }

        componentDidMount () {

                if (UserRequestService.requests.length === 0) this.setState({loading: true});
                this.request$vice.getRequests()
                                 .then(() => this.setState({loading: false, requests: UserRequestService.requests}))
                                 .catch(err => this.setState({loading: false}))

        }

        renderList (request)  {

                return (
                        <ListItemNoAvatar title={request.disposerName}
                                        subTitle={ `${moment(new Date(request.date)).fromNow()} | ${moment(new Date(request.date)).format('LT')}` } 
                                        onPress={() => this.props.navigation.navigate('RequestDetails', request)}/>
                )

        }


        renderSpinner ()  {

                if (this.state.loading) return (
                        <View style={styles.container}>
                                <ActivityIndicator color={colors.DARK_COLOR} size={30}/>
                        </View>
                )

        }


        render () {
            return (
                <Container>

                        <HomeHeaderBar leftIcon="arrow-back"
                                       title="Disposal Requests"
                                       onLeftPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                                       background={colors.DARK_COLOR}/>

                        <FlatList data={this.state.requests}
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



export { UserRequestsComponent };