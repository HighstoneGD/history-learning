import { FC } from 'react'
import moment from 'moment'
import { ITimelineControlerProps } from './types'
import styles from './TimelineControler.module.scss'

export const TimelineControler: FC<ITimelineControlerProps> = ({
  currentDate,
  setCurrentDate,
  min,
  max,
}) => {
  return (
    <div className={styles.sliderContainer}>
      <input
        className={styles.slider}
        type="range"
        min={min.toDate().getTime()}
        max={max.toDate().getTime()}
        onChange={(e) => setCurrentDate(moment(+e.target.value))}
        value={currentDate.toDate().getTime()}
      />
    </div>
  )
}