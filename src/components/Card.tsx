import { useState } from "react"
import { RiDeleteBinLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import styled from "styled-components"
import type { CardProps } from ".."
import Confirmation from "./Confirmation"

const ProductCard = styled.div`
  >.card {
    width: 100%;
    min-height: 300px;
    border-radius: 8px;
    background-color: var(--bg1);
    box-shadow: 0px 8px 20px 0px var(--bg3);
    transition: 0.3s;
    .img {
      width: 100%;
      min-height: 200px;
      position: relative;
      img {
        border-radius: 8px 8px 0 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
      }
    }
    h2 {
      font-size: 28px;
      font-weight: 500;
      margin: 20px 20px 0;
    }
    p {
      color: #6666d3;
      margin: 16px 20px 0;
      color: green;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 32px;
      margin: 20px 20px 0;
      padding-bottom: 20px;
      .link {
        border-radius: 32px;
        width: 116px;
        height: 48px;
        border: none;
        background-color: #eee;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
      }
      .bin {
        font-size: 32px;
        cursor: pointer;
        color: var(--text1);

      }
    }
  }
`
const Card = ({ id, productName, img, productPrice, requestData, setItems }: CardProps) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const deleteProduct = async (id: number) => {
    setItems([{ name: "", id: 0, image_url: "", price: 0 }]);
    try {
      let response = await fetch(`https://vica.website/api/items/${id}`, { method: "DELETE", headers: { "Authorization": "Bearer " + localStorage.getItem("token"), "Accept": "application/json" } });
      if (response.ok) {
        console.log(response)
        requestData();
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <ProductCard>
      {
        showConfirmation && <Confirmation performFunction={() => deleteProduct(id)} close={setShowConfirmation} text="Delete This Product?" />
      }
      <div className="card">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <h2>{productName}</h2>
        <p>{productPrice}$</p>
        <div className="footer">
          <Link className="link" to={`editproduct/${id}`}>Edit Product</Link>
          <RiDeleteBinLine onClick={() => setShowConfirmation(true)} className="bin" />
        </div>
      </div>
    </ProductCard>
  )
}

export default Card
