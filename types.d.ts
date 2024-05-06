type TAnyObject = { [prop: string]: any }

type TApiParams = {
  isFullPath?: boolean,
  realm?: 'api',
  path: string
}

type TResponseError = {
  statusCode: number,
  data: {
    message: string,
    fieldErrors: fieldError[]
  }
} | Error<any>

type TDashboardData = Array<{
  date: string,
  value: number
}>

type TDashboardChartData = { [key: number]: number[] }

interface IFetchService {
  get: (path: TApiParams, params?: TAnyObject) => any,
  post: (path: TApiParams, body?: TAnyObject) => any
}

interface IApi {
  dashboard: {
    get: () => Promise<TDashboardData>
  }
}
