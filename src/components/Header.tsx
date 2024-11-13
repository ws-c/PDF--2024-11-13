'use client'
import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <nav
      style={{
        background: 'white',
        height: '70px',
      }}
    >
      <div className={styles.left}>
        <Link href="/" legacyBehavior>
          <a className={styles.bold}>PDF.ai</a>
        </Link>
      </div>
      <div className={styles.right}>
        <Link href="/" legacyBehavior>
          <a>Pricing</a>
        </Link>
        <Link href="/" legacyBehavior>
          <a>Chrome extension</a>
        </Link>
        <Link href="/" legacyBehavior>
          <a>Use cases</a>
        </Link>
        <Link href="/" legacyBehavior>
          <a>Get started</a>
        </Link>
      </div>
    </nav>
  )
}
