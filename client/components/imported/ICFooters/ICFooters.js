import React from 'react'
import styles from '../ICFooters/ICFooters.module.css'

export default function ICFooters({FotLegend}) {
  return (
    <>
      <h4 className={styles.footer}>{FotLegend}</h4>
    </>
  )
}