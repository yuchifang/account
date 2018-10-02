import React, { Component } from 'react';
import PropTypes from 'prop-types';
import *as RecordsAPI from'../utils/RecordsAPI'
export default class Record extends Component{
  constructor(props){
    super(props);
    this.state={
      edit:false,
      date:"",
      title:"",
      amount:""
    }
  }
  handleToggle=()=>{
    this.setState({
      edit:!this.state.edit
    });
  }
  handleDelete=(e)=>{
    e.preventDefault();
    RecordsAPI.remove(this.props.record.id)
    .then(response=>
      this.props.handleDeleteRecord(this.props.record))
    .catch(error=>console.log(error.message))
  }
  handleUpdate=(e)=>{
    e.preventDefault();
    const record={
      date:this.refs.date.value,//---------------------
      title:this.refs.title.value,
      amount:Number.parseInt(this.refs.amount.value,0)
    }
    console.log(record);
    RecordsAPI.update(this.props.record.id,record)
    .then(
      response=>{
        this.setState({edit:false})
        this.props.handleEditRecord(this.props.record,response.data)
        //要傳舊值才能找位置
       
      }
    )
    .catch(error=>console.log(error.message))
  }
  recordRow(){
    return (
      <tr>
        <th>{this.props.record.date}</th>
        <th>{this.props.record.title}</th>
        <th>{this.props.record.amount}</th>
        <th>
          <button className="btn btn-info mr-1" onClick={this.handleToggle}>Edit</button>
          <button className="btn btn-danger mr-1"onClick={this.handleDelete} >Delete</button>
        </th>
      </tr>
      );
  }
  recordForm(){
    return (
      <tr>
        <th><input 
                  type="text" 
                  className="form-control" 
                  defaultValue={this.props.record.date} 
                  ref="date"/>
        </th>
        <th><input 
                  type="text" 
                  className="form-control" 
                  defaultValue={this.props.record.title} 
                  ref="title"/>
        </th>
        <th><input 
                  type="text" 
                  className="form-control" 
                  defaultValue={this.props.record.amount}
                  ref="amount"/>
        </th>
        <th>
          <button className="btn btn-info mr-1"
                  onClick={this.handleUpdate}>Update</button>

          <button className="btn btn-danger mr-1"
                  onClick={this.handleToggle}>Cancel</button>
        </th>
      </tr>
      );
  }
  render() {
    if(this.state.edit){
      return this.recordForm();
    }else{
      return this.recordRow();
    }
   }
 }

Record.propTypes={
  id:PropTypes.string,
  date:PropTypes.string,
  title:PropTypes.string,
  amount:PropTypes.number,

}
