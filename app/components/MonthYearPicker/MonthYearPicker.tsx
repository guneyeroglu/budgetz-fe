import { FC, Fragment, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';

import { FontAwesome6 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { addOpacity } from '@/global/utils';
import { useMonthAndYear } from '@/store';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';

import { Button } from '../Button';
import { Text } from '../Text';

interface IPickerContent {
  label: string;
  value: number;
}

export const MonthYearPicker: FC = () => {
  const months: IPickerContent[] = Array.from({ length: 12 }, (_: unknown, i: number) => ({
    label: new Date(0, i + 1).toLocaleString('tr-TR', { month: 'long' }),
    value: i + 1,
  }));
  const years: IPickerContent[] = Array.from({ length: 6 }, (_: unknown, i: number) => ({
    label: (2025 + i).toString(),
    value: 2025 + i,
  }));

  const { monthAndYear, setMonthAndYear } = useMonthAndYear();
  const { bottom } = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [selectedMonth, setSelectedMonth] = useState<number>(monthAndYear.month);
  const [selectedYear, setSelectedYear] = useState<number>(monthAndYear.year);

  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  const getMonthAndYearLabel = (): string => {
    const monthLabel = months.find((month: IPickerContent) => month.value === monthAndYear.month)!.label;
    const yearLabel: string = `${monthAndYear.year}`;

    return `${monthLabel} ${yearLabel}`;
  };

  const handleSavePicker = (): void => {
    toggleModal();
    setMonthAndYear({ month: selectedMonth, year: selectedYear });
  };

  const handleClosePicker = (): void => {
    toggleModal();
    setSelectedMonth(monthAndYear.month);
    setSelectedYear(monthAndYear.year);
  };

  return (
    <Fragment>
      <Button style={styles.headerDate} onPress={toggleModal}>
        <Text>{getMonthAndYearLabel()}</Text>
        <FontAwesome6 name='caret-down' size={TYPOGRAPHY.fontSize.xl} color={COLORS.text} />
      </Button>
      <Modal
        visible={isModalVisible}
        onRequestClose={handleClosePicker}
        style={styles.modal}
        transparent
        animationType='fade'
      >
        <View style={styles.container}>
          <Button onPress={handleClosePicker} style={styles.close} />
          <View style={[styles.content, { paddingBottom: bottom }]}>
            <Text style={styles.modalTitle} fontSize='lg'>
              Tarih Seç
            </Text>
            <View style={styles.pickers}>
              <Picker
                style={styles.picker}
                mode='dropdown'
                dropdownIconColor={COLORS.text}
                dropdownIconRippleColor={COLORS.transparent}
                selectedValue={selectedMonth}
                onValueChange={(itemValue: number) => setSelectedMonth(Number(itemValue))}
              >
                {months.map((month: IPickerContent) => (
                  <Picker.Item
                    key={month.value}
                    style={styles.pickerItem}
                    color={COLORS.text}
                    label={month.label}
                    value={month.value}
                  />
                ))}
              </Picker>
              <Picker
                style={styles.picker}
                mode='dropdown'
                dropdownIconColor={COLORS.text}
                dropdownIconRippleColor={COLORS.transparent}
                selectedValue={selectedYear}
                onValueChange={(itemValue: number) => setSelectedYear(Number(itemValue))}
              >
                {years.map((year: IPickerContent) => (
                  <Picker.Item
                    key={year.value}
                    style={styles.pickerItem}
                    color={COLORS.text}
                    label={year.label}
                    value={year.value}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.buttons}>
              <Button style={[styles.button, styles.cancelButton]} onPress={handleClosePicker}>
                <Text>Vazgeç</Text>
              </Button>
              <Button style={[styles.button, styles.saveButton]} onPress={handleSavePicker}>
                <Text>Kaydet</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  headerDate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: addOpacity(COLORS.gray2, 0.5),
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  close: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  content: {
    position: 'absolute',
    backgroundColor: COLORS.cardBackground,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalTitle: {
    textAlign: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
  },
  pickers: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    backgroundColor: COLORS.secondary,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: SPACING.sm,
  },
  saveButton: {
    backgroundColor: COLORS.blue,
  },
  cancelButton: {
    backgroundColor: COLORS.gray2,
  },
});
