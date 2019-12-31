import React, { Component } from "react";
import { Grid, Row, Col} from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {updateId} from "variables/Variables.jsx";
import TableComp from "views/TableComp.jsx";
import DbConnecionForm from "views/DbConnecionForm.jsx";


class DbConnection extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      items:[],
      tdarr1:[],
      gotData:false,
      viewdbDetails:false,
      Id:''
    };
    
    this.getAllDBDetails = this.getAllDBDetails.bind(this);
    this.viewDBDetails = this.viewDBDetails.bind(this);
    this.createNewDBDetails = this.createNewDBDetails.bind(this);
    this.deleteDBDetails = this.deleteDBDetails.bind(this);
    
  }
  componentDidMount()//called after render method
  {
   // console.log("updateId="+updateId);
   // console.log("updateId[0]=="+updateId[0]);
    this.getAllDBDetails();
  }
 
  createNewDBDetails(event)
  {
    //this.setState({viewdbDetails:true});
    let path = `/admin/dbConnectionForm`;
    this.props.history.push(path);
  }

  getAllDBDetails()
  {
    this.state.tdarr1=[];
    const requestBody = {
      query: `
          query {
            dbConnectionDetails {
              _id
              dbType
              connectionName
              hostName
              port
              userName
              password
            }
          }
        `
    };
   // this.setState({tdarr1:[]});
    var temparr2=[];
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(res=>res.json())
    .then(json=>{
      const dbConnectionDetails = json.data.dbConnectionDetails;
      console.log("dbConnectionDetails="+dbConnectionDetails);
      this.setState({
        items:dbConnectionDetails
      });

      for(let i=0;i<this.state.items.length;i++)
      {
        var temparr=[];
        temparr.push(
          i+1,
          this.state.items[i].dbType,
          this.state.items[i].connectionName,
          this.state.items[i].hostName,
          this.state.items[i].port,
          this.state.items[i].userName,
          this.state.items[i].password,
          <div>
          <Button bsStyle="info"  fill id= {this.state.items[i]._id} onClick={this.viewDBDetails}>
          View
          </Button>
          &nbsp;&nbsp;
          <Button bsStyle="danger"  fill id= {this.state.items[i]._id} onClick={this.deleteDBDetails}>
          Delete
          </Button>
          </div>
        
        );
        
       // console.log("temparr="+temparr);
        //tdArray.push(temparr);
        this.state.tdarr1.push(temparr);
      }
      console.log("temparr="+this.state.tdarr1);
      this.setState({
        gotData:true
      });
    });
    
  }

  viewDBDetails(event)
  {
    // this.setState({Id:event.target.id});
    // this.setState({viewdbDetails:true});
    
   // updateId[0] = event.target.id;
   // console.log("updateId=="+updateId[0]);
    let path = `/admin/dbConnectionForm/`+event.target.id;
   // console.log("path="+path);
    this.props.history.push(path);
  }
  
  deleteDBDetails(event)
  {
    console.log("deleteProfile="+event.target.id);
    const requestBody = {
      query: `
          mutation DeleteByIdDbDetailsById($id: ID!) {
            deleteByIdDbDetailsById(Id: $id) {
            _id
            }
          }
        `,
      variables: {
        id: event.target.id
      }
    };
    fetch('http://localhost:4000/graphql' ,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then((res)=>{
      window.alert('Profile Deleted');
      this.setState({gotData:false});
      this.getAllDBDetails();
    });
  }
  

  render() {
    const {viewdbDetails,Id} = this.state;
    let temptable;
    let dbList;
    let dbConnectionForm;
    if(this.state.gotData==true){
      temptable = <TableComp tdArray1={this.state.tdarr1} name="ss"/>
    }
   // if(viewdbDetails == true)
   // {
   //   dbConnectionForm = <DbConnecionForm Id={Id}></DbConnecionForm>
   // }
   // if(viewdbDetails == false){
     // console.log("dbConnectionList");
       dbList =<div><Row>
        <Col md={12}>
              <Button bsStyle="info"  fill  onClick={this.createNewDBDetails}>
                Add DB Connection
              </Button>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col md={12}>
          <Card
            ctTableFullWidth
            ctTableResponsive
            content={
              <div>
                {temptable}
              </div> 
            }
          />
        </Col>
      </Row>
      </div>
   // }
    
    return (
      <div className="content">
        <Grid fluid>
         {dbList}
         {/* {dbConnectionForm} */}
        </Grid>
      </div>
    );
  }
}

export default DbConnection;
