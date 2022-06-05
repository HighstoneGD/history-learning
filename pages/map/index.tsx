import { FC, useState } from 'react'
import moment, { Moment } from 'moment'
import { EventList, TimelineControler } from '../../components'
import { DEFAULT_START_DATE } from './constants'

const MapPage: FC = () => {
  const [date, setDate] = useState<Moment>(DEFAULT_START_DATE)

  const events = [
    {
      name: 'event1',
      range: {
        from: moment('10.02.1657'),
        to: moment('31.03.1766')
      }
    }
  ]

  return (
    <main>
      <TimelineControler currentDate={date} setCurrentDate={setDate} />
      <EventList events={events} />
    </main>
  )
}

export default MapPage
