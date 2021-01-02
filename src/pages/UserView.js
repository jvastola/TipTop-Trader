import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class UserView extends Component {
    constructor(props) {
        super(props);
        this.state= {
            balance : 0 ,
            stockValue : 0
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Balance =  {this.balance}</h1>
                    <div>stock graph
                    </div>
                </div>
            </div>
        );
    }
}