import{ Link } from 'react-router-dom'

export const Entry = () => {
    return (
        <button><Link to={'/login'}>Sig in</Link></button>
    )
}