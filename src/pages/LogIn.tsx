import axios from "axios"
import { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { type AuthInputs, type LogInData } from ".."
import AuthForm from "../components/AuthForm"
import Notification from "../components/Notification"

const Log = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 70px;
  @media screen and (max-width : 992px) {
    padding: 0 20px;
  }
`
const LogIn = () => {
  const navigate = useNavigate();
  const [notify, showNotify] = useState<string>("");
  const [logInData, setData] = useState<LogInData>({ email: "", password: "" })
  const logInInputs: Array<AuthInputs> =
    [
      {
        label: "Email Address",
        placeholder: "Email Address",
        type: "email",
        name: "email",
      },
      {
        label: "Password",
        placeholder: "Password",
        type: "password",
        name: "password",
      }
    ]
  async function sendData() {
    if (logInData.email != "" && logInData.password != "") {
      await axios.post("https://vica.website/api/login", logInData, {
        headers: {
          "Accept": "application/json"
        }
      })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("firstSign", "LogIn Done Successfully!");
          localStorage.setItem("user", JSON.stringify(res.data.user))
          navigate("/dashboard");
        })
        .catch(error => {
          showNotify(error.response.data.msg);
          setTimeout(() => {
            showNotify("");
          }, 3000)
        })
    }
  }
  useEffect(() => {
    if (localStorage.getItem("logout")) {
      showNotify(`${localStorage.getItem("logout")}`);
      setTimeout(() => {
        showNotify("");
        localStorage.removeItem("logout");
      }, 3000)
    }

  }, [])
  useEffect(() => {
    sendData();
  }, [logInData])
  return (
    <Log>
      {notify != "" && notify != "loading" && notify != `${localStorage.getItem("logout")}` && <Notification icon={<IoMdInformationCircleOutline />} text={notify} color="255,23,32" opacity="30%" duration={3} close={showNotify} />}
      {notify != "" && notify != "loading" && notify == `${localStorage.getItem("logout")}` && <Notification icon={<FaCheck />} text={notify} color="0,128,0" opacity="30%" duration={3} close={showNotify} />}
      <AuthForm notification={notify} notify={showNotify} data={logInData} setData={setData} title="Log In To 
      Your Account" description="Please Enter Your Email And Password to continue!" inputs={logInInputs} btn="LogIn" footing={{ text: "Dont Have an Account?", link: "Create An Account", path: "/" }} />
    </Log>
  )
}

export default LogIn
