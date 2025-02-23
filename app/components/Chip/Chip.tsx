import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/Text';
import { COLORS, RADIUS, SPACING } from '@/theme';

interface IText {
  label?: string;
  color?: string;
}

interface IProps {
  color?: string;
  text?: IText;
  subtext?: IText;
}

export const Chip: FC<IProps> = ({ text, subtext, color = COLORS.primary }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.chip, { backgroundColor: color }]} />
      <View style={styles.textAndSubText}>
        {text && (
          <Text style={{ color: text.color ?? color }} fontSize='sm' variant='medium'>
            {text.label}
          </Text>
        )}
        {subtext && (
          <Text style={{ color: subtext.color ?? color }} fontSize='sm' variant='bold'>
            {subtext.label}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  chip: {
    padding: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  textAndSubText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.xxs,
  },
});
