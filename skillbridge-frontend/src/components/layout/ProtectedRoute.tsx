import {Navigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type Props = {
    children: React.ReactNode;
    requiredRole?: 'Admin' | 'job_seeker';
};
 export const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
    const { isAuthenticated, isAdmin, isJobSeeker } = useAuth(); 
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole === 'Admin' && !isAdmin) {
        return <Navigate to="/" replace />;
    }
    if (requiredRole === 'job_seeker' && !isJobSeeker) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};