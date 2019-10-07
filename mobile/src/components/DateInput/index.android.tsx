import React, { useMemo } from 'react';
import {
  DatePickerAndroid,
  TimePickerAndroid,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

interface Props {
  date: Date;
  onChange: Function;
}

const DateInput: React.FC<Props> = ({ date, onChange }) => {
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy, 'às' HH'h' ", { locale: pt }),
    [date]
  );

  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const { action: timeAction, hour } = await TimePickerAndroid.open({
        mode: 'spinner',
        hour: date.getHours(),
        minute: date.getMinutes(),
        is24Hour: true,
      });

      if (timeAction === TimePickerAndroid.timeSetAction) {
        const selectedDate = new Date(year, month, day, hour);

        onChange(selectedDate);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenPicker} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>{dateFormatted}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 2,

    justifyContent: 'center',
  },

  dateButtonText: {
    fontSize: 16,
    color: '#444',
  },

  picker: {
    marginTop: 20,
  },
});

export default DateInput;
