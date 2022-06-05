import { Moment } from 'moment'

export interface ITimelineControlerProps {
  currentDate: Moment,
  setCurrentDate: (currentDate: Moment) => void,
  min: Moment,
  max: Moment,
}