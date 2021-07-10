# # react-native-jalali-ios-style-datepicker

<p align="center">
  <a href="https://github.com/AZIMAT/react-native-jalali-ios-style-datepicker/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="react-native-jalali-ios-style-datepicker is released under the MIT license." />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=atefiazim">
    <img src="https://img.shields.io/twitter/follow/atefiazim.svg?label=Follow%20@atefiazim" alt="Follow @atefiazim" />
  </a>
</p>

React Native Jalali IOS Style DatePicker component for both Android and iOS, using React Native Reanimated, React Native Gusture Handler

## Install

```bash
yarn add react-native-redash
yarn add react-native-reanimated@1.8.0
yarn add react-native-gusture-handler
yarn add react-native-jalali-ios-style-datepicker
```

## Demo

![IOS](https://github.com/AZIMAT/react-native-jalali-ios-style-datepicker/raw/main/Simulator%20Screen%20Recording%20-%20iPhone%2012%20-%202021-07-10%20at%2020.09.26.gif)

## Usage

```javascript
import DatePicker from "react-native-jalali-ios-style-datepicker";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");

  const confirmDatePicker = (value: string) => setDate(value);
  const closeDatePicker = () => setIsOpen(false);
  const openDatePicker = () => setIsOpen(true);

  return (
    <View style={styles.container}>
      <Text onPress={openDatePicker}>Date : {date}</Text>

      <DatePicker
        isOpen={isOpen}
        close={closeDatePicker}
        callback={confirmDatePicker}
      />
    </View>
  );
}
```

## Properties

| Prop               |           Default           |    Type     | Description                                                             |
| :----------------- | :-------------------------: | :---------: | :---------------------------------------------------------------------- |
| callback           |              -              | `function`  | This is called when the user confirm the picked date or time in the UI. |
| textButtonStyle    |              -              | `TextStyle` | Creating custom ui for confirm button text                              |
| confirmButtonStyle |              -              | `ViewStyle` | Creating custom ui for confirm button                                   |
| titleStyle         |              -              | `TextStyle` | Creating custom ui for title text                                       |
| backdropColor      |       rgba(0,0,0,0.5)       |  `string`   |                                                                         |
| pickerBgColor      |            white            |  `string`   |                                                                         |
| confirmText        |         تایید تاریخ         |  `string`   |                                                                         |
| title              | تاریخ مورد نظرتو انتخاب کن! |  `string`   |                                                                         |
| isOpen             |              -              |  `boolean`  |                                                                         |
| close              |              -              | `function`  |                                                                         |
