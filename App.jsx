import * as React from 'react';
import "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AppProvider, useAppContext } from "./AppContext"; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ChordChecker from './screens/ChordChecker';
import UserProfile from './screens/UserProfile';
import SettingsPage from './screens/SettingsPage';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let IconComponent;

          if (route.name === 'Chords') {
            IconComponent = MaterialCommunityIcons;
            iconName = 'music-clef-treble'; 
          } else if (route.name === 'User') {
            IconComponent = FontAwesome6;
            iconName = 'user'; 
          } else if (route.name === 'Settings') {
            IconComponent = SimpleLineIcons;
            iconName = 'settings'; 
          } 

          return <IconComponent name={iconName} size={size} color={color} />
        },
        tabBarStyle: { height: 70, backgroundColor: "#0A0F1B", display: 'flex', flexDirection: 'row', 
          justifyContent: 'space-evenly', paddingBottom: 10, paddingTop: 5, borderTopColor: '#808080', borderTopWidth: 1 },
        tabBarActiveTintColor: '#A8F94F',
        tabBarInactiveTintColor: '#D3D3D3',
      })}
    >
        <Tab.Screen name="Chords" component={ChordChecker} options={{ headerShown: false }} />
        <Tab.Screen name="User" component={UserProfile} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={SettingsPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function UserAccountManager() {
  return (
    <Stack.Navigator 
      initialRouteName={'Login'}
      screenOptions={({ route }) => ({
        headerShown: false,
        cardStyleInterpolator: ({ current, next, layouts }) => {
          const isSignUp = route.name === 'SignUp';
          
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    // When navigating to SignUp, slide from right. When navigating back, slide from left.
                    outputRange: isSignUp ? [layouts.screen.width, 0] : [-layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      })}
    >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

function MainScreen() {
  const {userId, loading } = useAppContext();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={userId ? 'mainTabs' : 'userAccountScreen'}>
      <Stack.Screen name="mainTabs" component={TabNavigator} options={{headerShown: false}}/>
      <Stack.Screen name="userAccountScreen" component={UserAccountManager} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    </AppProvider>
  );
}
