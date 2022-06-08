import React from 'react'
import { EventBlock } from './EventBlock'
import { IEventListProps } from './types'
import styles from './EventList.module.scss'

export const EventList: React.FC<IEventListProps> = ({ events }) => {
  return (
    <div className={styles.wrapper}>
      {events.map(({ name, range }) => <EventBlock name={name} range={range}/>)}
    </div>
  )
}
