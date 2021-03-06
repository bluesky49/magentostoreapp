import React from 'react';
import { Redirect } from 'react-router';
import '../../sass/confirmation.scss';

const Orderconfirmation = (props) => {
        if (!props.location.state || !props.location.state.orderData) {
            return <Redirect to={{
                pathname: '/'
            }} />
        }

        let shippingAdd = props.location.state.orderData.extension_attributes.shipping_assignments[0].shipping.address;
        let orderitems = props.location.state.orderData.items;
        let orderInfo = props.location.state.orderData;
        let cusname = props.location.state.orderData ? (props.location.state.orderData.customer_firstname ? props.location.state.orderData.customer_firstname : props.location.state.orderData.billing_address.firstname) : 'Guest';
        return (
            <div class="row">
                <div class="col-12 order-confirmation">
                    <h1>Thanks for your Order</h1>
                    <h5>Hi {cusname} </h5>

                    <p>Your order with shubhkit.com has been processed. Your order will be shipped in next 1-2 days. </p>

                    <p>Please pay <strong>₹{orderInfo.total_due}</strong> at the time of delivery. </p>

                    <div class="order-infobar">
                        <div className="text-left">
                            Order #<strong>{props.location.state.orderData.items[0].order_id}</strong>
                        </div>
                        <div className="text-right">
                            You placed this order on <strong>{props.location.state.orderData.created_at}</strong>
                        </div>
                    </div>
                    <div className="shipping-destinition">
                        <strong>Shipping Destinition</strong>
                        <p>
                            {shippingAdd.firstname} {shippingAdd.lastname}<br />
                            {shippingAdd.street[0]}<br />
                            {shippingAdd.city}<br />
                            {shippingAdd.postcode}
                        </p>
                    </div>
                    <div className="product-row product-row--header">
                        <div>
                            Product
                        </div>
                        <div>
                            QTY
                        </div>
                        <div>
                            Price
                        </div>
                    </div>
                    {orderitems.map((product) => (
                        <div className="product-row">
                            <div>
                                {product.name}
                            </div>
                            <div>
                                {product.qty_ordered}
                            </div>
                            <div>
                                ₹{product.qty_ordered * product.price}
                            </div>
                        </div>
                    ))}

                    <div className="product-row product-row--extra">
                        <div>
                            Payment Status : <span className={orderInfo.status === 'pending' ? 'red' : 'green'}>{orderInfo.status}</span>
                        </div>
                        <div>
                            Subtotal : ₹{orderInfo.subtotal_incl_tax}<br />
                            Shipping Charges : ₹{orderInfo.shipping_incl_tax}<br />
                            {orderInfo.discount_amount !== undefined && <span>
                            Discount : {orderInfo.discount_amount}</span>}<br />
                            <strong>Total : ₹{orderInfo.base_grand_total}</strong>

                        </div>
                    </div>
                    
                </div>
            </div>
        )
}

export default Orderconfirmation;