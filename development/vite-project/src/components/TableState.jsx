import { CardState } from './CardState'

export const TableState = ({ stateMachine, indexStart, handleClick }) => {
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
      <button className='table-button' onClick={handleClick}>+</button>
    </div>
  )
}
