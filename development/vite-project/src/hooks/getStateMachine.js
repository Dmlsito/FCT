import { useEffect, useState } from 'react'

export const useStateMachine = ({ indexStart }) => {
  const [stateMachine, setStateMachine] = useState([''])

  useEffect(() => {
    fetch('http://localhost:8080/main-page')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setStateMachine(res)
      })
  }, [indexStart])
  return stateMachine
}
