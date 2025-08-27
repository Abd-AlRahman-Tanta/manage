import { Outlet } from "react-router-dom"
import styled from "styled-components"
const All = styled.div`
  width: 100%;
  height: 100%;
`
const Products = () => {
  return (
    <All>
      <Outlet />
    </All>
  )
}

export default Products
