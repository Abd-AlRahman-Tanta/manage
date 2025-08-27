import { useContext, useEffect, useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import type { GetItemsProps } from ".."
import Card from "../components/Card"
import { SearchValue } from "./Dashboard"
const Products = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .add {
    width: 200px;
    height: 48px;
    background-color: #007bff;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 16px;
    cursor: pointer;
    border: none;
    font-size: 18px;
    color: white;
  }
  .container {
    padding-top: 100px;
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
    }
    .load-text {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .load   {
        background-color: transparent;
        width: 140px;
        height: 140px;
        border-top:6px solid transparent ;
        border-bottom:1px solid transparent ;
        border-left:1px solid var(--text) ;
        border-right:1px solid var(--text) ;
        border-radius: 50%;
        animation-name: spin;
        animation-duration: 0.7s ;
        animation-iteration-count: infinite;
      }
      p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
    
    .error {
      width: 80%;
      height: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #a02c2c;
      color: white;
      border-bottom: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      padding: 20px;
    }
  @keyframes spin {
    0% {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
  }
  @media screen and (max-width : 992px) {
    .container {
      display: grid;
      grid-template-columns: repeat(auto-fit , minmax(240px , 1fr));
    }
  }
`
const AllProducts = () => {
  const [products, setProducts] = useState<Array<GetItemsProps> | null>([{ name: "", id: 0, image_url: "", price: 0 }]);
  const search = useContext(SearchValue);
  const navigate = useNavigate();
  const getProducts = async () => {
    setProducts([{ name: "", id: 0, image_url: "", price: 0 }]);
    try {
      let response = await fetch("https://vica.website/api/items", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Accept": "application/json"
        }
      })
      if (response.ok) {
        let products: Array<GetItemsProps> = await response.json();
        setProducts(products)
      }
      else {
        setProducts(null);
        console.log(response)
      }
    }
    catch (error) {
      setProducts(null);
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts();
  }, [])
  if (products && products[0].image_url != "")
    return (
      <Products>
        <button onClick={() => navigate("createproduct")} className="add"><CiCirclePlus style={{ fontSize: "28px" }} />Create Product</button>
        <div className="container">
          {
            [...products].filter((product) => {
              if (search && product.name.toLowerCase().includes(search?.search.toLowerCase()))
                return true;
            }).map((product) => {
              return (
                <div key={product.id} className="card">
                  <Card setItems={setProducts} requestData={getProducts} productName={product.name} productPrice={product.price} id={product.id} img={product.image_url} />
                </div>
              )
            })
          }
        </div>
      </Products>
    )
  else if (products && products[0].image_url == "")
    return (
      <Products>
        <div className="load-text">
          <div className="load"></div>
          <p>Loading</p>
        </div>
      </Products>
    )
  else if (products == null)
    return (
      <Products>
        <div className="error">Oops!.....Faild To Fetch!</div>
      </Products>
    )
}

export default AllProducts
