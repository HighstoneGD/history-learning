import React, { FC, useCallback, useState, useEffect, useRef } from 'react'
import moment, { Moment } from 'moment'
import { ITimelineControlerProps } from './types'
import { getStep } from './helpers'
import { DEFAULT_FORMAT } from '../../constants/momentFormats'
import styles from './TimelineControler.module.scss'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

export const TimelineControler: FC<ITimelineControlerProps> = ({
  currentDate,
  setCurrentDate,
  min,
  max,
  speed,
  increaseSpeed,
  decreaseSpeed,
  isPaused,
  togglePause,
}) => {
  const onSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setCurrentDate(moment(+event.target.value)), [setCurrentDate])

  return (
    <div className={styles.wrapper}>
      <p className={styles.date}>{currentDate.format(DEFAULT_FORMAT)}</p>
      <input
        className={styles.slider}
        type="range"
        min={min.toDate().getTime()}
        max={max.toDate().getTime()}
        onChange={onSliderChange}
        value={currentDate.toDate().getTime()}
      />
      <div className={styles.controllersWrapper}>
        <div className={styles.iconsWrapper}>
          <DoDisturbOnIcon onClick={decreaseSpeed} />
          {isPaused ? (
            <PlayCircleIcon onClick={togglePause} />
          ) : (
            <PauseCircleIcon onClick={togglePause} />
          )}
          <AddCircleIcon onClick={increaseSpeed} />
        </div>
        <p>{`Speed: ${speed}`}</p>
      </div>
    </div>
  )
}