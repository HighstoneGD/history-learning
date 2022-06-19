import React, { useState, useCallback } from 'react'
import moment from 'moment'
import { Event, ExactDate, RangeDate } from '../../../types/event'
import { DEFAULT_FORMAT } from '../../../constants/momentFormats'
import styles from './EventBlock.module.scss'

export const EventBlock: React.FC<Event> = ({
  id,
  name,
  description,
  date,
  tags,
  countries,
  importance,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  const toggleIsCollapsed = useCallback(() => setIsCollapsed((prevState) => !prevState), [setIsCollapsed])

  const exactDate = date as ExactDate
  const rangeDate = date as RangeDate

  const dateString: string = !!exactDate.exact
    ? moment(exactDate.exact, DEFAULT_FORMAT).format(DEFAULT_FORMAT)
    : `${moment(rangeDate.start, DEFAULT_FORMAT).format(DEFAULT_FORMAT)} - ${moment(rangeDate.end, DEFAULT_FORMAT).format(DEFAULT_FORMAT)}`

  return (
    <div className={styles.wrapper} key={name}>
      <h3 className={styles.title}>{name}</h3>
      <h4>{`Importance: ${importance}`}</h4>
      <p className={styles.date}>{dateString}</p>
      <span className={styles.showMore} onClick={toggleIsCollapsed}>{ isCollapsed ? 'Show more' : 'Show less' }</span>
      {
        !isCollapsed && <p>{description}</p>
      }
      <div className={styles.tags}>
        {
          tags.map((tag: string) => (
            <p className={styles.tag} key={`${id}-${tag}`}>{tag}</p>
          ))
        }
      </div>
    </div>
  )
}
