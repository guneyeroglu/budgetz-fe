import { FC, Fragment } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ICardChip } from '@/global/interfaces';
import { getShadow } from '@/global/utils';
import { COLORS, SPACING } from '@/theme';

import { Chip } from '../Chip';
import { Text } from '../Text';

interface IProps {
  chips: ICardChip[];
  title?: string;
  cardStyle?: StyleProp<ViewStyle>;
  ChartComponent?: FC;
}

export const Card: FC<IProps> = ({ title, chips, cardStyle, ChartComponent }) => {
  return (
    <View style={styles.container}>
      {title && <Text fontSize='xl'>{title}</Text>}
      <View style={[styles.bigCard, cardStyle]}>
        {ChartComponent && (
          <View style={styles.chart}>
            <ChartComponent />
          </View>
        )}
        <View style={styles.innerCard}>
          {chips.map((chip: ICardChip, index: number) => (
            <Fragment key={chip.id}>
              <Chip
                color={chip.color}
                text={{
                  label: chip.text.label,
                  color: chip.text.color,
                }}
                subtext={{
                  label: chip.subtext.label,
                  color: chip.subtext.color,
                }}
              />
              {index !== chips.length - 1 ? <View style={styles.border} /> : null}
            </Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.md,
  },
  bigCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: COLORS.cardBackground,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 8,
    ...getShadow(),
  },
  innerCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: SPACING.md,
    gap: SPACING.lg,
    ...getShadow(),
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
});
