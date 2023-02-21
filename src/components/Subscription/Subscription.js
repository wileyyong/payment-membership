/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { Grid, Box, Typography, Card, Button } from "@mui/material";
import Basic from "../../images/BasicLogo.png";
import Plus from "../../images/PlusLogo.png";
import Professional from "../../images/ProfessionalLogo.png";
import Premier from "../../images/PremierLogo.png";
import { useHistory } from "react-router-dom";
import PaymentSelector from "../PaymentTab/PaymentSelector";
import Done2 from "../../images/bluedone1.png";
import Switch from "@mui/material/Switch";
import moment from "moment";

import jwt_decode from 'jwt-decode'
import Axios from "axios";
import constants from "../../constant";

function Subscription() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [isAnnual, setIsAnnual] = React.useState(true)

  const [user, setUser] = React.useState({})

	// React.useEffect(() => {
	// 	const tok = sessionStorage.getItem('authToken')
	// 	const decoded = jwt_decode(tok)
	// 	setUser(decoded.doc)
	// }, [])

  const tok = sessionStorage.getItem('authToken')
  const decoded = jwt_decode(tok)
 React.useEffect(() => {
//    if(decoded){
//     setUser(decoded?.doc)
//     // console.log( JSON.parse(window.localStorage.getItem('paymentData')));
//     // return JSON.parse(window.localStorage.getItem('paymentData'))
   
//    }else{
//     setUser(JSON.parse(window.localStorage.getItem('paymentData')))
// //  return decoded?.doc
//    }

    const getData = async()=>{
      try {
        const {data} = await Axios.post(`${constants.baseURL}/get-user`,{
            userId:JSON.parse(window.localStorage.getItem('paymentData'))._id
          })
          setUser(data?.data);
        } catch (error) {
          console.log(error);
        }
      }
      if (window.localStorage.getItem('paymentData')) {
        getData()
      }
    }, [])

  // console.log(user);


  const billingtypeChange = (event) => {
    setIsAnnual(event.target.checked);
  };

  

  let history = useHistory();
  return (
    <>
   {

   user?.membership?
<div>

<Box mb={"-55px"}  mt={"16px"} mr={2.4}> 
    <Grid item display="flex" justifyContent="flex-end" alignItems={"center"}  >
      <Typography
        fontSize="14px"
        textAlign="center"
        color="black"
      >
        Billing Type : &nbsp; 
      </Typography>
      <Typography
        fontSize="14px"
        textAlign="center"
        color="black"
      >
        Monthly 
      </Typography>

      <Switch {...label} checked={isAnnual} onChange={billingtypeChange} color="default" sx={{width:"50px", display:"flex" , alignItems:"center", }} mt="-20px" />
      &nbsp;  &nbsp;&nbsp;
      <Typography
        fontSize="14px"
        textAlign="center"
        color="black"
      >
        Annual
      </Typography>
    </Grid>
    </Box>

      <Grid
        container
        display="flex"
        justifyContent="center"
        alignContent="center"
      >
        <Grid item mt={5} p={1}>
          <Card
            sx={{
              backgroundColor: "#fff",
              width: "260PX",
              height: "600PX",
              border: "1px solid Gray",
            }}
          >
            <Grid item display="flex" justifyContent="center" mt={3}>
              <img src={Basic} style={{ width: "70px" }} />
            </Grid>
            <Typography
              variant="h3"
              color="#0e1724"
              textAlign="center"
              fontSize="1.5rem"
              fontWeight="400"
              fontFamily="Roboto,Helvetica,Neue,sans-serif"
              mt={0}
            >
              Basic
            </Typography>
            <Box display={"flex"} justifyContent="center" mt={1}>
              <Grid container width={"55%"}>
                <Grid md={1} item>
                  <Typography fontWeight={"bold"}>$</Typography>
                </Grid>
                <Grid md={6} item>
                  <Typography fontSize="34px" fontWeight={"bold"}>
                    {
                      isAnnual &&  4.50.toFixed(2)
                    }
                    {
                      !isAnnual && 4.99.toFixed(2)
                    }
                  </Typography>
                </Grid>
                <Grid md={5} paddingTop={2} item>
                  <Typography fontWeight={"bold"}>/month</Typography>
                </Grid>
              </Grid>
            </Box>
            { isAnnual ? <>
            <Grid item>
              <Typography
                fontSize="16px"
                fontWeight={"bold"}
                textAlign="center"
              >
                $54.00 billed annually
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                fontSize="18 px"
                color="#5dc26a"
                textAlign="center"
                fontWeight={"bold"}
                mt={1}
              >
                You save $5.88
              </Typography>
            </Grid>


            </>:
            <div style={{height:'55px'}}>
            <Grid></Grid>
            <Grid></Grid>
            </div>
          
          }
            <Grid item display="flex" justifyContent="center" mt={1}>
              <Button
                sx={{
                  width: "90%",
                  backgroundColor: 
                  user?.membership?.name==="Basic"? "white" : "grey",
                  color: user?.membership?.name==="Basic"?"black":"white",
                  fontwwight: "700",
                  border:user?.membership?.name==="Basic"?"1px solid black": "1px solid none",
                  cursor: "pointer",
                  marginTop: "10px",
                  "&:hover": { backgroundColor: 
                    user?.membership?.name==="Basic"? "#007fed" : "grey" },
                }}
                onClick={() => {
                  if (!(user.membership && (user.membership.month === 4.99 || user.membership.annual === 4.5))) {
                    localStorage.setItem("licenseplan", JSON.stringify("basic"))
                    localStorage.setItem("isannual", isAnnual)
                    history.push(`/payment`)
                  }
                }}
                disabled={
                  user?.membership?.name==="Basic"
                }
              >
                <Typography textTransform="none" fontwwight={"bold"} style={{color:user?.membership?.name==="Basic"?"black": "white"}}>
              

                  { !user.membership && "Upgrade" }
                  {
                    user?.membership?.name==="Basic"?"":
                  

                   user.membership && (user.membership.month > 4.99 || user.membership.annual > 4.5)  && "Downgrade" }
                 
                  {
        user?.membership?.name==="Basic" && <span style={{display:'inline-flex'}}>   Renew on &nbsp; {moment(user?.renew).format("DD-MM-YYYY") }  </span>
}


                </Typography>
              </Button>
            </Grid>
            
            <Grid ml={1} item>
              <Typography
                ml={4}
                mt={3}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                50 Bids per month
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
                alt="imagea"
              />

              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                50 Skils
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Unlock Rewards
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                12 Free Sealed
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Preferred Freelancer Eligible*
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Custom Cover Photo
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
            </Grid>
          </Card>
        </Grid>
        <Grid item mt={5} p={1}>
          <Card
            sx={{
              backgroundColor: "#fff",
              width: "260PX",
              height: "600PX",
              border: "1px solid Gray",
            }}
          >
            <Grid item display="flex" justifyContent="center" mt={3}>
              <img src={Plus} style={{ width: "70px" }} />
            </Grid>
            <Typography
              variant="h3"
              color="#0e1724"
              textAlign="center"
              fontSize="1.5rem"
              fontWeight="400"
              fontFamily="Roboto,Helvetica,Neue,sans-serif"
              textTransform="none"
              mt={0}
            >
              Plus
            </Typography>
            <Box display={"flex"} justifyContent="center" mt={1}>
              <Grid container width={"55%"}>
                <Grid md={1} item>
                  <Typography fontWeight={"bold"}>$</Typography>
                </Grid>
                <Grid md={6} item>
                  <Typography fontSize="34px" fontWeight={"bold"}>
                    {
                      isAnnual &&  8.90.toFixed(2)
                    }
                    {
                      !isAnnual && 9.99.toFixed(2)
                    }
                  </Typography>
                </Grid>
                <Grid md={5} paddingTop={2} item>
                  <Typography fontWeight={"bold"}>/month</Typography>
                </Grid>
              </Grid>
            </Box>
            { isAnnual ? <>
            <Grid item>
              <Typography
                fontSize="16px"
                fontWeight={"bold"}
                textAlign="center"
              >
                $106.80 billed annually
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                fontSize="18 px"
                color="#5dc26a"
                textAlign="center"
                fontWeight={"bold"}
                mt={1}
              >
                You save $13.08
              </Typography>
            </Grid>
            </> :
            <div style={{height:'55px'}}>
            <Grid></Grid>
            <Grid></Grid>
            </div>
            
            }
            <Grid item>
              <Grid item display="flex" justifyContent="center" mt={1}>
                <Button
                  sx={{
                    width: "90%",
                    backgroundColor:
                    
                    user?.membership?.name==="Plus"?"white":
                    user.membership && (user.membership.month < 9.99 || user.membership.annual < 8.9)  && "#5dc26a" ||
                    user.membership && (user.membership.month > 9.99 || user.membership.annual > 8.9)  && "grey" 
                    ,
                    color: user?.membership?.name==="Plus"?"black":"white",
                    fontwwight: "700",
                    border:user?.membership?.name==="Plus"?"1px solid black": "1px solid none",
                    cursor: "pointer",
                    marginTop: "10px",
                    "&:hover": { backgroundColor: 
                      user?.membership?.name==="Plus"?"#007fed":
                      user.membership && (user.membership.month < 9.99 || user.membership.annual < 8.9)  && "#5dc26a" ||
                      user.membership && (user.membership.month > 9.99 || user.membership.annual > 8.9)  && "grey" 
                    },
                  }}
                  // onClick={() => history.push(`/payment?plan=plus&isAnnual=${isAnnual}`)}
                  onClick={() => {
                    if (!(user.membership && (user.membership.month === 9.99 || user.membership.annual === 8.9))) {
                      localStorage.setItem("licenseplan", JSON.stringify("plus"))
                      localStorage.setItem("isannual", isAnnual)
                      history.push(`/payment`)
                    }
                  }}
                  disabled={
                    user?.membership?.name==="Plus"
                  }
                >
                  <Typography textTransform="none" fontwwight={"bold"} style={{color:user?.membership?.name==="Plus"?"black": "white"}}>
                    { !user.membership && "Start Free Trial" }
                  
                    {/* { user.membership && (user.membership.month === 9.99 || user.membership.annual === 8.9)  && "Current Plan" } */}
                    {
                    user?.membership?.name==="Plus"?"":
                     user.membership && (user.membership.month < 9.99 || user.membership.annual < 8.9)  && "Upgrade" ||
                     user.membership && (user.membership.month > 9.99 || user.membership.annual > 8.9)  && "Downgrade" 

                  }
             {
        user?.membership?.name==="Plus" && <span style={{display:'inline-flex'}}>   Renew on &nbsp; {moment(user?.renew).format("DD-MM-YYYY") }  </span>
}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid ml={1} item>
              <Typography
                ml={4}
                mt={3}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                50 Bids per month
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />

              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                50 Skils
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Unlock Rewards
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                12 Free Sealed
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />

              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Custom Cover Photo
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                5 Free Highlighted
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                25 Free Sealed
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Free Project Extensions
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
            </Grid>
          </Card>
        </Grid>
        <Grid item mt={5} p={1}>
          <Card
            sx={{
              backgroundColor: "#fff",
              width: "260PX",
              height: "600PX",
              border: "1px solid Gray",
            }}
          >
            <Grid item display="flex" justifyContent="center" mt={3}>
              <img src={Professional} style={{ width: "70px" }} />
            </Grid>
            <Typography
              variant="h3"
              color="#0e1724"
              textAlign="center"
              fontSize="1.5rem"
              fontWeight="400"
              fontFamily="Roboto,Helvetica,Neue,sans-serif"
              mt={0}
            >
              Professional
            </Typography>
            <Box display={"flex"} justifyContent="center" mt={1}>
              <Grid container width={"70%"}>
                <Grid md={1} item>
                  <Typography fontWeight={"bold"}>$</Typography>
                </Grid>
                <Grid md={6} item>
                  <Typography fontSize="34px" fontWeight={"bold"}>
                    {
                      isAnnual &&  39.90.toFixed(2)
                    }
                    {
                      !isAnnual && 49.00.toFixed(2)
                    }
                  </Typography>
                  
                </Grid>
                <Grid md={5} paddingTop={2} item>
                  <Typography fontWeight={"bold"}>/month</Typography>
                </Grid>
              </Grid>
            </Box>
            { isAnnual ? <>
            <Grid item>
              <Typography
                fontSize="16px"
                fontWeight={"bold"}
                textAlign="center"
              >
                $478.80 billed annually
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                fontSize="18 px"
                color="#5dc26a"
                textAlign="center"
                fontWeight={"bold"}
                mt={1}
              >
                You save $109.20
              </Typography>
            </Grid>
            </> :
            <div style={{height:'55px'}}>
            <Grid></Grid>
            <Grid></Grid>
            </div>
            
            }
            <Grid item display="flex" justifyContent="center" mt={1}>
              <Button
                sx={{
                  width: "90%",
                  backgroundColor:
                  user?.membership?.name==="Professional"?"white":
                  (!user.membership || (user.membership && (user.membership.month < 49.0 || user.membership.annual < 39.9))) && "#5dc26a" ||
                  user.membership && (user.membership.month > 49.0 || user.membership.annual > 39.9)  && "grey" 
                  ,
                  color: user?.membership?.name==="Professional"?"black":"white",
                  fontwwight: "700",
                  border:user?.membership?.name==="Professionl"?"1px solid black": "1px solid none",
                  cursor: "pointer",
                  marginTop: "10px",
                  "&:hover": { backgroundColor: 
                    user?.membership?.name==="Professional"?"#007fed":
                    (!user.membership || (user.membership && (user.membership.month < 49.0 || user.membership.annual < 39.9))) && "#5dc26a" ||
                    user.membership && (user.membership.month > 49.0 || user.membership.annual > 39.9)  && "grey" 
                  },
                }}
                // onClick={() => history.push(`/payment?plan=professional&isAnnual=${isAnnual}`)}
                onClick={() => {
                  if (!(user.membership && (user.membership.month === 49.0 || user.membership.annual === 39.9))) {
                    localStorage.setItem("licenseplan", JSON.stringify("professional"))
                    localStorage.setItem("isannual", isAnnual)
                    history.push(`/payment`)
                  }
                }}
                disabled={
                  user?.membership?.name==="Professional"
                }
              >
                <Typography textTransform="none" fontwwight={"bold"} style={{color:user?.membership?.name==="Professional"?"black": "white",}}>
                 
                  {/* { user.membership && (user.membership.month === 49.0 || user.membership.annual === 39.9)  && "Current Plan" } */}
                  {
                    user?.membership?.name==="Professional"?"":
                     (!user.membership || (user.membership && (user.membership.month < 49.0 || user.membership.annual < 39.9))) && "Upgrade" ||
                     user.membership && (user.membership.month > 49.0 || user.membership.annual > 39.9)  && "Downgrade" 

                  }
{
        user?.membership?.name==="Professional" && <span style={{display:'inline-flex'}}>   Renew on &nbsp; {moment(user?.renew).format("DD-MM-YYYY") }  </span>
}
                  
                </Typography>
              </Button>
            </Grid>
            
            <Grid ml={1} item>
              <Typography
                ml={4}
                mt={3}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                50 Bids per month
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />

              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                50 Skils
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Unlock Rewards
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                12 Free Sealed
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Preferred Freelancer Eligible*
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Custom Cover Photo
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
            </Grid>
          </Card>
        </Grid>
        <Grid item mt={5} p={1}>
          <Card
            sx={{
              backgroundColor: "#fff",
              width: "260PX",
              height: "600PX",
              border: "1px solid Gray",
            }}
          >
            <Grid item display="flex" justifyContent="center" mt={3}>
              <img src={Premier} style={{ width: "70px" }} />
            </Grid>
            <Typography
              variant="h3"
              color="#0e1724"
              textAlign="center"
              fontSize="1.5rem"
              fontWeight="400"
              fontFamily="Roboto,Helvetica,Neue,sans-serif"
              textTransform="none"
              mt={0}
            >
              Premier
            </Typography>
            <Box display={"flex"} justifyContent="center" mt={1}>
              <Grid container width={"70%"}>
                <Grid md={1} item>
                  <Typography fontWeight={"bold"}>$</Typography>
                </Grid>
                <Grid md={6} item>
                  <Typography fontSize="34px" fontWeight={"bold"}>
                    {
                      isAnnual &&  79.90.toFixed(2)
                    }
                    {
                      !isAnnual && 99.00.toFixed(2)
                    }
                  </Typography>
                </Grid>
                <Grid md={5} paddingTop={2} item>
                  <Typography fontWeight={"bold"}>/month</Typography>
                </Grid>
              </Grid>
            </Box>
            { isAnnual ? <>
            <Grid item>
              <Typography
                fontSize="16px"
                fontWeight={"bold"}
                textAlign="center"
              >
                $958.80 billed annually
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                fontSize="18 px"
                color="#5dc26a"
                textAlign="center"
                fontWeight={"bold"}
                mt={1}
              >
                You save $229.20
              </Typography>
            </Grid>
            </> :
            <div style={{height:'55px'}}>
            <Grid></Grid>
            <Grid></Grid>
            </div>
            }
            <Grid item>
              <Grid item display="flex" justifyContent="center" mt={1}>
                <Button
                
                  sx={{
                    width: "90%",
                    backgroundColor: 
                    user?.membership?.name==="Premier"?"white":
                    (!user.membership || (user.membership && (user.membership.month < 99.0 || user.membership.annual < 79.9))) && "#5dc26a" ||
                    user.membership && (user.membership.month > 99.0 || user.membership.annual > 79.9)  && "grey" 
                    
                    ,
                   
                    fontwwight: "700",
                    border:user?.membership?.name==="Premier"?"2px solid black": "1px solid none",
                    cursor: "pointer",
                    marginTop: "10px",
                    "&:hover": { backgroundColor: 
                      user?.membership?.name==="Premier"?"#007fed":
                      (!user.membership || (user.membership && (user.membership.month < 99.0 || user.membership.annual < 79.9))) && "#5dc26a" ||
                      user.membership && (user.membership.month > 99.0 || user.membership.annual > 79.9)  && "grey"
                    
                    },
                  }}
                  // onClick={() => history.push(`/payment?plan=premier&isAnnual=${isAnnual}`)}
                  onClick={() => {
                    if (!(user.membership && (user.membership.month === 99.0 || user.membership.annual === 79.9))) {
                      localStorage.setItem("licenseplan", JSON.stringify("premier"))
                      localStorage.setItem("isannual", isAnnual)
                      history.push(`/payment`)
                    }
                  }}
                  disabled={
                    user?.membership?.name==="Premier"
                  }
                >
                  <Typography textTransform="none" fontwwight={"bold"} style={{color:user?.membership?.name==="Premier"?"black":"white"}}>
                  
                    {/* { user.membership && (user.membership.month === 99.0 || user.membership.annual === 79.9)  && "Current Plan" } */}
                    {
                    user?.membership?.name==="Premier"?" ":
                    (!user.membership || (user.membership && (user.membership.month < 99.0 || user.membership.annual < 79.9))) && "Upgrade" ||
                    user.membership && (user.membership.month > 99.0 || user.membership.annual > 79.9)  && "Downgrade" 

                  }
                     

{
        user?.membership?.name==="Premier" && <span style={{display:'inline-flex'}}>   Renew on &nbsp; {moment(user?.renew).format("DD-MM-YYYY") }  </span>
}

                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid ml={1} item>
              <Typography
                ml={4}
                mt={3}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                50 Bids per month
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />

              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                50 Skils
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Unlock Rewards
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                12 Free Sealed
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />

              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Custom Cover Photo
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                5 Free Highlighted
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                25 Free Sealed
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
              <Typography
                ml={4}
                mt={-2}
                color="#0e1724"
                fontFamily="sans-serif"
                fontSize="16px"
                fontWeight={"bold"}
              >
                Free Project Extensions
              </Typography>

              <img
                src={Done2}
                style={{ width: "15px", marginTop: -53, marginLeft: 13 }}
              />
            </Grid>
          </Card>
        </Grid>
      </Grid>
</div>
    :
<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'50%'}}>

  <h1 style={{textAlign:'center'}}>
    Loading....
  </h1>
</div>

   }

    </>
  );
}

export default Subscription;
