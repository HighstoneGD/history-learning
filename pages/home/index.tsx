import { FC, useState, useCallback, useEffect } from 'react'
import { Moment } from 'moment'
import { EventList, TimelineControler } from '../../components'
import {
  START_DATE,
  END_DATE,
  DEFAULT_START_DATE,
  MAX_SPEED,
  DEFAULT_SPEED,
  DEFAULT_STEP_TIMEOUT
} from './constants'
import { Event } from '../../types/event'
import { getStep, getRangeSize } from './helpers'
import axios from '../../axios'
import styles from './Home.module.scss'
import { DEFAULT_FORMAT } from '../../constants/momentFormats'

const HomePage: FC = () => {
  const [date, setDate] = useState<Moment>(DEFAULT_START_DATE)
  const [isPaused, setIsPaused] = useState<boolean>(true)
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED)
  const [events, setEvents] = useState<Event[]>([])
  const [timestamp, setTimestamp] = useState<Moment>(null)

  const increaseSpeed = useCallback(() => setSpeed((prevSpeed: number) => Math.min(prevSpeed + 1, MAX_SPEED)), [setSpeed])
  const decreaseSpeed = useCallback(() => setSpeed((prevSpeed: number) => Math.max(prevSpeed - 1, 1)), [setSpeed])
  const togglePause = useCallback(() => setIsPaused(!isPaused), [isPaused, setIsPaused])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setDate((prevDate) => {
          if (prevDate.isSame(END_DATE) || prevDate.isAfter(END_DATE)) {
            setIsPaused(true)
          }
          return prevDate.clone().add(getStep(speed))
        })
      }
    }, DEFAULT_STEP_TIMEOUT)

    return () => clearInterval(intervalId)
  }, [isPaused, speed])

  const fetchEvents = (forceStartDate?: Moment) => {
    const startDate = forceStartDate || timestamp || date
    const endDate = startDate.clone().add(getRangeSize(speed))
    axios.get(`/events?start=${startDate.format(DEFAULT_FORMAT)}&end=${endDate.format(DEFAULT_FORMAT)}`)
      .then((eventList) => {
        const parsedEventList = eventList.data as unknown as Array<Event>
        setEvents((prevEvents) => {
          const receivedIds = prevEvents.map(({ id }) => id)
          return [...prevEvents, ...parsedEventList.filter(({ id }) => !receivedIds.includes(id))]
        })
        setTimestamp(() => startDate.clone().add(getRangeSize(speed, 0.75)))
      })
  }

  useEffect(() => {
    if (!timestamp || date.isAfter(timestamp)) {
      fetchEvents()
    }
  }, [date, speed])

  return (
    <main className={styles.wrapper}>
      <section className={styles.timelineWrapper}>
        <TimelineControler
          currentDate={date}
          setCurrentDate={setDate}
          onChangeManually={() => fetchEvents(date)}
          min={START_DATE}
          max={END_DATE}
          speed={speed}
          increaseSpeed={increaseSpeed}
          decreaseSpeed={decreaseSpeed}
          isPaused={isPaused}
          togglePause={togglePause}
        />
      </section>
      <section className={styles.eventListWrapper}>
        <EventList events={events} date={date} showOnly={3} />
      </section>
    </main>
  )
}

export default HomePage
