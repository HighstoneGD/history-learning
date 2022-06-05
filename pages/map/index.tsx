import { FC, useState, useCallback, useRef, useEffect } from 'react'
import moment, { Moment } from 'moment'
import { EventList, TimelineControler } from '../../components'
import { START_DATE, END_DATE, DEFAULT_START_DATE, MAX_SPEED, DEFAULT_SPEED } from './constants'
import { getStep } from './helpers'

const MapPage: FC = () => {
  const [date, setDate] = useState<Moment>(DEFAULT_START_DATE)
  const [isPaused, setIsPaused] = useState<boolean>(true)
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED)

  const increaseSpeed = useCallback(() => setSpeed((prevSpeed: number) => Math.min(prevSpeed + 1, MAX_SPEED)), [setSpeed])
  const decreaseSpeed = useCallback(() => setSpeed((prevSpeed: number) => Math.max(prevSpeed - 1, 1)), [setSpeed])
  const togglePause = useCallback(() => setIsPaused(!isPaused), [isPaused, setIsPaused])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setDate((prevDate) => prevDate.clone().add(getStep(speed)))
      }
    }, 300)

    return () => clearInterval(intervalId)
  }, [isPaused, speed])

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
        speed={speed}
        increaseSpeed={increaseSpeed}
        decreaseSpeed={decreaseSpeed}
        isPaused={isPaused}
        togglePause={togglePause}
      />
      <EventList events={events} />
    </main>
  )
}

export default MapPage
