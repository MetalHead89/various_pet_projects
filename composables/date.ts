import { DateTime } from 'luxon'

export function useData() {
  const { locale } = useI18n()

  const getShortMonthName = (month: number) => {
    const monthName = getFullMonthName(month)

    return monthName.charAt(0).toUpperCase() + monthName.slice(1, 3)
  }

  const getFullMonthName = (month: number) => {
    return DateTime
      .now()
      .set({ month })
      .setLocale(locale.value)
      .toLocaleString({ month: 'long' })
  }

  return { getShortMonthName, getFullMonthName }
}
