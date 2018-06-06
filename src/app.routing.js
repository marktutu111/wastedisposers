import { StackNavigator, DrawerNavigator } from "react-navigation";
import { LoginComponent,
         SignupComponent,
         EditSettingsComponent,
         SettingsComponent,
         DisposalsComponent,
         HomeComponent, 
         DisposerComponent,
         SearchComponent,
         AboutComponent,
         NewDisposerComponent,
         ResetPasswordComponent,
         DisposalDetailsComponent,
         DisposerRequestsComponent,
         RequestDetailsComponent,
         CommentsComponent,
         UserRequestsComponent} from "./pages";

import { DrawerComponent_ONE } from "./components";



const AuthRoute  = StackNavigator({
    Login: {
        screen: LoginComponent
    },
    Signup: {
        screen: SignupComponent
    },
    ResetPassword: {
        screen: ResetPasswordComponent
    }
},{
    navigationOptions: {
        header: null
    }
});


const DisposalsRoute = StackNavigator({
    Disposals: {
        screen: DisposalsComponent
    },
    Details: {
        screen: DisposalDetailsComponent
    }
},{
    navigationOptions: {
        header: null
    }
});


const UserRequestsRoute = StackNavigator({
    Requests: {
        screen: UserRequestsComponent
    },
    RequestDetails: {
        screen: RequestDetailsComponent
    }
},{
    navigationOptions: {
        header: null
    }
});


const DisposerRequestRoute = StackNavigator({
    DisposerRequests: {
        screen: DisposerRequestsComponent
    },
    RequestDetails: {
        screen: RequestDetailsComponent
    }
},{
    navigationOptions: {
        header: null
    }
});


const SettingsRoute = StackNavigator({
    Settings: {
        screen: SettingsComponent
    },
    EditSettings: {
        screen: EditSettingsComponent
    }
},{
    navigationOptions: {
        header: null
    },
    initialRouteName: 'Settings'
});



const HomeRoute = DrawerNavigator({
    Home: {
        screen: HomeComponent
    },
    Settings: {
        screen: SettingsRoute
    },
    Disposals: {
        screen: DisposalsRoute
    },
    Search: {
        screen: SearchComponent
    },
    DisposerDetails: {
        screen: DisposerComponent
    },
    About: {
        screen: AboutComponent
    },
    NewDisposer: {
        screen: NewDisposerComponent
    },
    DisposerRequests: {
        screen: DisposerRequestRoute
    },
    UserRequests: {
        screen: UserRequestsRoute
    },
    Comments: {
        screen: CommentsComponent
    }
}, {
    initialRouteName: 'Home',
    contentComponent: DrawerComponent_ONE
});



export { AuthRoute, HomeRoute, DisposerRequestRoute }