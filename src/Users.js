import React, { Component } from 'react'
import classes from './Users.module.css'
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom'
import { CSVLink, CSVDownload } from "react-csv";
import Category from './Category'

export class Users extends Component {
    state={
        persons:JSON.parse(localStorage.getItem('LocalData')),
        position:'',
        searchedUser: ' ',
        ifSearched: false
    }
   
    
      removeProduct = (pos,e) => {
        e.preventDefault();

        const mArr = this.state.persons;
        let Storage = JSON.parse(localStorage[('LocalData')]);

        mArr.splice(pos, 1);

        Storage = mArr;
        localStorage.setItem('LocalData', JSON.stringify(Storage));
        this.setState({persons: mArr});
    }
    handlepos=(pos)=>{
        console.log(pos)
        localStorage.setItem('Position',pos)
        // this.setState({position:pos})
    }
    onInputSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.value);
        this.setState({searchedUser: e.target.value,ifSearched: true});
    }

    render() {
        
        const csvData=JSON.parse(localStorage.getItem('LocalData'));
        // console.log(this.state.Data)
        const renderingData = this.state.persons.map((item,pos) => {
            return (
                <tr key={pos+1} className={classes.mainRow}>
                <Link to="/EditUser" className={classes.underline} onClick={(e)=>this.handlepos(pos,e)} >
                    {/* <td >
                        <label >
                            <input className={classes.input} type="checkbox" />
                        </label>
                    </td> */}
                    <td className={classes.id}>{item.id}</td>
                    <td className={classes.productname} >{item.name}</td>
                    {/* <td className={classes.productsold}>{item.address}</td> */}
                    <td className={classes.productstock}>{item.email}</td>
                    <td className={classes.productexpire}>{item.phone}</td>
                    <td className={classes.deleteIcon}>
                        <a href='/' onClick={(e)=>this.removeProduct(pos,e)} >
                            <i className="far fa-trash-alt"></i>
                        </a>
                    </td>
                </Link>
                </tr>
            )
        });
        const filteredData = this.state.persons.filter(searched=>searched.name.includes(this.state.searchedUser)).map((item,pos) => {
            return (
                <tr key={pos+1} className={classes.mainRow}>
                <Link to="/EditUser" className={classes.underline} onClick={(e)=>this.handlepos(pos,e)} >
                    {/* <td >
                        <label >
                            <input className={classes.input} type="checkbox" />
                        </label>
                    </td> */}
                    <td className={classes.id}>{item.id}</td>
                    <td className={classes.productname} >{item.name}</td>
                    {/* <td className={classes.productsold}>{item.address}</td> */}
                    <td className={classes.productstock}>{item.email}</td>
                    <td className={classes.productexpire}>{item.phone}</td>
                    <td className={classes.deleteIcon}>
                        <a href='/' onClick={(e)=>this.removeProduct(pos,e)} >
                            <i className="far fa-trash-alt"></i>
                        </a>
                    </td>
                </Link>
                </tr>
            )
        });
        return (
            <div>
                 <div>
                     <input onChange={this.onInputSubmit} type="text" placeholder="Search for User" />
                 </div>
                  <div style={{padding: '0 1px'}}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr>
                                        {/* <th style={{width: '20px'}}></th> */}
                                        <th className={classes.id}>ID</th>
                                        <th>NAME</th>
                                        {/* <th>ADDRESS</th> */}
                                        <th>EMAIL</th>
                                        <th>Ph.NUMBER</th>
                                        {/* <th style={{width: '20px'}}></th> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <table className={[classes.table,classes.datatable].join(' ')}>
                            <tbody>        
                                {this.state.ifSearched === false ? renderingData : filteredData}
                            </tbody>
                            </table>
                    
                    <div className={classes.btnWrapper}>
                    {/* <button  className={classes.btn}>
                        Add new product
                    </button> */}
                    <Link to="/AddUser" className={classes.btn}>Create User</Link>
                    <CSVLink data={csvData} className={classes.btn}>Download me</CSVLink>;
                    
                    </div>
                    <Category/>
            </div>
        )
    }
}

export default Users
