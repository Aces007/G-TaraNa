import * as React from 'react';
import "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AppProvider, useAppContext } from "./AppContext"; 
import { ThemeProvider, useTheme } from './ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ChordChecker from './screens/ChordChecker';
import UserProfile from './screens/UserProfile';
import SettingsPage from './screens/SettingsPage';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ManageUser from './screens/ManageUser';
import UserProgress from './screens/UserProgress';
import ThemePicker from './screens/ThemePicker';
import CreditsPage from './screens/CreditsPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const { currentTheme } = useTheme();


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

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 70,
          backgroundColor: currentTheme.backgroundColor,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: 10,
          paddingTop: 5,
          borderTopColor: currentTheme.backgroundColor,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: currentTheme.buttonColor,
        tabBarInactiveTintColor: currentTheme.textColor,
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
                    outputRange: isSignUp ? [layouts.screen.width, 0] : [-layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      })}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MainScreen() {
  const { userId, loading } = useAppContext();
  const { currentTheme } = useTheme();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={userId ? 'mainTabs' : 'userAccountScreen'}>
      <Stack.Screen name="mainTabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="userAccountScreen" component={UserAccountManager} options={{ headerShown: false }} />
      <Stack.Screen name="ManageUser" component={ManageUser} options={{ headerShown: false }} />
      <Stack.Screen name="UserProgress" component={UserProgress} options={{ headerShown: false }} />
      <Stack.Screen name="ThemePicker" component={ThemePicker} options={{ headerShown: false }} />
      <Stack.Screen name="CreditsPage" component={CreditsPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer>
          <MainScreen />
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>
  );
}
