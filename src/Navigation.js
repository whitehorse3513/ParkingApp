import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './containers/LoginScreen';
import FirebaseLogin from './containers/FirebaseLogin';
import FirebaseSignup from './containers/FirebaseSignup';
import Home from './containers/Home';
import MyBookings from './containers/MyBookings';
import RentOutSpace from './containers/RentOutSpace';
import Sidebar from './components/Sidebar';
import { createDrawerNavigator } from 'react-navigation-drawer';

const AuthNavigator = createStackNavigator(
  {
    login: { screen: LoginScreen },
    fireLogin: { screen: FirebaseLogin },
    fireSignup: { screen: FirebaseSignup },
  },
  {
    headerMode: 'none',
    initialRouteName: 'login',
  }
);

const AppNavigator = createStackNavigator(
  {
    home: { screen: Home },
    myBookings: { screen: MyBookings },
    rentOutSpace: { screen: RentOutSpace },
  },
  {
    headerMode: 'none',
    initialRouteName: 'home',
  }
);

const MainNavigator = createStackNavigator(
  {
    Auth: { screen: AuthNavigator },
    App: { screen: AppNavigator },
  },
  {
    headerMode: 'none',
    initialRouteName: 'App',
  }
);

// const RootNavigator = createDrawerNavigator(
//   {
//     A: { screen: MainNavigator },
//   }, {// set content of side bar
//     contentComponent: (props) => <Sidebar />
//   }
// );
const DrawerNavigator = createDrawerNavigator(
  {
    Home: {screen: MainNavigator },
    // Home: {screen: Home, },
  },
   {
    contentComponent: Sidebar
  }
);


const RootNavigator = createAppContainer(DrawerNavigator);

export default RootNavigator;