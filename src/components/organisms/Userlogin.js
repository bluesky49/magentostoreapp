import React, { Component } from 'react';
import axios from 'axios';
import Loginbox from '../molecules/Loginbox';
import Registerbox from '../molecules/Registerbox';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';

class Userlogin extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (values) => {
    this.props.loginRequest({
      "username": values.uname,
      "password": values.upassword
    })
   // this.props.closePopup();
  }

  handleRegister = (values) => {
    console.log(values)
    this.props.registerRequest({
      "customer": {
        "firstname": values.fname,
        "lastname": values.lname,
        "email": values.uemail
      },
      "password": values.upassword
    })
    //this.props.closePopup();
  }

  loginRequest = (UserData) => {
    // this.setState({isAjaxProgress: true});
    setTimeout(() => {
      axios.post(`/userlogin/`,
        UserData
      )
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          // Error
          console.log("error");
          console.log(error);
        });
    }, 200);
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
          {Object.keys(this.props.usrMsg).length > 0 && 
          <div className={`alert alert-${this.props.usrMsg.type}`}>
          {this.props.usrMsg.message}
        </div>
          }
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Loginbox onSubmit={this.handleSubmit} />
          </div>
          <div className="col-1">
            <span className="form-devider"> </span>
          </div>
          <div className="col-5">
            <Registerbox onSubmit={this.handleRegister} />
          </div>
        </div>
      </div>
    );
  }
}

//export default Userlogin;
function mapStateToProps(state) {
  if (state) {
    return {
      // showPopup: state.productReducer.showPopup,
      userData: state.productReducer.userData,
      usrMsg: state.productReducer.usrMsg
    }
  };
}
//export default Addtocart;
const mapDispatchToProps = (dispatch) => ({
  loginRequest: (usrdata) => dispatch(actionCreaters.processloginRequest(usrdata)),
  registerRequest: (cusdata) => dispatch(actionCreaters.processregisterRequest(cusdata))
})

export default connect(mapStateToProps, mapDispatchToProps)(Userlogin)