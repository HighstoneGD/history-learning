import { Moment } from 'moment'

export interface ITimelineControlerProps {
  currentDate: Moment
  setCurrentDate: React.Dispatch<React.SetStateAction<Moment>>
  onChangeManually: () => void
  min: Moment
  max: Moment
  speed: number
  increaseSpeed: () => void
  decreaseSpeed: () => void
  isPaused: boolean
  togglePause: () => void
}
