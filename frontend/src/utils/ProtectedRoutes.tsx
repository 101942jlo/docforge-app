import { PropsWithChildren } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { User } from "../types/user";
import { useAuth } from "../components/AuthProvider";

type ProtectedRoutesProps = PropsWithChildren & {
    allowRoles: User['role'][];
}

const ProtectedRoutes = ({allowRoles}: ProtectedRoutesProps) => {
    const { currentUser, loading } = useAuth()

    if (loading) {
        return <p>Loading...</p>;
    }

    if(!currentUser) {
        return <Navigate to={"/sign-in"} replace />
    }
    
    if (!allowRoles.includes(currentUser.role)) {
        return <Navigate to="/dashboard" replace />;  // Redirect unauthorized users
    }
    
    return <Outlet />;
}


export default ProtectedRoutes