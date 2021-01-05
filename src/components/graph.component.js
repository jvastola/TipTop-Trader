
import React, { Component  } from 'react';

import axios from 'axios';
import { Line } from "react-chartjs-2";
const iexKey = require("../keys").iexKey;


var options = {
  maintainAspectRatio: true,
  responsive: true,
  tooltips: {enabled: true},
  layout: {
    padding: {
      bottom: 35,
    },
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
  },
};

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
    this.state = { company: undefined, datasets: [], companyname: undefined }
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
    await this.setState({ company: props,companyname:props[0] });
    if (this.state.company) {
      for (let i = 0; i < this.state.company[1].chart.length; i++) { 
          datasetsdata.push(this.state.company[1].chart[i].close)
          datasetslabels.push(new Date(this.state.company[1].chart[i].date))
      }
      this.setState(
        {
          datasets: {
            datasets: [{data: datasetsdata}],
            labels: datasetslabels
            
          }
        }
      )
    }
  }

  render(
    
  ) {
    return (
      <div className= " w-2/3 " >
        <p>Stock Graph :  { this.state.companyname ? this.state.companyname : "Graph Unavaliable API Limit Reached "} </p>
           <Line data={this.state.datasets} options = {options} /> 
      </div>
    );
  }
}