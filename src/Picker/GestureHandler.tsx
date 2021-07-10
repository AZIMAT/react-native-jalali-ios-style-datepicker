import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Animated, {
  useCode,
  set,
  divide,
  debug,
  sub,
  Value,
  add,
} from "react-native-reanimated";
import { PanGestureHandler, TapGestureHandler } from "react-native-gesture-handler";
import { usePanGestureHandler, diffClamp } from "react-native-redash";

import { ITEM_HEIGHT } from "./Constants";
import { withDecay } from "./AnimationHelpers";

interface GestureHandlerProps {
  value: Animated.Value<number>;
  max: number;
  defaultValue: number;
}

const GestureHandler = ({ value, max, defaultValue }: GestureHandlerProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const snapPoints = new Array(max).fill(0).map((_, i) => i * -ITEM_HEIGHT);
  const translateY = withDecay({
    value: translation.y,
    velocity: velocity.y,
    state,
    snapPoints,
    offset: new Value(-ITEM_HEIGHT * defaultValue),
  });
  useCode(() => [set(value, add(translateY, ITEM_HEIGHT * 2))], []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={[StyleSheet.absoluteFill, {width: '100%', height: '100%'}]} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
