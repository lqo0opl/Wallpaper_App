import * as React from 'react';
import {Button, Pressable, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TopScreen from './screens/TopScreen';
import HotScreen from './screens/HotScreen';
import ColorsScreen from './screens/ColorsScreen';
import WallpaperScreen from './screens/WallpaperScreen';
import ByColorScreen from './screens/ByColorScreen';
import ViewWallpaperScreen from './screens/ViewWallpaperScreen';
import AboutScreen from './screens/AboutScreen';
import SearchScreen from './screens/SearchScreen';
import HelpScreen from './screens/HelpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#303030'},
          contentStyle: {borderTopColor: '#9E9E9E', borderTopWidth: 3},
          headerTintColor: 'white',
        }}>
        <Stack.Screen name="Wallpaper" component={HomeScreen} />
        <Stack.Screen name="Top" component={TopScreen} />
        <Stack.Screen name="Hot" component={HotScreen} />
        <Stack.Screen name="Colors" component={ColorsScreen} />
        <Stack.Screen name=" " component={WallpaperScreen} />
        <Stack.Screen name="ByColor" component={ByColorScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen
          name="ViewWallpaper"
          component={ViewWallpaperScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
