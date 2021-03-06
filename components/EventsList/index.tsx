import React from 'react'
import moment from 'moment'
import { EventBlock } from './EventBlock'
import { IEventListProps } from './types'
import { ExactDate, RangeDate, EventDate } from '../../types/event'
import { DEFAULT_FORMAT } from '../../constants/momentFormats'
import styles from './EventList.module.scss'

export const EventList: React.FC<IEventListProps> = ({ events, date, showOnly }) => {
  const filteredEvents = events
    .filter((event) => {
      const exactDate = event.date as ExactDate
      const rangeDate = event.date as RangeDate

      return !!exactDate.exact
        ? date.isAfter(moment(exactDate.exact, DEFAULT_FORMAT)) || date.isSame(moment(exactDate.exact, DEFAULT_FORMAT))
        : date.isAfter(moment(rangeDate.start, DEFAULT_FORMAT)) || date.isSame(moment(rangeDate.start, DEFAULT_FORMAT))
    })
    .sort((e1, e2) => {
      const exactDate1 = e1.date as ExactDate
      const rangeDate1 = e1.date as RangeDate
      const exactDate2 = e2.date as ExactDate
      const rangeDate2 = e2.date as RangeDate

      const date1 = exactDate1.exact && rangeDate1.start
      const date2 = exactDate2.exact && rangeDate2.start

      return moment(date1, DEFAULT_FORMAT).isBefore(moment(date2, DEFAULT_FORMAT))
        ? -1
        : 1
    })

  const lastEvents = filteredEvents.length > showOnly
    ? filteredEvents.filter((event, idx) => idx >= filteredEvents.length - showOnly)
    : filteredEvents

  return (
    <div className={styles.wrapper}>
      {lastEvents.map((event) => <EventBlock {...event}/>)}
    </div>
  )
}
