import { FC } from 'react'
import { ITimelineControlerProps } from './types'
import styles from './TimelineControler.module.scss'

export const TimelineControler: FC<ITimelineControlerProps> = ({ currentDate, setCurrentDate }) => {
  return (
    <div className={styles.sliderContainer}>
      <input className={styles.slider} type="range" />
    </div>
  )
}