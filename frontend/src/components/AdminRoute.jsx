import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "./Message";

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo.admin ? <Outlet /> : <>
    <Message variant='warning'>Admin access only</Message>
    <Navigate to="/" replace />
    </>;
}

export default AdminRoute
