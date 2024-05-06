import { H3Event } from 'h3'
import DashboardData from '@/server/models/dashboard_data'

export default (event: H3Event) => {
  return new Promise(resolve => { setTimeout(() => resolve(new DashboardData().getRandomData()), 2000)})
}
