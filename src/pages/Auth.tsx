import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import styled from "styled-components"

const Authentication = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  >img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [])
  return (
    <Authentication>
      <img src="/assets/imgs/authbg.jpg" alt="" />
      <Outlet />
    </Authentication>
  )
}

export default Auth
