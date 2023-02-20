import React from "react";
import Card from "react-credit-cards";
import "./PaymentTab.css";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import constants from "../../constant";
import axios from 'axios'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";


export function updateMembership(userId, name) {
  let apiUrl = `${constants.baseURL}/membership/update`
  return axios.post(apiUrl, {
    userId: userId,
    membershipName: name,
  })
}

export default class App extends React.Component {
  
  state = {
    userId: "",
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: "",
    token: "",
    paidDate: "",
    plan : "None",
    type : "Monthly",
    price : 0
  };

  componentDidMount() {
    const tok = sessionStorage.getItem("authToken");
    const decoded = jwt_decode(tok);
    const date = new Date();
    let isAnnual = JSON.parse(localStorage.getItem("isannual"));

    if (isAnnual)
      this.setState({ type : "Annual" });
    else
      this.setState({ type : "Monthly" })

    let currentDate = new Date().toJSON().slice(0, 10);

    let licenseplan = JSON.parse(localStorage.getItem("licenseplan"));
    console.log(licenseplan, "plan")
    switch(licenseplan){
      case "basic":
        this.setState({ plan : "Basic" });
        if (isAnnual)
          this.setState({ price : 54.00 });
        else
          this.setState({ price : 4.99 });

        break;
      default:
        if (isAnnual)
          this.setState({ price : 54.00 });
        else
          this.setState({ price : 4.99 });
    }

    this.setState({ token: decoded.doc, name: decoded.doc.name, paidDate : currentDate, userId: decoded.doc._id });
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid)
      this.setState({ issuer });
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number")
      target.value = formatCreditCardNumber(target.value);
    else if (target.name === "expiry")
      target.value = formatExpirationDate(target.value);
    else if (target.name === "cvc")
      target.value = formatCVC(target.value);

    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  moveToTicketPage = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentData", JSON.stringify(this.state.token));

    console.log(this.state.plan)

    updateMembership(this.state.userId, this.state.plan)
            .then(response => {
              console.log('ddsdsdsd', response) 
              // response.data
            })
            // .then(data => {
            //     // let { token } = data
            //     // sessionStorage.setItem('authToken', token)
            //     // history.push('/routes')
            // })



    // window.location.href = "/getTicket";
  };

  renderNamesOfPassenger = () => {
    let passArray = localStorage.getItem("nameData");
    if (passArray) {
      let nameArray = JSON.parse(passArray);
      return nameArray.map((name, idx) => {
        return <p key={idx}> {name} </p>;
      });
    }
  };

  // renderSeatNumbers = () => {
  //   let seatArray = localStorage.getItem("reservedSeats");
  //   if (seatArray) {
  //     let seaArr = JSON.parse(seatArray);
  //     return seaArr.map((seat, idx) => {
  //       return <p key={idx}> {seat} </p>;
  //     });
  //   }
  // };

  getSumTotal = () => {
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
  
   
  render() {
    const { name, number, expiry, cvc, focused, issuer, formData, token, paidDate, type, plan, price } =
      this.state;
    const tax = price / 10
    return (
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
                callback={this.handleCallback}
              />{" "}
              <form
                className="credit-form"
                ref={(c) => (this.form = c)}
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="tel"
                    name="number"
                    className="frm-ctrl"
                    placeholder="Card Number"
                    pattern="[\d| ]{16,22}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />{" "}
                </div>{" "}
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="frm-ctrl"
                    placeholder="Name"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />{" "}
                </div>{" "}
                <input type="hidden" name="issuer" value={issuer} />{" "}
                <div className="">
                  <button
                    onClick={(e) => this.moveToTicketPage(e)}
                    className="btn btn-light btCustom"
                  >
                    PAY{" "}
                  </button>{" "}
                </div>{" "}
              </form>{" "}
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
                  {this.renderNamesOfPassenger()}
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
                  <p> {price} </p>{" "}
                  <p> {tax} </p>{" "}
                    <hr className="hr3" />
                  <p> {price + tax }</p>{" "}
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
    );
  }
}
