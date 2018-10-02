import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import *as RecordsAPI from '../utils/RecordsAPI'
import AmountBox from './AmountBox'
class Records extends Component {
  constructor(){
    super();
    this.state={
      records:[ ],
      isLoading: false,
      error: null,
    }
  }//"https://5b9e5e91133f660014c91973.mockapi.io/api/v1/records"
  componentDidMount(){
    RecordsAPI.getAll()
   .then(response=>this.setState({
     records:response.data,
     isLoading:true
   }))
   .catch(error=>this.setState({
    isLoading:true,
    error
   })
   )
  }
  addRecord=(record)=>{
    const a=[{"a":"b"},{"c":"d"}];
    const b={"e":"f"};
    const c=[...a,b]
    console.log(c);
      this.setState({
        records:[
          ...this.state.records,record//把records 展開(...)來 將新資料record 加進去
        ],
        isLoading: true,
        error: null
    })
  }
   updateRecord=(record,data)=>{
     const a=[{"a":"b","b":"c"}];
     const b=[{"a":"c","b":"c"}];
     const c={
       ...a,
       ...b
     }

    console.log(c);
     //indexof可返回某个指定的字串值在字串中首次出現的位置。
    const recordIndex =this.state.records.indexOf(record);
    const newRecords= this.state.records.map((item,index)=>{
      if(index!==recordIndex){//如果舊值位置不等於index
        return item
      }
      return{
        ...item,
        ...data
      }
    })
    this.setState({
      records:newRecords
    })
  }
  deleteRecord=(record)=>{
    const recordIndex =this.state.records.indexOf(record);
   const newRecords= this.state.records.filter((item,index)=>index!==recordIndex);
   this.setState({
     records:newRecords
   })
  console.log(record);
  }
  credits(){
    let credits=this.state.records.filter((record)=>{
      return record.amount>=0;
      //檢查每個值
    })
    return credits.reduce((prev,curr)=>{
      //(先前值,當前值)=>(函數,初始值)
      return prev+Number.parseInt(curr.amount,0)
    },0)
  }
  debits(){
    let debits=this.state.records.filter((record)=>{
      return record.amount<0;
      //檢查每個值
    })
    return debits.reduce((prev,curr)=>{
      //(先前值,當前值)=>(函數,初始值)
      return prev+Number.parseInt(curr.amount,0)
    },0)
  }
  balance(){
    return this.credits()+this.debits()
  }
    
  
  render() {
    let recordsComponent;
    const{ records,isLoading,error }=this.state;
    if(error){
      return recordsComponent= <p>error</p>;
   }
   else if (!isLoading) {
    return recordsComponent= <p>Loading ...</p>;//ERROR
   }
    recordsComponent= (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.records.map((record)=>
           <Record 
                  key={record.id} 
                  record={record} 
                  handleEditRecord={this.updateRecord}
                  handleDeleteRecord={this.deleteRecord}
                  />)}
     
        </tbody>
      </table>
    );//{...record}={data: record.data}{title: record.title}
    return (//更新資料就會執行 state 一改變 執行render 
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credits" type="success" amount={this.credits()}/>
          <AmountBox text="Debit"  type="danger" amount={this.debits()}/>
          <AmountBox text="Balance" type="info" amount={this.balance()}/>
        </div>
        <RecordForm handleNewRecord={this.addRecord}/>
        {recordsComponent}
        
      </div>
    );
  }
}

export default Records;
