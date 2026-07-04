import { useSelector } from "react-redux"

const useAuth = () => {
    const { user, accessToken , isAuthenticated} = useSelector((state) => state.auth)
    return {
        user,
        accessToken,
        isAuthenticated : !!user
    }
}
export default useAuth