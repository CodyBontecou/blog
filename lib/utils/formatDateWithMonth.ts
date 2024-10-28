import { formatDate } from './formatDate'

export const formatDateWithMonth = (
    date: Date,
    readingTime: string,
    t: any
) => {
    return `${formatDate(date)} · ${readingTime} ${t('latest.minuteRead')}`
}
