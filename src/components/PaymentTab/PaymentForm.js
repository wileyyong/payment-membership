import React, {useState, useEffect} from 'react'
import Card from "react-credit-cards";
import "./PaymentTab.css";
import jwt_decode from "jwt-decode";
import { CardElement, useElements, useStripe,Elements } from '@stripe/react-stripe-js'
import axios from 'axios'
// import { useToasts } from 'react-toast-notifications'
import constants from '../../constant';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import truncateEthAddress from 'truncate-eth-address'
import 'sweetalert2/src/sweetalert2.scss'
import { Link } from 'react-router-dom';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";


export function updateMembership(userId, name,paymentMethod,type,paidAmount) {
  let apiUrl = `${constants.baseURL}/membership/update`
  return axios.post(apiUrl, {
    userId: userId,
    membershipName: name,
    paymentMethod:paymentMethod,
    type:type,
    amount:paidAmount
  })
}

const createTransaction = (ccType, paidAmount,paymentMethod,userId) => {
  let apiUrl = `${constants.baseURL}/transaction/create`
  return axios.post(apiUrl, {
    ccType: ccType,
    paidAmount: paidAmount,
    paymentMethod:paymentMethod,
    user_id:userId
  })
}




const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#000" } 
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
}

export default function PaymentForm() {
  

  // const { addToast } = useToasts()
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const [userId, setUserId] = useState("")
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [issuer, setIssuer] = useState("")
  const [focused, setFocused] = useState("")
  const [formData, setFormData] = useState("")
  const [token, setToken] = useState("")
  const [paidDate, setPaidDate] = useState("")
  const [plan, setPlan] = useState("None")
  const [type, setType] = useState("Monthly")
  const [price, setPrice] = useState(0.0)
  const [tax, setTax] = useState(0.0)
  const [sum, setSum] = useState(0.0)
  const [clientSecret, setClientSecret] = useState(null)
  const [customer, setCustomer] = useState(null)

  const [cardType, setCardType] = useState("")

//   useEffect(()=>{
// const getData = async()=>{
// try {
//   const response = await axios.post("https://careful-turtleneck-shirt-fox.cyclic.app/payment/create")

//   setCustomer(response?.data?.customer);
//     setClientSecret(response?.data?.paymentIntent?.client_secret)
// } catch (error) {
//   console.log(error?.message);
// }
// }
// getData()
//   },[])

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(elements.getElement(CardElement));
    
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })

    console.log(paymentMethod);

    console.log('card', elements.getElement(CardElement));
  
    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);

      try {
        const {id} = paymentMethod
        const response = await axios.post(`${constants.baseURL}/payment`, {
          amount: price * 100,
          id: id
        })



        if (response.data.success) {
          console.log("Successful payment")
          setSuccess(true)
        }
      } catch (error) {
        console.log("Error", error)
      }
    } else {
      console.log(error.message)
    }
  }


  const handleCallback = ({ issuer }, isValid) => {
    if (isValid)
      setIssuer()
  }

  const handleInputFocus = ({ target }) => {
    setFocused(target.name)
  }

  const handleInputChange = ({ target },event) => {

  

    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setNumber(target.value)
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setExpiry(target.value)
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
      setCvc(target.value)
    }
    else if (target.name === "name") {
      setName(target.value)
    }

    setCardType(event.brand)
  };

  const handleChange = async (event) => {
    // console.log(elements);
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details

    setCardType(event.brand)
    // setDisabled(event.empty);
    // setError(event.error ? event.error.message : "");
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { issuer } = this.state;
  //   const formData = [...e.target.elements]
  //     .filter((d) => d.name)
  //     .reduce((acc, d) => {
  //       acc[d.name] = d.value;
  //       return acc;
  //     }, {});

  //   this.setState({ formData });
  //   this.form.reset();
  // };
  
  const moveToTicketPage = async (e) => {
   try {
    e.preventDefault()
  

    console.log(elements.getElement(CardElement),expiry);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
//       card:{
//         "number": number,
// "name": name,
// "expiry": expiry,
// "cvc": cvc,
// "issuer": issuer
//       }
    });

    console.log(error,'error');
    

   

//     setClientSecret(createIntent?.data?.client_secret)

//     const response = await stripe.confirmCardPayment(createIntent?.data?.client_secret,{
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name:"PrakashSparkz",
//           address:{
//             country:"IN"
//           }
//         }
//       },
//       client_secret:true
//     })
// console.log(response);

// const paymentProcess = await axios.post("https://careful-turtleneck-shirt-fox.cyclic.app/payment/process-payment",{
//   paymentMethodId:paymentMethod?.id,
//   amount:response?.paymentIntent?.amount,
//   currency:response?.paymentIntent?.currency
// })

// console.log(paymentProcess);

     if (!error) {
      console.log("Stripe 23 | token generated!",paymentMethod);

      try {
        

          setSuccess(true)

          createTransaction(cardType, sum,paymentMethod,userId)
            .then(response => response.data)
            .then(data => {
              console.log('created transaction', data)
              localStorage.setItem("transactionId", data.number)

              Swal.fire({
                title: 'Success',
                text: "Payment Successfully Completed!",
                icon: 'success',
                confirmButtonText: 'OK'
              })
              updateMembership(userId, plan,paymentMethod,type,sum)
              .then(response => response.data)
              .then(data => {
                console.log('updated plan', data)
                localStorage.setItem("ccType", cardType)
                localStorage.setItem("paidAmount", sum)
                localStorage.setItem("plan", plan)
                localStorage.setItem("paymentData", JSON.stringify(data));
                window.location.href = "/getTicket"; 
                // let { token } = data
                // sessionStorage.setItem('authToken', token)
                // history.push('/routes')
              })
            })
          
         
          
        
      } catch (error) {
        console.log("Error", error)
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } else {
      console.log(error.message,'error')
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }

    

   } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    })
   }
    
  };

  const renderNamesOfPassenger = () => {
    let passArray = localStorage.getItem("nameData");
    if (passArray) {
      let nameArray = JSON.parse(passArray);
      return nameArray.map((name, idx) => {
        return <p key={idx}> {name} </p>;
      });
    }
  };

  const getSumTotal = () => {
    let count = 0;
    let tax = 100;
    let seatArray = localStorage.getItem("reservedSeats");
    if (seatArray) {
      let seaArr = JSON.parse(seatArray);
      for (let i = 0; i < seaArr.length; i++) {
        count++;
      }
      return (
        <div>
          <hr className="hr3" />
          <p> {1000 * count} </p> <p> +{tax} </p> <p> {1000 * count + tax} </p>{" "}
        </div>
      );
    }
  };


  useEffect(() => {
		const tok = sessionStorage.getItem('authToken')
		const decoded = jwt_decode(tok)
    const date = new Date();
    let isAnnual = JSON.parse(localStorage.getItem("isannual"));

    if (isAnnual)
      setType("Annual")
    else
      setType("Monthly")

    let currentDate = new Date().toLocaleDateString();

    let licenseplan = JSON.parse(localStorage.getItem("licenseplan"));
    console.log(licenseplan, "plan")

    let _price = 0.0;

    switch(licenseplan){
      case "basic":
        setPlan("Basic")
        if (isAnnual)
          _price = 4.5
        else
          _price = 4.99

        break;

      case "plus":
        setPlan("Plus")
        if (isAnnual)
          _price = 8.9
        else
          _price = 9.99

        break;

      case "professional":
        setPlan("Professional")
        if (isAnnual)
          _price = 39.9
        else
          _price = 49.0

        break;

      case "premier":
        setPlan("Premier")
        if (isAnnual)
          _price = 79.9
        else
          _price = 99.0

        break;
      default:
        if (isAnnual)
          _price = 54.00
        else
          _price = 4.99
    }

    setToken(decoded.doc)
    setName(decoded.doc.name)
    setPaidDate(currentDate)
    setUserId(decoded.doc._id)

    if (isAnnual)
      _price *= 12

    setPrice(_price)
    setTax(_price / 10.0)

    setSum(_price + _price / 10.0)
	}, [])

  return (
    <>
    <Link to="/routes">
     <button className='back-button-container'>Back</button>
    </Link>
    {/* <ToastProvider/> */}
    {!success ?
    // <Elements stripe={stripePromise}>
      <div className="paym">
        <div className="row">
          <div key="Payment">
            <div className="App-payment cl-1">
              <p className="pPayment"> Enter Credit card details </p>{" "}
              <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={handleCallback}
              />
               
                        {/* <form
                className="credit-form"
                // ref={(c) => (form = c)}
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="tel"
                    name="number"
                    className="frm-ctrl"
                    placeholder="Card Number"
                    pattern="[\d| ]{16,22}"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="frm-ctrl"
                    placeholder="Name"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  <input
                    type="tel"
                    name="expiry"
                    className="frm-ctrl"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  <input
                    type="tel"
                    name="cvc"
                    className="frm-ctrl cvc"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />{" "}
                </div>{" "}
                <input type="hidden" name="issuer" value={issuer} />{" "}
                <div className="">
                  <button
                    onClick={(e) => moveToTicketPage(e)}
                    className="btn btn-light btCustom"
                  >
                    PAY{" "}
                  </button>{" "}
                </div>{" "}
              </form>{" "} */}
            
               {/* <fieldset className="FromGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset> */}
               <form
                className="credit-form"
                // onSubmit={handleSubmit}
                >
                 <fieldset className="FromGroup">
                  <div className="FormRow">
                  {/* <CardElement options={CARD_OPTIONS} /> */}
                    <CardElement options={CARD_OPTIONS} onChange={handleChange} onFocus={handleInputFocus}/>
                 </div>
                </fieldset>{" "} 
                 <div className="form-group"></div>{" "}
                <input type="hidden" name="issuer" value={issuer} />{" "}
                <div className="">
                  <button
                    onClick={(e) => moveToTicketPage(e)}
                    className="btn btn-light btCustom"
                  >
                    PAY{" "}
                  </button>{" "}
                </div>{" "}
              </form> 
             
            </div>{" "}
          </div>{" "}
          <div className="columnTwo">
            <h3> LetsBuild </h3>{" "}
            <div>
              <p> BILLING DETAILS </p>{" "}
              <div className="row">
                <div className="col-6 pt">
                  <p className="hdng"> Username </p> 
                    <hr className="hr3" />
                  <p className="hdng"> Date </p>
                    
                  <p className="hdng"> Plan </p>
                    <hr className="hr3" /> 
                  <p className="hdng"> Period </p>{" "}
                  {renderNamesOfPassenger()}
                  <p className="hdng"> Licence Price </p>{" "}
                  <p className="hdng"> Tax </p> 
                    <hr className="hr3" />{" "}
                  <p className="hdng"> Total Sum </p>{" "}
                </div>{" "}
                <div className="col-6">
                  <p className="usrName"> {name} </p>{" "}
                    <hr className="hr3" />
                  <p> {paidDate} </p>{" "}
                  <p> {plan} </p>{" "}
                    <hr className="hr3" />
                  <p> {type} </p>{" "}
                  <p> {price.toFixed(2)} </p>{" "}
                  <p> {tax.toFixed(2)} </p>{" "}
                    <hr className="hr3" />
                  <p> {sum.toFixed(2)}</p>{" "}
                  <p className="usrName"> {localStorage.getItem("start")} </p>{" "}
                  {/* <p className="usrName">
                    {" "}
                    {localStorage.getItem("destination")}{" "}
                  </p>{" "}
                  <hr className="hr3" style={{ marginTop: -294 }} />
                  <hr className="hr3" style={{ marginTop: 105 }} />
                  <hr className="hr3" style={{ marginTop: 136 }} />
                  <p className="hdng"> </p> {this.renderSeatNumbers()}{" "}
                  <p> {this.getSumTotal()} </p> */}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      // </Elements>
      :
      <div>
        <h2>You just bought a sweet things</h2>
      </div>
    } 
    </>
  )
}