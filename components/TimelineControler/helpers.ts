import { DurationInputArg1 } from 'moment'

export const getStep = (speed: number): DurationInputArg1 => {
  switch (speed) {
    case 1:
      return { days: 1 }
    case 2:
      return { weeks: 1 }
    case 3:
      return { month: 1 }
    case 4:
      return { months: 6 }
    case 5:
      return { years: 1 }
  }
}