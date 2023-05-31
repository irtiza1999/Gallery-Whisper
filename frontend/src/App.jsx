import {Outlet} from "react-router-dom"
import Header from "./components/header"
import { Container } from "react-bootstrap"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from "./components/ErrorBoundary"



const App = () => {
  return (
    <>
    {/* <ErrorBoundary> */}
     <Header style={{ marginBottom: '20px' }} />
     <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      theme="light"
      />
      <Container className="my-2">
        <Outlet />
      </Container>
      {/* </ErrorBoundary> */}
    </>
  )
}
export default App