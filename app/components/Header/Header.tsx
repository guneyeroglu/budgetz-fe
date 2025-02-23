import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { formatDate } from '@/global/utils';
import { SPACING } from '@/theme';

import { MonthYearPicker } from '../MonthYearPicker';
import { Text } from '../Text';

export const Header: FC = () => {
  const name: string = 'Güney Eroğlu';
  const today: Date = new Date();
  const todayFormatted: string = formatDate(today.toDateString());

  return (
    <View style={styles.header}>
      <MonthYearPicker />
      <View style={styles.infos}>
        <Text fontSize='md'>{name}</Text>
        <Text fontSize='xs' color='subtext'>
          {todayFormatted}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  infos: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});
