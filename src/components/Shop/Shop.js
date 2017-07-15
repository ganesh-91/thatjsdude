import React, { Component } from 'react';

import './Shop.css';

import ShopItem from '../ShopItem/ShopItem';
import Cart from '../Cart/Cart';
import fakeData from '../../fakeData';

import {addToDatabaseCart} from '../../utilities/databaseManager';

class Shop extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            cart: [],
            cartCount:{}
        }
        this.addToCart = this.addToCart.bind(this);
    }
    componentDidMount() {
        var first10 = fakeData.slice(0, 10);
        this.setState({
            items:first10
        });
    }

    addToCart(key) {
        var item = this.state.items.find(itm => itm.key === key);
        var newCart = [...this.state.cart];
        newCart.push(item);
        

        var newCartCount = Object.assign({}, this.state.cartCount);
        var newCount = (newCartCount[key] || 0) + 1;
        newCartCount[key] = newCount;
        
        this.setState({
            cart: newCart,
            cartCount: newCartCount
        });

        addToDatabaseCart(key, newCount);

    }
    render() {
        return (
            <div>
                <h1>This is Shop</h1>
                <div className="shop-container">
                    <div className="items-container">
                        {this.state.items.map(item => <ShopItem key={item.key} item={item} addToCart={this.addToCart}></ShopItem> )}
                    </div>
                    <div className="cart-container">
                        <Cart cart={this.state.cart}></Cart>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;