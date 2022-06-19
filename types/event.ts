export type ExactDate = { exact: string }

export type RangeDate = { start: string, end: string }

export type EventDate = ExactDate | RangeDate 

export type Event = {
  id: string,
  name: string,
  description: string,
  date: EventDate,
  tags: string[],
  countries: string[],
  importance: number,
}
