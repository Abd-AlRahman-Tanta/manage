import { useRef, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import type { AuthProps } from ".."

const AuthenticationForm = styled.div`
  >form {
    margin: 80px auto;
    background-color: white;
    border-radius: 16px;
    width: max-content;
    min-height: 300px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .title {
      text-align: center;
      margin-bottom: 10px;
      h1 {
        font-weight: 600;
        font-size: 32px;
        margin-bottom: 8px;
      }
      p {
        font-size: 18px;
      }
    }
    .fields {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      .field {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 8px;
        input {
          width: 100%;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 12px;
          background-color: #ebebeb;
          outline: none;
          &:focus {
            border-color: gray;
          }
        }
        label {
          width: 100%;
          font-weight: 500;
          >img {
            height: 120px;
          }
        }
      }
      .field:nth-child(4) {
        width: 100%;
        grid-area: 2 / 1 / 3 / span 3;
      }
      .field:nth-child(5) {
        width: 100%;
        grid-area: 3 / 1 / 4 / span 2;
      }
      .field:nth-child(7) {
        width: 100%;
        grid-area: 4 / 1 / 5 / 2;
        label {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
      }
      
    }
    .foot {
      text-align: center;
      >button {
        width: 160px;
        height: 50px;
        margin-bottom: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border: none;
        outline: none;
        margin-left: auto;
        margin-right: auto;
        border-radius: 12px;
        background-color: #00a2ff;
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          transform: scale(1.05);
          background-color: #00a2ff94;
        }
      }
      >p {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }
    }

  }
.spin {
  display: block !important;
  width: 20px !important;
  height: 20px !important;
  background-color: transparent !important;
  border-top: 3px solid white !important;
  border-bottom: 3px solid white !important;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-radius: 50% !important;
  animation-name: spin !important;
  animation-duration: 0.7s !important;
  animation-iteration-count: infinite !important;
}
  @keyframes spin {
    0% {transform : rotate(0deg)}
    100% {transform: rotate(360deg)}
  }
  @media screen and (max-width : 992px) {
    >form {
      padding: 12px;
      width: 100%;
      .fields {
        grid-template-columns: repeat(auto-fit , minmax(200px , 1fr));
        .field:nth-child(4) {
          width: 100%;
          grid-area : auto;
        }
        .field:nth-child(5) {
          width: 100%;
          grid-area : auto;
        }
        .field:nth-child(7) {
          width: 100%;
          grid-area : auto;
        }
      }
    }
  }
`
const AuthForm = <T,>({ notification, title, description, inputs, btn, footing, data, setData, notify }: AuthProps<T>) => {
  const empty = useRef<boolean>(false);
  const informations = useRef<T>(data);
  const [photo, setPhoto] = useState<string>("/assets/imgs/admin.jpg");
  const sendData = (event: FormEvent) => {
    event.preventDefault();
    notify("loading");
    const form = event.target as HTMLFormElement;
    const inputs = Array.from(form.elements) as HTMLInputElement[];
    inputs.forEach((input) => {
      if (input.name) {
        if (input.value == "")
          empty.current = true;
        else if (input.type != "file")
          informations.current = { ...informations.current, [input.name]: input.value }
        else if (input.files != null && input.type == "file")
          informations.current = { ...informations.current, [input.name]: input.files[0] }
      }
    })
    if (empty.current) {
      empty.current = false;
      notify("Some Fields Is Empty!");
      setTimeout(() => {
        notify("")
      }, 3000)
    }
    else {
      setData(informations.current);
    }
  }
  return (
    <AuthenticationForm>
      <form onSubmit={sendData} action="">
        <div className="title">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="fields">
          {
            inputs.map((input, index) => {
              return (
                <div className="field" key={index}>
                  <label htmlFor={`id${index}`}>{input.label}{input.label == "Photo" && <img src={photo} alt="" />}</label>
                  <input onChange={(event) => { input.type == "file" && event.target.files != null ? setPhoto(URL.createObjectURL(event.target.files[0])) : "" }} id={`id${index}`} style={{ display: `${input.type == "file" ? "none" : "block"}` }} type={input.type} placeholder={input.placeholder ? input.placeholder : ""} name={input.name} />
                </div>
              )
            })
          }
        </div>
        <div className="foot">
          <button type="submit">{btn} {notification == "loading" && <span className="spin"></span>}</button>
          <p>{footing.text}<Link to={footing.path}>{footing.link}</Link></p>
        </div>
      </form>
    </AuthenticationForm>
  )
}

export default AuthForm
