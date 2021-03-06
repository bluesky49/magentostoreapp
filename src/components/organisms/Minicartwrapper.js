import React, { Component } from 'react';
import Minicart from '../molecules/Minicart';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import '../../sass/minicart.scss';

class Minicartwrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1
        }
    }

    changeQty = (qty) => {
        this.setState({ qty: qty });
    }

    deleteItem = (id) => {
        if (this.props.cartID) {
            this.props.guestdeleteItem(id, this.props.cartID);
        }
        if (this.props.usrID) {
            this.props.usrdeleteItem(id, this.props.usrID);
        }
    }
    editItem = (id, itm, qty) => {
        itm.qty = qty;
        if (this.props.cartID) {
            this.props.guesteditItem(id, this.props.cartID, itm);
        }
        if (this.props.usrID) {
            this.props.usreditItem(id, this.props.usrID, itm);
        }
    }

    render() {
        return (
            <div className={`minicart-wrapper ${this.props.isShow ? 'speed-in' : ''}`}>
                <Minicart cartTitle={this.props.cartTitle} cartStatus={this.props.cartStatus} shippingPrice={this.props.shippingPriceData} editCartItem={this.editItem} deleteCartItem={this.deleteItem} onclosecart={this.props.closeCart} changeQty={this.changeQty} spot={this.props.spot} minicartItms={this.props.cartItems} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state) {
        return {
            cartItems: state.userReducer.cartItems,
            cartID: state.userReducer.cartID,
            usrID: state.userReducer.usrID,
            cartStatus: state.uiReducer.cartStatus
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    guestdeleteItem: (id, cartid) => dispatch(actionCreaters.guestdeleteCartItem(id, cartid)),
    usrdeleteItem: (id, cartid) => dispatch(actionCreaters.userdeleteCartItem(id, cartid)),
    guesteditItem: (id, cartid, itm) => dispatch(actionCreaters.guesteditCartItem(id, cartid, itm)),
    usreditItem: (id, cartid, itm) => dispatch(actionCreaters.usereditCartItem(id, cartid, itm))
})

export default connect(mapStateToProps, mapDispatchToProps)(Minicartwrapper)