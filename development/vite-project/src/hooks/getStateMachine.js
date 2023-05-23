import { useEffect, useState } from 'react'

export const useStateMachine = ({ indexStart }) => {
  const [role, setRole] = useState('')
  const [stateMachine, setStateMachine] = useState([''])

  useEffect(() => {
    fetch('http://localhost:8080/main-page')
      .then(res => res.json())
      .then(res => {
        setStateMachine(res.rows)
        setRole(res.roles)
      })
  }, [indexStart])
  //
  return { stateMachine, role }
}
