import moment, { DurationInputArg1, Moment } from 'moment'
import { DEFAULT_STEP_TIMEOUT, DEFAULT_REQUEST_PERIOD } from './constants'
import { Event, ExactDate, RangeDate } from '../../types/event'
import { DEFAULT_FORMAT } from '../../constants/momentFormats'

export const getStep = (speed: number): DurationInputArg1 => {
  switch (speed) {
    case 1:
      return { days: 1 }
    case 2:
      return { month: 1 }
    case 3:
      return { month: 3 }
    case 4:
      return { months: 6 }
    case 5:
      return { years: 1 }
  }
}

export const getRangeSize = (speed: number, multiplier: number = 1): DurationInputArg1 => {
  const step = getStep(speed)
  return { [Object.keys(step)[0]]: Object.values(step)[0] * DEFAULT_REQUEST_PERIOD / DEFAULT_STEP_TIMEOUT * multiplier }
}

export const getStartDate = (lastEvent: Event | null, timestamp: Moment | null, currentDate: Moment): Moment => {
  const options: Moment[] = [currentDate]

  if (lastEvent) {
    const exactDate = lastEvent?.date as ExactDate
    const rangeDate = lastEvent?.date as RangeDate
    const lastEventStart = moment(exactDate.exact, DEFAULT_FORMAT) || moment(rangeDate.start, DEFAULT_FORMAT)

    if (lastEventStart.isValid()) {
      options.push(lastEventStart)
    }
  }
  
  if (timestamp) {
    options.push(timestamp)
  }

  return moment.max(options)
}
