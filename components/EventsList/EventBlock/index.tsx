import React from 'react'
import { IEventBlockProps } from '../types'
import styles from './EventBlock.module.scss'

export const EventBlock: React.FC<IEventBlockProps> = ({ name, range }) => {
  const { from, to } = range

  return (
    <div className={styles.wrapper} key={name}>
      <h3>{name}</h3>
      <p>{`${from.toString()}-${to.toString()}`}</p>
    </div>
  )
}
