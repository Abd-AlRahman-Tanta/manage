import { memo, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { IoMdClose } from "react-icons/io"
import styled from "styled-components"

const Notificating = styled.div`
width: 300px;
min-height: 50px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 8px;
position: fixed;
right: 20px;
background-color: white;
overflow: hidden;
z-index: 1000;
.x {
  position: absolute;
  top: 8px;
  right: 8px;
  color: gray;
  font-size: 18px;
  cursor: pointer;
}
.line-container {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 5px;
  .line {
    width: 100%;
    height: 100%;
  }
}
.rectangle {
  margin: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .icon {
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: end;
  }
  p {
    font-size: 14px;
  }
}
@media screen and (max-width : 992px) {
  width: 200px;
  right: calc(50% - 100px);
}
`
const Notification = ({ text, icon, color, opacity, duration, close }: { text: string, icon: ReactNode, color: string, opacity: string, duration: number, close: Dispatch<SetStateAction<string>> }) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 100)
  }, [])
  return (
    <Notificating style={{ opacity: `${show ? "100%" : "0%"}`, transform: `translateY(${show ? "0" : "-100%"})`, top: `${show ? "20px" : "-20px"}`, transitionDuration: "0.8s" }}>
      <IoMdClose onClick={() => close("")} className="x" />
      <div style={{ backgroundColor: `rgba(${color},${opacity})` }} className="line-container">
        <div style={{ backgroundColor: `rgb(${color})`, width: `${show ? "0" : "100%"}`, transition: `${duration}s`, transitionDelay: "200ms" }} className="line"></div>
      </div>
      <div className="rectangle">
        <div style={{ color: `rgb(${color})` }} className="icon">{icon}</div>
        <p>{text}</p>
      </div>
    </Notificating>
  )
}

export default memo(Notification)
