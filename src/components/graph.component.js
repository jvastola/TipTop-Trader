
import React, { Component ,useEffect, useState } from 'react';

import axios from 'axios';
import { Line } from "react-chartjs-2";
const iexKey = require("../keys").iexKey;




const fetchCompanyDaily = tag => {
  return axios({
    transformRequest: [(data, headers) => { delete headers.common.Authorization; return data }],
    method: 'get',
    url: "https://cloud.iexapis.com/stable/stock/market/batch",
    params: {
      symbols: "googl",
      types: "quote,chart",
      range: "1m",
      token: iexKey
    }
  });
}
export default class Graph extends Component {
  
  constructor(props) {
    super(props);
    this.state = { company: undefined, datalabel: [], datadata: [] }
  }
  
  componentDidMount() {
    if (this.props.tag) {
      fetchCompanyDaily(this.props.tag).then(
        res => {
            this.updateData(Object.entries(res.data)[0]);
        }
      );
    } else {
      this.updateData();

    }    
  }
  
  async updateData(props = this.props.data) {
    let datasetsdata = [];
    let datasetslabels = [];
    await this.setState({ company: props });
    if (this.state.company) {
      for (let i = 0; i < this.state.company[1].chart.length; i++) { 
          datasetsdata.push(this.state.company[1].chart[i].close)
          datasetslabels.push(new Date(this.state.company[1].chart[i].date))
      }
      this.setState(
        {
          datadata: [datasetsdata],
          datalabel: [datasetslabels]
        }
      )
    }
  }


  render(
    data = this.state.dataPoints
//data = {
 // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
 // datasets: [ {data: [65, 59, 80, 81, 56, 55, 40]}]
//}
  ) {
    return (
      <div>
        <p>Stock Graph{this.state.dataPoints[0]}</p>
        <Line data={data}/>
      </div>
    );
  }
}