
import { useEffect, useRef } from 'react'
import '../css/Clock.css'

export const Clock = () => {
  const span = useRef()
  const time = () => {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${hour}:${minute}:${second}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Cada vez que querramos acceder a una referencua tendremos que acceder a la propiedad current del elemento
      span.current.innerHTML = `${time()}`
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <span className='clock' ref={span}>{time()}</span>
}
