export const Form = ({ handleSubmit, getPassword, getUsername, username, password, showErrors }) => {
  return (
    <main className='main'>
      <div className='main-log'>
        <h2>Welcome!!</h2>
        <form className='log-form' action='/main-page' onSubmit={handleSubmit}>
          <input placeholder='Username' onChange={getUsername} value={username} name='name' />
          <input placeholder='Password' onChange={getPassword} value={password} name='password' />
          {showErrors && <span>This user doesn't exist</span>}
          <button type='submit' className='button'>Sign in</button>
        </form>
      </div>
    </main>
  )
}
