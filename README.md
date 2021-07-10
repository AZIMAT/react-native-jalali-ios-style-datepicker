# react-native-jalali-datepicker

## Install


## Usage

```javascript

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState('')

  const confirmDatePicker = (value: string) => setDate(value)
  const closeDatePicker = () => setIsOpen(false)
  const openDatePicker = () => setIsOpen(true)

  return (
    <View style={styles.container}>
      <Text onPress={openDatePicker}>
        Date : {date}
      </Text>
      <DatePicker isOpen={isOpen} close={closeDatePicker} callback={confirmDatePicker} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


```


## Properties

