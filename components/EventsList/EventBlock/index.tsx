import React from 'react'
import { IEventBlockProps } from '../types'

export const EventBlock: React.FC<IEventBlockProps> = ({ name, range }) => {
  const { from, to } = range

  return (
    <div key={name}>
      <h3>{name}</h3>
      <p>{`${from.toString()}-${to.toString()}`}</p>
    </div>
  )
}
