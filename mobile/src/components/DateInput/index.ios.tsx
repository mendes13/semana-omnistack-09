import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  DatePickerIOS,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

const DateInput: React.FC = ({ date, onChange }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy, 'às' HH'h' ", { locale: pt }),
    [date]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setOpened(!opened)}
        style={styles.dateButton}
      >
        <Text style={styles.dateButtonText}>{dateFormatted}</Text>
      </TouchableOpacity>

      {opened && (
        <View style={styles.picker}>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={30}
            locale="pt"
            mode="datetime"
          />
        </View>
      )}
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
