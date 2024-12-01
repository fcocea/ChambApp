import { useEffect, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationState } from "@react-navigation/native";

export function TabBar({ state, descriptors, navigation }: { state: NavigationState; descriptors: any; navigation: any }) {
  const activeStyle = useMemo(() => descriptors[state.routes[state.index].key].options.tabBarStyle || {}, [descriptors, state.index, state.routes]);
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        backgroundColor: "white",
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        ...activeStyle
      }}
    >
      <View className="flex-row items-center justify-between bg-white rounded-full gap-8">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label
            = options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabButton
              key={index}
              isFocused={isFocused}
              onPress={onPress}
              label={label}
              options={options}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function TabButton({ isFocused, onPress, label, options }: { isFocused: boolean; onPress: () => void; label: string; options: any }) {
  const progressWidth = useSharedValue(isFocused ? 100 : 0);
  useEffect(() => {
    progressWidth.value = withTiming(isFocused ? 100 : 0, {
      duration: 250
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  const animatedStyle = useAnimatedStyle(() => ({ width: `${progressWidth.value}%` }));

  return (
    <Pressable
      onPress={onPress}
      className="items-center justify-center pt-3 h-16 flex-1 flex relative"
    >
      <Animated.View
        className="absolute top-0 left-0 h-2 flex-1"
        style={[
          animatedStyle,
          {
            height: 2,
            backgroundColor: isFocused ? "#1b456d" : "transparent"
          }
        ]}
      />
      {options.tabBarIcon
      && options.tabBarIcon({
        color: isFocused ? "#1b456d" : "#333",
        size: 24
      })}
      <Text
        style={{ color: isFocused ? "#1b456d" : "#333" }}
        className={`text-base ${isFocused ? "font-medium" : ""}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default TabBar;
