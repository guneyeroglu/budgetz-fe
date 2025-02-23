import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS, RADIUS } from '@/theme';

import { Text } from '../Text';

interface IProps {
  title: string;
  subtitle: string;
  amount: string;
  remainingDays: number;
  dueDate: string;
}

export const ListCard: FC<IProps> = ({ title, subtitle, amount, remainingDays, dueDate }) => {
  const getPaymentStatus = (): string => {
    if (remainingDays === null || isNaN(remainingDays)) return COLORS.subtext;
    if (remainingDays > 7) return COLORS.success;
    if (remainingDays >= 3) return COLORS.warning;

    return COLORS.error;
  };

  return (
    <View style={[styles.container, { borderLeftColor: getPaymentStatus() }]}>
      <View style={styles.info}>
        <Text fontSize='md' variant='medium'>
          {title}
        </Text>
        <Text fontSize='sm'>{subtitle}</Text>
        <Text fontSize='sm' variant='light'>
          {`📅 ${dueDate}`}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontSize='lg' variant='bold'>
          {amount}
        </Text>
        <Text fontSize='sm'>{remainingDays === 0 ? '🔥 Son gün!' : `⏳ ${remainingDays} gün kaldı`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    borderLeftWidth: 8,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    alignItems: 'flex-start',
  },
  content: {
    alignItems: 'flex-end',
  },
});
