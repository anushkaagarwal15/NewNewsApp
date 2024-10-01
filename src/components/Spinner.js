import React, { Component } from 'react'
//./ is used to run script located in current directory
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src ={loading} alt="loading" />
        
      </div>
    )
  }
}
