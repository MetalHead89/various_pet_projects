import getDashboardData from '@/server/controllers/get_dashboard'

export default defineEventHandler(async event => {
  try {
    return await getDashboardData(event)
  } catch (error: TResponseError) {
    sendError(event, error)
  }
})
