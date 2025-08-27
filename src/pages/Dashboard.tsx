import { createContext, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaCheck, FaListUl } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { GoSun } from "react-icons/go";
import { HiBars3 } from "react-icons/hi2";
import { IoMoonOutline, IoSearchSharp } from "react-icons/io5";
import { RiShutDownLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Confirmation from "../components/Confirmation";
import Notification from "../components/Notification";


export const SearchValue = createContext<{ search: string, setSearch: Dispatch<SetStateAction<string>> } | null>(null);
const DashboardPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: var(--bg1);
  transition: 0.4s;
  >aside {
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    .user-info-mobile {
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        color: var(--text);
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        .user {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          span {
            font-size: 14px;
            color: gray;
          }
        }
        >span {
          display: block;
          width: 2px;
          height: 30px;
          transform: rotate(90deg);
          background-color: var(--text);
        }
        .dark-light {
          width: 40px;
          height: 40px;
          font-size: 28px;
          position: relative;
          .mode {
            position: absolute;
            top: 15%;
            left: 15%;
            cursor: pointer;
          }
        }
      }
    .top {
      h1 {
        color: var(--text);
        font-size: 32px;
        margin:20px 20px 80px;
        >span {
          color: #00a2ff;
        }
      }
      .items {
        margin: 20px;
        .link {
          color: var(--text);
          margin: 20px 0;
          text-decoration: none;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 14px;
          .item-icon {
            font-size: 24px;
          }
        }
      }
    }
    button {
      margin: 20px;
      width: 160px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 14px;
      border: none;
      color: #fff;
      background-color: #00a2ff;
      border-radius: 12px;
      font-size: 18px;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.04);
      }
    }
  }
  .big-aside {
    width: 20%;
    min-height: 100vh;
    display: flex !important;
  }
  .small-aside {
    width: 100%;
    background-color: var(--bg1);
    min-height: calc(100vh - 70px);
    display: none !important;
  }
  >.right {
    transition: 0.4s;
    width: 80%;
    min-height: 100vh;
    .products-page {
      transition: 0.4s;
      padding: 20px;
      height: calc(100% - 70px);
      background-color: var(--bg2);
      color: var(--text);
    }
    nav {
      transition: 0.4s;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      .search {
        flex-grow: 1;
        max-width: 300px;
        position: relative;
        .search-icon {
          font-size: 18px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 20px;
          color: gray;
        }
        input {
          width: 100%;
          border: 1px solid gray;
          padding-left: 60px;
          height: 40px;
          background-color: var(--search);
          border-radius: 18px;
          outline: none;
        }
      }
      .user-info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        color: var(--text);
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        .user {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          span {
            font-size: 14px;
            color: gray;
          }
        }
        >span {
          display: block;
          width: 2px;
          height: 30px;
          background-color: var(--text);
        }
        .dark-light {
          width: 40px;
          height: 40px;
          font-size: 28px;
          position: relative;
          .mode {
            position: absolute;
            top: 20%;
            left: 20%;
            cursor: pointer;
            
          }
        }
      }
      .open-close {
        width: 40px;
        height: 40px;
        position: relative;
        display: none;
        .bars , .cross {    
        font-size: 24px;
        color: var(--text);
        position: absolute;
        top: 20%;
        left: 20%;
        transition: 0.3s;
        &:hover {
          transform: scale(1.04);
          }
        }
      }
    }
  }
  @media screen and (max-width : 992px) {
    .small-aside {
      display: flex !important;
      position: absolute;
      top: 70px;
      left: 0;
      z-index: 900;
    }
    .big-aside {
      display: none !important;
    }
    >.right {
      width: 100%;
      nav {
        gap: 20px;
      .user-info {
        display: none;
        }
        .open-close {
          display: block;
        }
      }
    }
  }
