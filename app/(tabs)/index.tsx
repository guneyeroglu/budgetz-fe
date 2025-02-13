import { StyleSheet, View } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { Card } from '@/components/Card';
import { DonutChart } from '@/components/Chart';
import { Layout } from '@/components/Layout';
import { MonthYearPicker } from '@/components/MonthYearPicker';
import { Text } from '@/components/Text';
import { ICardChip } from '@/global/interfaces';
import { calculatePercentage, convertMoney, formatDate, useAppFont } from '@/global/utils';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export default function HomeScreen() {
  const name: string = 'Güney Eroğlu';
  const today: Date = new Date();
  const todayFormatted: string = formatDate(today.toDateString());

  const monthlyIncome: number = 10000;
  const monthlyExpense: number = 5000;
  const paidDebt: number = 3500;
  const remainingIncome: number = monthlyIncome - paidDebt;
  const remainingExpense: number = monthlyExpense - paidDebt;

  const monthlyIncomeChipColor: string = COLORS.success;
  const monthlyExpenseChipColor: string = COLORS.warning;
  const remainingIncomeChipColor: string = COLORS.accent;
  const paidDebtChipColor: string = COLORS.info;
  const remainingExpenseChipColor: string = COLORS.error;

  const { fontMedium: fontMediumSizeXLarge } = useAppFont(TYPOGRAPHY.fontSize.xl);
  const { fontRegular: fontRegularSizeSmall } = useAppFont(TYPOGRAPHY.fontSize.sm);

  const incomesChips: ICardChip[] = [
    {
      id: 1,
      color: monthlyIncomeChipColor,
      text: {
        label: 'Toplam Gelir',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(monthlyIncome),
        color: COLORS.subtext,
      },
    },
    {
      id: 2,
      color: monthlyExpenseChipColor,
      text: {
        label: 'Aylık Giderler',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(monthlyExpense),
        color: COLORS.subtext,
      },
    },

    {
      id: 3,
      color: paidDebtChipColor,
      text: {
        label: 'Bu Ay Ödenen',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(paidDebt),
        color: COLORS.subtext,
      },
    },
    {
      id: 4,
      color: remainingExpenseChipColor,
      text: {
        label: 'Kalan Borç',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(remainingExpense),
        color: COLORS.subtext,
      },
    },
    {
      id: 5,
      color: remainingIncomeChipColor,
      text: {
        label: 'Net Bakiye',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(remainingIncome),
        color: COLORS.subtext,
      },
    },
  ];

  return (
    <Layout>
      <View style={styles.header}>
        <MonthYearPicker />
        <View style={styles.infos}>
          <Text fontSize='md'>{name}</Text>
          <Text fontSize='xs' color='subtext'>
            {todayFormatted}
          </Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          <Card
            title='Aylık Finansal Özet'
            chips={incomesChips}
            cardStyle={styles.successCard}
            ChartComponent={() => (
              <DonutChart
                data={[
                  {
                    color: paidDebtChipColor,
                    value: calculatePercentage(paidDebt, monthlyExpense),
                  },
                  {
                    color: remainingExpenseChipColor,
                    value: calculatePercentage(remainingExpense, monthlyExpense),
                  },
                ]}
                radius={100}
                innerRadius={65}
                title={{
                  text: `${calculatePercentage(paidDebt, monthlyExpense)}%`,
                  font: fontMediumSizeXLarge,
                }}
                subtitle={{
                  text: `Ödenen Borç`,
                  font: fontRegularSizeSmall,
                }}
                chartInfoText='*Ödenen borcun toplam borca oranı'
              />
            )}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

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
  scrollContainer: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    padding: SPACING.md,
    gap: SPACING.xxl,
  },
  successCard: {
    // borderLeftWidth: 4,
    // borderLeftColor: COLORS.disabledText,
  },
});
