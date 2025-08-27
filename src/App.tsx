import { Outlet } from "react-router-dom"
import styled from "styled-components"


const Root = styled.div`
  min-height: 100vh;
  width: 100%;
`
const App = () => {
  return (
    <Root className="root">
      <Outlet />
    </Root>
  )
}

export default App
