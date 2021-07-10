import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
  interpolate,
  Extrapolate,
  multiply,
  cos,
  sub,
  asin,
  divide,
  call,
} from "react-native-reanimated";
import { useValue, translateZ } from "react-native-redash";
import MaskedView from "@react-native-community/masked-view";

import GestureHandler from "./GestureHandler";
import { VISIBLE_ITEMS, ITEM_HEIGHT } from "./Constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: "hidden",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    lineHeight: ITEM_HEIGHT,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

interface PickerProps {
  defaultValue: number;
  values: [];
  setValue: (value: any) => void
}

const Picker = ({ values, defaultValue = 0, setValue }: PickerProps) => {
  const translateY = useValue(0)

  const _getValue = (translateY) => {
    const index = translateY / ITEM_HEIGHT
    if(Number.isInteger(index))
    setValue(values[Math.abs(index - 2)])
  }

  const maskElement = (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {values.map((v, i) => {
        const y = interpolate(
          divide(sub(translateY, ITEM_HEIGHT * 2), -ITEM_HEIGHT),
          {
            inputRange: [i - RADIUS_REL, i, i + RADIUS_REL],
            outputRange: [-1, 0, 1],
            extrapolate: Extrapolate.CLAMP,
          }
        );
        const rotateX = asin(y);
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
        return (
          <Animated.View
            key={v}
            style={[
              styles.item,
              {
                transform: [
                  { perspective },
                  { rotateX },
                  translateZ(perspective, z),
                ],
              },
            ]}
          >
            <Text style={[styles.label, {color: 'white'}]}>{v}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
        <Animated.Code>
        {
          () => call([translateY], ([translateY]) => {_getValue(translateY)})
        }
        </Animated.Code>
      <View style={StyleSheet.absoluteFill}>
        <View
          style={{
            borderColor: '#343434',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            top: ITEM_HEIGHT * 2,
            height: ITEM_HEIGHT,
          }}
        />
      </View>

      <MaskedView {...{ maskElement }}>
        <View style={{ height: ITEM_HEIGHT * 2, backgroundColor: 'black' }} />
        <View style={{ height: ITEM_HEIGHT, backgroundColor: 'black' }} />
        <View style={{ height: ITEM_HEIGHT * 2, backgroundColor: 'black' }} />
      </MaskedView>

      <GestureHandler
        max={values.length}
        value={translateY}
        {...{ defaultValue }}
      />
    </View>
  );
};

export default React.memo(Picker);
