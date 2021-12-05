import dayjs from "dayjs"
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/ru')

dayjs.extend(relativeTime)
dayjs.locale('en')

// @ts-ignore
export const getDateFromNow = (date: any) => dayjs(date).fromNow()