import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    FlatList
 } from 'react-native';

 import { Container, 
          HeaderBar,
          ListItemAvatar, 
          Hr} from "../../components";
import { COLORS } from '../../constants';
import FIcon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker } from 'react-native-maps';
import colors from '../../resources/styles/colors';
import { 
    GetLocationAddress,
    DisposersService  
} from "../../services";

const { height, width } = Dimensions.get('window');
const LATITUD_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUD_DELTA + (width / height);




class HomeComponent extends Component {

        getAddress;
        locationTimeout;
        disposer$vice;

        constructor (props) {

                super(props);
                this.state = {
                    searchingLocation: false,
                    locationName: GetLocationAddress.locationAddress,
                    location: {
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: LATITUD_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    latlng: {
                        latitude: 0,
                        longitude: 0
                    },
                    disposers: DisposersService.disposers
                }

                this.getAddress = new GetLocationAddress();
                this.disposer$vice = new DisposersService();
        }


        componentDidMount ()  {

                this.getCurrentPosition();
                this.disposer$vice.getDisposers()
                                  .then(() => this.setState({disposers: DisposersService.disposers}));

        }


        getCurrentPosition ()  {

            this.state.searchingLocation = true;
            navigator.geolocation.getCurrentPosition(({ coords }) => {

                                            this.setState({
                                                  location: {
                                                      latitude: parseFloat(coords.latitude),
                                                      longitude: parseFloat(coords.longitude),
                                                      latitudeDelta: LATITUD_DELTA,
                                                      longitudeDelta: LONGITUDE_DELTA,
                                                  },
                                                  latlng: { latitude: coords.latitude, longitude: coords.longitude }
                                            })

                                            this.getAddress.address(coords.latitude,coords.longitude)
                                                           .then(location => {
                                                               
                                                                    this.setState({locationName: GetLocationAddress.locationAddress, 
                                                                                            searchingLocation: false})},
                                                                                        
                                                            err => {

                                                                    this.setState({searchingLocation: false,
                                                                                   locationName: 'Could not get location..' })
                                                            })

                                 }, err => console.log(err));

        }



        renderLocationIcon () {

                if (this.state.searchingLocation) return (<FIcon name="location-searching" 
                                                                 size={20} color={colors.DARK_COLOR}/>);
                return <FIcon name="location-on" size={20} color={colors.DARK_COLOR}/>

        }


        renderSpinner ()  {

             if (this.state.searchingLocation) return (
                <ActivityIndicator color={colors.DARK_COLOR}/>
             );
        }


        renderList (item) {
            return (<ListItemAvatar title={item.name}
                                   subTitle={item.location}
                                   image={{uri: item.photoUrl}}
                                   onPress={() => this.props.navigation.navigate('DisposerDetails', item)}/>);

        }




        render () {
            return (
                <Container>

                        <HeaderBar leftIcon="menu" 
                                title="Waste Disposal"
                                rightIcon="search"
                                style={styles.headerStyle}
                                color={colors.DARK_COLOR}
                                onLeftPress={() => this.props.navigation.navigate('DrawerOpen')} 
                                onRightPress={() => this.props.navigation.navigate('Search')}/>
                        <Hr/>

                        <View style={styles.locationContainer}>
                                <View style={styles.locationGroupContainer}>
                                    { this.renderLocationIcon() }
                                    <Text style={styles.locationTitle}>{ this.state.searchingLocation ? 'Finding location..' : 
                                                                        this.state.locationName }</Text>
                                </View>

                                { this.renderSpinner() }
                                
                        </View>

                        <View style={styles.mapContainer}>
                        
                                    <MapView style={styles.mapStyle}
                                             region={this.state.location}>

                                             <Marker title="Your current location"
                                                     coordinate={this.state.latlng}
                                                     draggable={false}>

                                                     <View style={styles.mapMarker}>
                                                        <View style={styles.mapMarkerInner}></View>
                                                     </View>
                                                     
                                            </Marker>
                                    
                                    </MapView>

                        </View>
                        <View style={styles.disposersListContainer}>
                            <View style={styles.disposersCountContainer}>
                                <Text>{ this.state.disposers.length } disposers found.</Text>
                            </View>
                            <ScrollView>

                                <FlatList data={this.state.disposers}
                                          renderItem={({ item }) => this.renderList(item)}
                                          keyExtractor={(item,idex) => item.key}/>

                            </ScrollView>
                        </View>

                </Container>
            )
        }

 }


 const styles = StyleSheet.create({
     headerStyle: {
         height: 'auto',
         backgroundColor: colors.WHITE_COLOR
     },
     locationContainer: {
         backgroundColor: COLORS.WHITE_COLOR,
         alignItems: 'center',
        //  borderRadius: 2,
         padding: 15,
         shadowOffset: {width: 0, height: 5},
         shadowColor: COLORS.LIGHT_GREY_COLOR,
         shadowOpacity: 0.5,
         flexDirection: 'row',
         position: 'absolute',
         top: 48,
         left: 0,
         right: 0,
         zIndex: 1000
     },
     locationGroupContainer: {
         flexDirection: 'row',
         alignItems: 'center',
         flex: 1,
     },
     locationTitle: {
         marginLeft: 20,
         color: COLORS.DARK_COLOR
     },
     mapContainer: {
         flex: 1,
        //  alignItems: 'center',
     },
     mapStyle: {
         top: 0,
         bottom: 0,
         left: 0,
         right: 0,
         position: 'absolute'
     },
     disposersListContainer: {
         backgroundColor: COLORS.WHITE_COLOR,
         position: 'absolute',
         bottom: 0,
         left: 0,
         right: 0,
         maxHeight: height / 2,
         height: 'auto',
         zIndex: 1000,
         paddingLeft: 5,
         paddingRight: 5,
     },
     disposersCountContainer: {
         padding: 10,
     },
     mapMarker: {
         justifyContent: 'center',
         alignItems: 'center',
         width: 50,
         height: 50,
         borderRadius: 50,
         backgroundColor: 'rgba(0,0,0,0.3)',
         overflow: 'hidden'
     },
     mapMarkerInner: {
         width: 20,
         height: 20,
         borderRadius: 50,
         backgroundColor: colors.DARK_COLOR,
     }

 })



 export { HomeComponent };