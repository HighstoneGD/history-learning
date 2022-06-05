import { Moment } from 'moment'

export interface ITimelineControlerProps {
  currentDate: Moment,
  setCurrentDate: (currentDate: Moment) => void
}