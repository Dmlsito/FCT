
import { CardState } from './CardState'
import { useStateMachine } from '../hooks/getStateMachine'
import { useMemo } from 'react'
export const TableState = ({ indexStart, handleClick, click }) => {
  const stateMachine = useStateMachine({ indexStart })
  // Solo queremos que se muestren los siguientes datos cuando le demos click
  const showInfoState = useMemo(() => {
    return stateMachine.splice(indexStart, 6)
  }, [click])

  return (
    <div className='table'>
      <h3>Machine status</h3>
      {showInfoState[0] === ''
        ? [...stateMachine].splice(0, 6).map((state) => {
            return (
              <CardState state={state} key={state.id} />
            )
          })
        : showInfoState.map((state) => {
          return (
            <CardState state={state} key={state.id} />
          )
        })}
      <button className='button table-button ' onClick={handleClick}>+</button>
    </div>
  )
}