`


const Dashboard = () => {
  const [search, setSearch] = useState<string>("");
  const [notify, showNotify] = useState<string>("");
  const [showAside, setShowAside] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const user = useRef<{ email: string, first_name: string, last_name: string, profile_image_url: string, user_name: string }>(JSON.parse(`${localStorage.getItem("user")}`))
  const navigate = useNavigate();
  async function logOut() {
    // axios.post("https://vica.website/api/logout", {}, {
    //   headers: {
    //     "Accept": "application/json",
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //   }
    // }).then(res => {
    //     console.log(res);
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     localStorage.setItem("logout", "You Have Been Logged out Successfully!");
    //     showNotify("");
    //     navigate("/login");
    // })
    await fetch("https://vica.website/api/logout", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem("firstSign");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.setItem("logout", "You Have Been Logged out Successfully!");
        showNotify("");
        navigate("/login");
      }
      else {
        throw new Error("Sorry...An Error Has Happened!")
      }
    })
  }
  useEffect(() => {
    !localStorage.getItem("token") && navigate("/");
    if (localStorage.getItem("firstSign")) {
      showNotify(`${localStorage.getItem("firstSign")}`);
      setTimeout(() => {
        showNotify("");
      }, 3000)
      setTimeout(() => {
        showNotify(`Hi, ${user.current.first_name} ${user.current.last_name} 😁👋🏻`)
      }, 5000);
      setTimeout(() => {
        showNotify("");
        localStorage.removeItem("firstSign");
      }, 8000);
    }
    else {
      showNotify(`Hi, ${user.current.first_name} ${user.current.last_name} 😁👋🏻`);
      setTimeout(() => {
        showNotify("");
      }, 3000)
    }
  }, [])

  if (user.current != null)
    return (
      <SearchValue.Provider value={{ search, setSearch }}>
        <DashboardPage className={`${localStorage.getItem("mode") == "dark" && "dark"}`}>
          {notify != "" && <Notification icon={<FaCheck />} text={notify} color="0,128,0" opacity="30%" duration={3} close={showNotify} />}
          {confirm && <Confirmation close={setConfirm} text="Do You Want To Logout?" performFunction={logOut} />}
          <aside style={{ transform: `translateX(${showAside ? "0" : "-100%"})`, transitionDuration: "0.4s" }} onClick={() => { setShowAside(false) }} className="small-aside">
            <div className="top">
              <h1><span>Dash</span>Stack</h1>
              <div className="user-info-mobile">
                <img src={user.current.profile_image_url} alt="" />
                <div className="user">
                  {user.current.first_name} {user.current.last_name}
                  <span>{user.current.user_name}</span>
                </div>
                <span></span>
                <div className="dark-light">
                  <IoMoonOutline className="mode" style={{ transitionDuration: "0.4s", transform: `scale(${localStorage.getItem("mode") == "dark" ? "0" : "1"})` }} onClick={() => { setMode(!mode); localStorage.setItem("mode", "dark") }} />
                  <GoSun className="mode" style={{ transitionDuration: "0.4s", transform: `scale(${localStorage.getItem("mode") == "dark" ? "1" : "0"})` }} onClick={() => { setMode(!mode); localStorage.setItem("mode", "light") }} />
                </div>
              </div>
              <div className="items">
                <Link className="link" to="/dashboard">{<AiOutlineProduct className="item-icon" />}Products</Link>
                <Link className="link" to="/dashboard/favourites">{<FiHeart className="item-icon" />}Favourites</Link>
                <Link className="link" to="/dashboard/orderlist">{<FaListUl className="item-icon" />}Order List</Link>
              </div>
            </div>
            <button onClick={() => { setConfirm(true) }}>{<RiShutDownLine />} LogOut</button>
          </aside>
          <aside className="big-aside">
            <div className="top">
              <h1><span>Dash</span>Stack</h1>
              <div className="items">
                <Link className="link" to="/dashboard">{<AiOutlineProduct className="item-icon" />}Products</Link>
                <Link className="link" to="/dashboard/favourites">{<FiHeart className="item-icon" />}Favourites</Link>
                <Link className="link" to="/dashboard/orderlist">{<FaListUl className="item-icon" />}Order List</Link>
              </div>
            </div>
            <button onClick={() => setConfirm(true)}>{<RiShutDownLine />} LogOut</button>
          </aside>
          <div className="right">
            <nav>
              <div className="search">
                {<IoSearchSharp className="search-icon" />}
                <input onChange={(event) => { setSearch(`${event?.target.value}`) }} type="text" name="search_result" placeholder="Search a Product" />
              </div>
              <div className="user-info">
                <img src={user.current.profile_image_url} alt="" />
                <div className="user">
                  {user.current.first_name} {user.current.last_name}
                  <span>{user.current.user_name}</span>
                </div>
                <span></span>
                <div className="dark-light">
                  <IoMoonOutline className="mode" style={{ transitionDuration: "0.4s", transform: `scale(${localStorage.getItem("mode") == "dark" ? "0" : "1"})` }} onClick={() => { setMode(!mode); localStorage.setItem("mode", "dark") }} />
                  <GoSun className="mode" style={{ transitionDuration: "0.4s", transform: `scale(${localStorage.getItem("mode") == "dark" ? "1" : "0"})` }} onClick={() => { setMode(!mode); localStorage.setItem("mode", "light") }} />
                </div>
              </div>
              <div className="open-close">
                <HiBars3 style={{ transform: `scale(${showAside ? "0" : "1"})`, transitionDuration: "0.3s" }} onClick={() => setShowAside(true)} className="bars" />
                <RxCross1 style={{ transform: `scale(${showAside ? "1" : "0"})`, transitionDuration: "0.3s" }} onClick={() => setShowAside(false)} className="cross" />
              </div>
            </nav>
            <div className="products-page">
              <Outlet />
            </div>
          </div>
        </DashboardPage>
      </SearchValue.Provider>
    )
}

export default Dashboard
