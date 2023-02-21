import React,{useEffect,useState} from "react";
import RouteSelector from "../routeSelector/Routeselector";
import SeatSelection from "../SeatSelection/SeatSelection";
import PaymentTab from "../PaymentTab/PaymentTab";
import Transacton from "../Transactions/Transacton";
import "./RouteSelection.css";
import PaymentSelector from "../PaymentTab/PaymentSelector";
import Subscription from "../Subscription/Subscription";
import { useHistory } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import JJlogo from "../../images/JJTlogo.png";
import StripeContainer from "../PaymentTab/StripeContainer";
import axios from 'axios'
import jwt_decode from "jwt-decode";
import constants from "../../constant";
import truncateEthAddress from 'truncate-eth-address'
import Copy from '../../images/copy.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RouteSelection({ history }) {
  const handleUserIcon = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("reservedSeats");
    localStorage.removeItem("nameData");
    localStorage.clear();
    history.push("/");
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    history.push("/routes");
  };
  // const userData = (JSON.parse(localStorage.getItem('paymentData')));

  const [address, setAddress] = useState(null)
  const [userDoc, setUserDoc] = useState(null)

    useEffect(()=>{
      const getUserBalance = async()=>{
        try {
          const tok = sessionStorage.getItem('authToken')
          if(tok){
            const decoded = jwt_decode(tok)
            setUserDoc(decoded?.doc)
                  const getBalance = await axios.post(`${constants.baseURL}/token/balance`,{
                    userAddress:decoded.doc.publicKey
                  })
                  setAddress(getBalance?.data?.message);
          }
   
        } catch (error) {
          console.log(error.message);
        }
      }
      getUserBalance()
    },[])



  const copyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = userDoc?.publicKey;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    // setCopied(true);


    toast.success('Copied!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };


  return (
    <div className="container">
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div>
        <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
          <div
            style={{
              textalign: "center",
              position: "absolute",
              top: "1%",
              left: "35%",
              transform: "translate-50%, -9%",

              zindex: "1000",
            }}
          >
            <span
              style={{
                color: "white",
                fontFamily: "Piedra, cursive",
                letterSpacing: "10px",
                marginbottom: "20px",

                borderradius: "5px",
                position: "relative",
                animation: "text 3s 1",
              }}
            >
              <a
                href="/"
                className="navbar-brand Company-Log"
                onClick={(e) => handleLogoClick(e)}
              >
                <h2 style={{ fontSize: "60px" }}> LetsBuild</h2>
              </a>
            </span>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-3"
            aria-controls="navbarSupportedContent-3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-3"
          >
            <ul className="navbar-nav ml-auto nav-flex-icons ic">
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={(e) => handleUserIcon(e)}
                >
                  <i className="fa fa-user user"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={(e) => handleSignOut(e)}
                >
                  Sign-Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div>
        <div className="flex-container-duplicate">
          <ul
            className="nav nav-pills" 
            style={{ display: "flex", width: "50%"}}
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                style={{ color: "#fff" }}
                data-toggle="pill"
                href="#licenseplan"
              >
                License Plan
              </a>
            </li>

            
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="pill"
                href="#menu3"
                style={{ color: "#fff" }}
              >
                Transactions
              </a>
            </li>
          </ul>
          <div>
            <div className="flex-second-container">
              <img src={JJlogo} alt="logo" style={{width:'50px',marginLeft:"20px"}}/>
            <div>
           <p className="blue right"> UserAddress: <span className="address black"> {userDoc?.publicKey && truncateEthAddress(userDoc?.publicKey)}</span> 
           <span onClick={copyToClipboard}>
            <img src={Copy} alt="copyClipboard" style={{width:'20px',cursor:'pointer',marginLeft:'5px'}}/>
           </span>
           </p>
           <p className="jjtToken right"> {address}JJT 
           {/* (<span>{userDoc?.amount && parseFloat(userDoc?.amount)?.toFixed(2)}$</span>) */}
           </p>
            </div>
            
            </div>
          </div>
          
        </div>

        <div className="tab-content">
          <div className="tab-pane container active mn-box" id="licenseplan">
            <Subscription />
          </div>
          <div className="tab-pane container fade mn-box" id="menu1">
            <SeatSelection />
          </div>
          <div className="tab-pane container fade mn-box" id="menu2">
            <PaymentTab />
          </div>
          <div className="tab-pane container fade mn-box" id="menu2">
            <StripeContainer />
          </div>
          <div className="tab-pane container fade mn-box" id="menu3">
            <Transacton />
          </div>
        </div>
      </div>
    </div>
  );
}
