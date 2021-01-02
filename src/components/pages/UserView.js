import React, { Component } from 'react';
import Graph from '../graph.component'

export default class UserView extends Component {
    constructor(props) {
        super(props);
        this.state= {
            balance : 0 ,
            stockValue : 0,
            stockData: [], 
            quickListData: [], 

        }
    }

    render() {
        return (
            <div>
                <div>
                    <Graph />
                    <h1>Balance =  {this.state.balance}</h1>
                    <div>stock graph
                    </div>
                </div>
            </div>
        );
    }
}