import { CardState } from './CardState'
import { useStateMachine } from '../hooks/getStateMachine'

export const TableState = ({ indexStart, handleClick }) => {
  const stateMachine = useStateMachine({ indexStart })
  return (
    <div className='table'>
      <h3>Machine status</h3>
      {
          stateMachine.splice(indexStart, 6).map((state) => {
            return (
              <CardState state={state} key={state.id} />
            )
          })
        }
      <button className='button table-button ' onClick={handleClick}>+</button>
    </div>
  )
}
