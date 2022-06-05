import { FC, useState } from 'react'
import moment, { Moment } from 'moment'
import { EventList, TimelineControler } from '../../components'
import { START_DATE, END_DATE, DEFAULT_START_DATE } from './constants'

const MapPage: FC = () => {
  const [date, setDate] = useState<Moment>(DEFAULT_START_DATE)

  console.log(date.toISOString())

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
      <TimelineControler
        currentDate={date}
        setCurrentDate={setDate}
        min={START_DATE}
        max={END_DATE}
      />
      <EventList events={events} />
    </main>
  )
}

export default MapPage
