import React, { Component } from 'react';
import Banner from '../molecules/Banner';
import Sectionhead from '../atoms/Sectionhead';
import Productlist from '../organisms/Productlist';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import ReactGA from 'react-ga';

class Home extends Component {
    constructor(props) {
        super(props);
        this.props.loadProducts(2);
    }
    componentWillMount() {
        this.props.productsItems = [];
        this.props.productsList = [];
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        if (Object.keys(this.props.productsItems).length === 0) {
            return <div class="festival__spacial pb-60 pt-60">
                <div className='container'>
                    <div class="row">
                        <div class="col-6 col-sm-6 col-lg-3">
                            <div class="animated-background">
                            </div>
                        </div>
                        <div class="col-6 col-sm-6 col-lg-3">
                            <div class="animated-background">
                            </div>
                        </div>
                        <div class="col-6 col-sm-6 col-lg-3">
                            <div class="animated-background">
                            </div>
                        </div>
                        <div class="col-6 col-sm-6 col-lg-3">
                            <div class="animated-background">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        return (
            Object.keys(this.props.productsItems).length > 0 && <div>
                <Banner />
                <div class="shubh__kit__spacial pb-60 pt-60">
                    <div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                        <Sectionhead secHeading = "Shubhkit Special"/>
                        <Productlist productsData={this.props.productsItems} />
                    </div>
                </div>
                <div class="festival__spacial pb-60 pt-60">
                    <div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                        <Sectionhead secHeading = "Featured Products"/>
                        <Productlist productsData={this.props.productsList} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state) {
        return {
            productsItems: state.productReducer.homeProducts.firstlist,
            productsList: state.productReducer.homeProducts.sectlist,
            showCart: state.uiReducer.showCart
        }
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProducts: (catId) => dispatch(actionCreaters.getHomeList(catId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
