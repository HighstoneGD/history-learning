import { FromTo } from 'moment'

export interface IEventBlockProps {
  name: string;
  range: FromTo;
}

export interface IEventListProps {
  events: IEventBlockProps[];
}
