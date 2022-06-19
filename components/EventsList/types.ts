import { Moment } from 'moment'
import { Event } from '../../types/event'

export interface IEventListProps {
  events: Event[],
  date: Moment,
  showOnly: number
}
