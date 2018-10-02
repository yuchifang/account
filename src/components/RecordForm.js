import React, { Component } from 'react';
import *as RecordsAPI from '../utils/RecordsAPI';


class RecordForm extends Component{
  constructor(props){
 
    super(props);
    this.state={
      date:"",
      title:"",
      amount:""
    }
  }
  valid(){//三個都有值才可以按
    return this.state.date&&this.state.title&&this.state.amount
  }
  dateChangedHandler=(event)=>{
    this.setState({date:event.target.value});

  }
  titleChangedHandler=(event)=>{
    this.setState({title:event.target.value});

  }
  amountChangedHandler=(event)=>{
    this.setState({amount:event.target.value});

  }
  handleSubmit=(e)=>{
   e.preventDefault();
   const data={
    date:this.state.date,
    title:this.state.title,
    amount:Number.parseInt(this.state.amount,0)
   }
   RecordsAPI.create(data)
   .then(
     response=>{ 
       this.props.handleNewRecord(response.data)
       this.setState(
        {
          date:"",
          title:"",
          amount:""
      })
    }
   )
   
   .catch(
     error=>console.log(error.message)
   )
  }
  render() {
    
    return (
    <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
      <div className="form-group mr-1">
        <input 
              type="text" 
              className="form-control"
              onChange={this.dateChangedHandler}
              placeholder="Date" 
              name="date" 
              value={this.state.date}/>
      </div>
      <div className="form-group mr-1">
        <input 
              type="text" 
              className="form-control"
              onChange={this.titleChangedHandler}
              placeholder="Title" 
              name="title" 
              value={this.state.title}/>
      </div>
      <div className="form-group mr-1">
        <input 
              type="text" 
              className="form-control"
              onChange={this.amountChangedHandler}
              placeholder="Amount" 
              name="amount"  
              value={this.state.amount}/>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
    </form>
    );
  }
}

export default RecordForm;