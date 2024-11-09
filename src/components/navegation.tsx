import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";

import Menu from "@/app/(chamber)/menu";
import Perfil from "@/app/(chamber)/profile";

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label
              = options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            return typeof label === "string" ? label : undefined;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Menu}
        options={{
          tabBarLabel: "Menú",
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color, size }) => <Icon name="magnify" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Chat"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => <Icon name="android-messages" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => <Icon name="account-circle" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
