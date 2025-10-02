import React from 'react'
// import { motion } from 'framer-motion'

export default function Annimated(props) {
  // const config = {
  //   initial: { opacity: 0 },
  //   animate: { opacity: 1 },
  //   exit:{opacity:1}
  // }
  return (
    <div {...props}>
        {props.children}
    </div>
  )
}
