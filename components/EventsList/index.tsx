import React from 'react'
import { EventBlock } from './EventBlock'
import { IEventListProps } from './types'

export const EventList: React.FC<IEventListProps> = ({ events }) => {
  return (
    <div>
      {events.map(({ name, range }) => <EventBlock name={name} range={range}/>)}
    </div>
  )
}
