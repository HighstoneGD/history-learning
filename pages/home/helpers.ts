import { DurationInputArg1 } from 'moment'
import { DEFAULT_STEP_TIMEOUT, DEFAULT_REQUEST_PERIOD } from './constants'

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
    case 6:
      return { years: 10 }
  }
}

export const getRangeSize = (speed: number, multiplier: number = 1): DurationInputArg1 => {
  const step = getStep(speed)
  return { [Object.keys(step)[0]]: Object.values(step)[0] * DEFAULT_REQUEST_PERIOD / DEFAULT_STEP_TIMEOUT * multiplier }
}
