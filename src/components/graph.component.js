
import React, { Component } from 'react';
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
    this.state = { company: undefined, dataPoints: [] }
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
  componentWillReceiveProps(nextProps) {
    this.setState({ company: undefined, dataPoints: [] }, () => {
      if (nextProps.data) {
        this.updateData(nextProps.data);
      } else if (nextProps.tag) {
        fetchCompanyDaily(nextProps.tag).then(
          res => {
            this.updateData(Object.entries(res.data)[0]);
          }
        );
      }
    });
  }  
  async updateData(props = this.props.data) {
    await this.setState({ company: props });
    if (this.state.company) {
      for (let i = 0; i < this.state.company[1].chart.length; i++) {
        this.setState({
          dataPoints: this.state.dataPoints.concat([{
            x: new Date(this.state.company[1].chart[i].date),
            y: this.state.company[1].chart[i].close
          }])


        })
      }
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