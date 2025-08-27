import axios from "axios"
import { useEffect, useState } from "react"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { type AuthInputs, type SignInData } from ".."
import AuthForm from "../components/AuthForm"
import Notification from "../components/Notification"

const Sign = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 70px;
  @media screen and (max-width : 992px) {
    padding: 0 20px;
  }
`
const SignUp = () => {
  const navigate = useNavigate();
  const [notify, showNotify] = useState<string>("");
  const [signInData, setData] = useState<SignInData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: null
  })
  let signUpInputs: Array<AuthInputs> =
    [
      {
        label: "First Name",
        placeholder: "First Name",
        type: "text",
        name: "first_name",
      },
      {
        label: "Last Name",
        placeholder: "Last Name",
        type: "text",
        name: "last_name",
      },
      {
        label: "User Name",
        placeholder: "User Name",
        type: "text",
        name: "user_name",
      },
      {
        label: "Email",
        placeholder: "Email",
        type: "email",
        name: "email",
      },
      {
        label: "Password",
        placeholder: "Password",
        type: "password",
        name: "password",
      },
      {
        label: "Password Confirmation",
        placeholder: "Password Confirmation",
        type: "password",
        name: "password_confirmation",
      },
      {
        label: "Photo",
        type: "file",
        name: "profile_image",
      }
    ]
  async function sendData() {
    if (signInData.email != "" && signInData.first_name != "" && signInData.last_name != "" && signInData.password != "" && signInData.password_confirmation != "" && signInData.profile_image != null && signInData.user_name != "") {
      await axios.post("https://vica.website/api/register", signInData, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("firstSign", "Account Created Successfully!");
          localStorage.setItem("user", JSON.stringify(res.data.data.user))
          navigate("/dashboard");
        })
        .catch(error => {
          showNotify(error.response.data.message);
          setTimeout(() => {
            showNotify("");
          }, 3000)
        })
    }
  }

  useEffect(() => {
    sendData();
  }, [signInData])
  return (
    <Sign>
      {notify != "" && notify != "loading" && <Notification icon={<IoMdInformationCircleOutline />} text={notify} color="255,23,32" opacity="30%" duration={3} close={showNotify} />}
      <AuthForm notification={notify} notify={showNotify} data={signInData} setData={setData} title="Create An Account" description="create an account to continue!" inputs={signUpInputs} btn="SignUp" footing={{ text: "Already Have an Account?", link: "LogIn", path: "/login" }} />
    </Sign>
  )
}

export default SignUp
