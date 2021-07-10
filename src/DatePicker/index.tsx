import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ViewStyle, TextStyle } from "react-native";

import Picker from "../Picker";

import Animated, {
  Easing,
} from "react-native-reanimated";

import _ from 'lodash'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: "flex-end",
    alignItems: "center",
    position: 'absolute',
    zIndex: 20,
    overflow: 'hidden',
  },
  pickerContainer: {
    height: 350,
    alignItems: "center",
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 2,
  },
  confirmSection: { 
    width: '90%', 
    marginBottom: 25, 
    alignItems: 'center' 
  },
  title: {
    fontSize: 16,
    marginVertical: 20,
  },
});


const yearList: (string | number)[] = [];

const startYear = 1330;
const endYear = 1400;

for (let a = startYear; a <= endYear; a++)
    yearList.push(a);

export const monthList = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
]


const toEnglishDigits = function (str: string) {
    return str.replace(/[۰-۹]/g, function (w) {
        var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return persian.indexOf(w);
    });
}
const toFarsiDigits = function (str: string) {
    return str.replace(/[0-9]/g, function (w) {
        var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return persian[w];
    });
}

const pad = (n, len) => {
  let l = Math.floor(len)
    let sn = '' + n
    let snl = sn.length
    if(snl >= l) return sn
    return '0'.repeat(l - snl) + sn
}

interface DatePickerProps {
  callback: (values: string) => void;
  confirmButtonStyle?: ViewStyle;
  textButtonStyle?: TextStyle;
  backdropColor?: string;
  pickerBgColor?: string;
  titleStyle?: TextStyle;
  confirmText?: string;
  close: () => void;
  isOpen: boolean;
  title?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  confirmButtonStyle,
  textButtonStyle,
  pickerBgColor,
  backdropColor,
  confirmText,
  titleStyle,
  callback, 
  isOpen, 
  close, 
  title, 
}) => {

  const [animationValue] = useState(new Animated.Value(0))
  const [isLoad, setIsLoad] = useState(false)

  let dayList = Array(31).fill(0).map((e, i) => i + 1);
  if (month && month > 6)
    dayList = Array(30).fill(0).map((e, i) => i + 1);
  if (month && month == 12)
    dayList = Array(29).fill(0).map((e, i) => i + 1);

  const [day, setDay] = React.useState(dayList[5]);
  const [year, setYear]  = React.useState(yearList[5]);
  const [month, setMonth] = React.useState(monthList[5]);

  React.useEffect(() => {
    if(!isOpen) {
      setIsLoad(false)
      setDay(dayList[5])
      setYear(yearList[5])
      setMonth(monthList[5])
    }
    Animated.timing(animationValue, {
      duration: 350,
      toValue: isOpen ? 1 : 0,
      easing: Easing.ease,
      
    }).start(() => {setIsLoad(isOpen)})

  }, [isOpen]);

  const bottom = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-2000, 0],
  });

  const opacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const submit = () => {
    const values = pad(year ,2) + '/' + pad(monthList.indexOf(month) + 1 ,2) + '/' + pad(day ,2);
    callback(values)
    _close()
  }

  const _close = () => {
    close()
  }

  return (
    <AnimatedPressable onPress={_close} style={[styles.container, { bottom , opacity, backgroundColor: backdropColor}]}>
      <View style={[styles.pickerContainer, {backgroundColor: pickerBgColor, borderColor: backdropColor}]}>
        <Text style={[styles.title, titleStyle]}>
          {title}
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {isLoad && (
            <>
              <Picker {...{ values: dayList, defaultValue: 5 }} setValue={setDay} />
              <Picker {...{ values: monthList, defaultValue: 5 }} setValue={setMonth} />
              <Picker {...{ values: yearList, defaultValue: 5 }} setValue={setYear} /> 
            </>
          )}
        </View>
        <View style={styles.confirmSection}>
          <Pressable style={confirmButtonStyle} onPress={submit}>
            <Text style={textButtonStyle}>
              {confirmText}
            </Text>
          </Pressable>
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default DatePicker;

DatePicker.defaultProps = {
  title: 'تاریخ مورد نظرتو انتخاب کن!',
  confirmText: 'تایید تاریخ',
  backdropColor: 'rgba(0,0,0,0.5)',
  pickerBgColor: 'white',
  confirmButtonStyle: {},
  textButtonStyle: {},
  titleStyle: {},
}