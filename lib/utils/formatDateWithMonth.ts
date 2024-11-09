import { formatDate } from './formatDate'

export const formatDateWithMonth = (
    date: Date,
    readingTime: number,
    t: any
) => {
    return `${formatDate(date)} · ${readingTime} ${t('latest.minuteRead')}`
}
