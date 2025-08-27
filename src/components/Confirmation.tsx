import styled from "styled-components"
import type { ConfirmationProps } from ".."

const Confirm = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 2000;
  transform: translateX(-50%);
  background-color: var(--bg3);
  width: 100%;
  height: 100%;
  padding: 10px;
  .content {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    background-color: var(--bg1);
    color: var(--text);
    text-align: center;
    padding: 20px;
    transition: 0.4s;
    border-radius: 12px;
    >div {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }
  >div button:first-child {
    width: 160px;
    height: 40px;
    cursor: pointer;
    background-color: var(--text);
    color: var(--bg1);
    border-radius: 12px;
    border: none;
    transition: 0.4s

  }
  >div button:last-child {
    width: 160px;
    height: 40px;
    cursor: pointer;
    background-color: red;
    color: white;
    border-radius: 12px;
    border: none;
    transition: 0.4s

  }
  }
  
  @media screen and (max-width : 992px){
    .content {
      >div {
      flex-direction: column;
    }
    }
  }
`
const Confirmation = ({ text, performFunction, close }: ConfirmationProps) => {
  return (
    <Confirm>
      <div className="content">
        <p>{text}</p>
        <div>
          <button onClick={() => close(false)}>No</button>
          <button onClick={performFunction}>Yes</button>
        </div>
      </div>
    </Confirm>
  )
}

export default Confirmation
