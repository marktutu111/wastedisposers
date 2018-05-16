import React, { Component } from 'react';
import { 
      StyleSheet,
      ActivityIndicator
 } from "react-native";
import { AuthRoute, HomeRoute } from "./src/app.routing";
import colors from "./src/resources/styles/colors";

import firebase from "firebase";
import { F_CONFIG } from "./src/constants";
import { Container } from "./src/components";
import { CommentsComponent } from "./src/pages";


export default class App extends Component {

      user$vice;

      constructor (props) {
            super(props);
            this.state = {
                  loggedIn: false,
                  loading: false
            }

            firebase.initializeApp(F_CONFIG);

      }

      componentDidMount ()  {

            this.setState({loading: true});
            firebase.auth().onAuthStateChanged(user => {
                  
                  this.setState({ loggedIn: user && !user.isAnonymous ? true : false, 
                                  loading: false });

            }, err => {

                  this.setState({ loggedIn: false, 
                                  loading: false });

            })
            
      }


      renderScreen () {
            
            if (this.state.loading && !this.state.loggedIn) return (
                  <Container style={styles.container}>
                              <ActivityIndicator color={colors.DARK_COLOR} size={30}/>
                  </Container>
            )
            if (this.state.loggedIn && !this.state.loading) return (<HomeRoute />)
            if (!this.state.loading && !this.state.loggedIn) return <AuthRoute />

      }



      render() {

            return this.renderScreen();

      }


}


const styles = StyleSheet.create({
      container: {
            justifyContent: 'center',
            alignItems: 'center',
      }
});
