import { DateTime } from 'luxon'
import { getRandomNumber } from '@/utils/random_data'

const MIN_YEARS_RANGE_SIZE = 3
const MAX_YEARS_RANGE_SIZE = 6
const MIN_RECORDS_COUNT = 50
const MAX_RECORDS_COUNT = 1000
const MIN_RECORD_VALUE = 0
const Max_RECORD_VALUE = 100

export default class DashboardData {
  private minYear: number
  private recordsCount: number

  constructor() {
    this.minYear = DateTime.now().minus({ years: getRandomNumber(MIN_YEARS_RANGE_SIZE, MAX_YEARS_RANGE_SIZE) }).year
    this.recordsCount = getRandomNumber(MIN_RECORDS_COUNT, MAX_RECORDS_COUNT)
  }

  private randomIsoDate() {
    const randomSecondsDate = getRandomNumber(
      DateTime.local(this.minYear, 1, 1, 0, 0).toSeconds(), DateTime.now().toSeconds()
    )
    return DateTime.fromSeconds(randomSecondsDate).toISODate()
  }

  private getRandomRecord() {
    return {
      date: this.randomIsoDate(),
      value: getRandomNumber(MIN_RECORD_VALUE, Max_RECORD_VALUE)
    }
  }

  getRandomData() {
    const data: TDashboardData = []

    for (let i = 0; i < this.recordsCount; i++) {
      data.push(this.getRandomRecord())
    }

    return data.sort((a, b) => DateTime.fromISO(a.date).toSeconds() - DateTime.fromISO(b.date).toSeconds())
  }
}
