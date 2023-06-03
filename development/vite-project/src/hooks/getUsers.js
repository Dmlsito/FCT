import { UsersContext } from '../context/user'
import { useContext } from 'react'

export const useUsers = () => {
  const { setUser, user } = useContext(UsersContext)

  return { setUser, user }
}
