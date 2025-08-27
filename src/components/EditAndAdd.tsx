import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { BiUpload } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import type { GetItemsProps } from ".."

const EditWithAdd = styled.div`
width: 100%;
height: 100%;
transition: 0.3s;
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
  h1 {
    font-size: 32px;
    color: var(--text);
    margin-bottom: 40px;
  }
  .middle {
    width: 100%;
    min-height: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    .inputs {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: 32px;
      .input1 , .input2 {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 20px;
        label {
          font-size: 18px;
        }
        input[type="text"] {
          flex-grow: 1;
          width: 100%;
          height: 48px;
          border-radius: 16px;
          padding-left: 20px;
          border: 1px solid var(--bg3);
          color: var(--text);
          background-color: var(--bg1);
        }
      }
    }
      .file {
        width: 50%;
        label {
          width: 100%;
          min-height: 370px;
          flex-grow: 1;
          border-radius: 16px;
          border: 2px dotted #0077ff;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          color: #0077ff;
          >img {
            width: 100%;
            height: 80%;
            object-fit: cover;
            align-self: flex-end;
          }
        }
        input[type="file"] {
          display: none;
        }
      }
  }
    button {
    margin: 24px 0;
    width: 160px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0077ff;
    color: white;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 16px;
    cursor: pointer;
  }
  @media screen and (max-width : 992px) {
    .middle {
      flex-direction: column;
      width: 100%;
      .inputs {
        width: 100%;
      }
      .file {
        width: 100%;
      }
    }
  }
`
const EditAndAdd = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<GetItemsProps | null>({ id: 0, image_url: "", name: "", price: 0 });
  const [image, setimage] = useState<string>("");
  const [wait, setWait] = useState<string>("wait");
  const input1 = useRef<HTMLInputElement | null>(null);
  const input2 = useRef<HTMLInputElement | null>(null);
  const input3 = useRef<HTMLInputElement | null>(null);
  const getItem = async () => {
    setWait("wait")
    try {
      let response = await fetch(`https://vica.website/api/items/${id}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Accept": "application/json"
        }
      })
      if (response.ok) {
        let production: GetItemsProps = await response.json();
        setProduct(production);
        setWait("");
      }
      else {
        setWait("error")
        console.log(response)
      }
    }
    catch (error) {
      console.log(error)
      setWait("error")
    }
  }

  const addItem = async () => {
    setWait("wait");
    try {
      let forming = new FormData();
      if (input1.current && input2.current && input3.current?.files) {
        forming.append("name", input1.current?.value);
        forming.append("price", input2.current?.value);
        forming.append("image", input3.current?.files[0]);
        let response = await fetch("https://vica.website/api/items", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: forming
        });
        if (response.ok) {
          navigate("/dashboard");
        }
        else {
          setWait("error")
        }
      }
    }
    catch (error) {
      console.log(error);
      setWait("error");
    }
  }
  const editItem = async () => {
    setWait("wait");
    setProduct({ id: 0, image_url: "", name: "", price: 0 });
    try {
      if (input1.current && input2.current && input3.current?.files) {
        let response = await axios.post(`https://vica.website/api/items/${id}`, {
          name: input1.current?.value,
          price: input2.current?.value,
          image: input3.current?.files[0],
          _method: "PUT"
        }, {
          headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          }
        })
        if (response) {
          navigate("/dashboard");
        }
        else {
          setWait("error");
        }
      }
    }
    catch (error) {
      console.log(error)
      setWait("error")
    }
  }


  useEffect(() => {
    id ? getItem() : setWait("");
  }, [])
  if (id && wait == "" && product)
    return (
      <EditWithAdd>
        <h1>Edit Product </h1>
        <div className="middle">
          <div className="inputs">
            <div className="input1">
              <label htmlFor="input1"> Product Name </label>
              <input ref={input1} defaultValue={product.name} id="input1" type="text" name="" />
            </div>
            <div className="input2">
              <label htmlFor="input2"> Product Price </label>
              <input ref={input2} defaultValue={product.price} id="input2" type="text" name="" />
            </div>
          </div>
          <div className="file">
            <label htmlFor="input3">{image != "" ? <img src={image} alt="" /> : <img src={product.image_url} alt="" />}<BiUpload />Upload Product Image</label>
            <input ref={input3} style={{ display: "none" }} id="input3" onChange={(e) => setimage(e.target.files ? URL.createObjectURL(e.target.files[0]) : "")} type="file" />
          </div>
        </div>
        <button onClick={editItem}>Edit Product</button>
      </EditWithAdd>
    )
  else if (id && wait == "wait")
    return (
      <EditWithAdd>
        <div className="load-text">
          <div className="load"></div>
          <p>Loading</p>
        </div>
      </EditWithAdd>
    )
  else if (id && wait == "error")
    return (
      <EditWithAdd>
        <div className="error">Oops!.....Faild To Fetch!</div>
      </EditWithAdd>
    )
  else if (!id && wait == "") {
    return (
      <EditWithAdd>
        <h1>Edit Product </h1>
        <div className="middle">
          <div className="inputs">
            <div className="input1">
              <label htmlFor="input1"> Product Name </label>
              <input ref={input1} id="input1" type="text" name="" />
            </div>
            <div className="input2">
              <label htmlFor="input2"> Product Price </label>
              <input ref={input2} id="input2" type="text" name="" />
            </div>
          </div>
          <div className="file">
            <label htmlFor="input3">{image != "" && <img src={image} alt="" />}<BiUpload />Upload Product Image</label>
            <input ref={input3} style={{ display: "none" }} id="input3" onChange={(e) => setimage(e.target.files ? URL.createObjectURL(e.target.files[0]) : "")} type="file" />
          </div>
        </div>
        <button onClick={addItem}>Create</button>
      </EditWithAdd>
    )
  }
  else if (!id && wait == "wait")
    return (
      <EditWithAdd>
        <div className="load-text">
          <div className="load"></div>
          <p>Loading</p>
        </div>
      </EditWithAdd>
    )
  else if (!id && wait == "error")
    return (
      <EditWithAdd>
        <div className="error">Oops!.....Faild To Fetch!</div>
      </EditWithAdd>
    )
}

export default EditAndAdd
