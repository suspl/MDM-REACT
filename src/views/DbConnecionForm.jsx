
import React, { Component } from "react";
import "../assets/css/custom_css.css";
import {Grid, Row,Col,} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {updateId} from "variables/Variables.jsx";

class DbConnecionForm extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      items:{},
      errors: {},
      //Id:props.Id
      Id:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchDbDetailsById = this.fetchDbDetailsById.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateFunction = this.updateFunction.bind(this);
    // this.getAllUserDetails = this.getAllUserDetails.bind(this);
    
    
    
  }
  

  componentDidMount(){
    console.log("props=="+this.state.Id);
    if(updateId[0]!=0){
      this.state.Id = updateId[0];
      this.fetchDbDetailsById();
    }
    
  }
  

  handleInputChange(event)
  {
    //console.log("name-----"+event.target.name,event.target.value);
    let Items = this.state.items;
    Items[event.target.name] = event.target.value;
    this.setState({items:Items});

  }

  fetchDbDetailsById()
  {
    console.log("value=="+this.state.Id);
    if(this.state.Id!=''){
      this.setState({
        errors: {}
      });
      this.setState({updateProfile:true});
      fetch('http://localhost:4000/getDbDetailsById/'+this.state.Id)
      .then(res=>res.json())
      .then(json=>{
        var responseLength = Object.keys(json).length;
        if(responseLength!=0){
          console.log("json---"+json[0].dbType);
          this.setState({
            items:json[0]
          });
          updateId[0] = 0;
        }
      });
    
    }
    
  }

  submitFunction(e)
  {
    e.preventDefault();
    if (this.validateForm())   //----validation---
      {
        let myobj =  this.state.items;
        fetch('http://localhost:4000/addDbDetails', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(myobj),
        })
        .then((res)=>{
          this.setState({items:{}});
          window.alert('New DB Connection Added');
          window.location.reload();
        });
    }
    //------
   
  }

  updateFunction(e)
  {
    if (this.validateForm())   //----validation---
    {
      let myobj =  this.state.items;
      console.log("myobj=="+myobj);
      fetch('http://localhost:4000/updateById/'+this.state.Id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myobj),
      })
      .then((res)=>{
        this.setState({items:{},Id:''});
        window.alert('Updation successful');
        window.location.reload();
      });
    }
  
  }
  
  
  
  //---------validation------
  validateForm() {
    let errors = {};
    let formIsValid = true;
    const{items} = this.state;

    if (!items["dbType"]) {
      formIsValid = false;
      errors["dbType"] = "*Please enter DB Type.";
    }


    if (typeof items["dbType"] !== "undefined") {
      if (!items["dbType"].match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["dbType"] = "*Please enter alphabet characters only.";
      }
    }

    if (!items["connectionName"]) {
      formIsValid = false;
      errors["connectionName"] = "*Please enter Connection Name.";
    }

    
    if (typeof items["connectionName"] !== "undefined") {
      if (!items["connectionName"].match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["connectionName"] = "*Please enter alphabet characters only.";
      }
    }

    if (!items["hostName"]) {
      formIsValid = false;
      errors["hostName"] = "*Please enter Host Name.";
    }

    
    if (typeof items["hostName"] !== "undefined") {
      if (!items["hostName"].match(/^[0-9.]*$/)) {
        formIsValid = false;
        errors["hostName"] = "*Please valid host name.";
      }
    }

    if (!items["port"]) {
      formIsValid = false;
      errors["port"] = "*Please enter Port Number.";
    }

    
    if (typeof items["port"] !== "undefined") {
      if (!items["port"].match(/^[0-9]*$/)) {
        formIsValid = false;
        errors["port"] = "*Please enter valid port number.";
      }
    }

    if (!items["userName"]) {
      formIsValid = false;
      errors["userName"] = "*Please enter User Name.";
    }

    
    if (typeof items["userName"] !== "undefined") {
      if (!items["userName"].match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["userName"] = "*Please enter alphabet characters only.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }
  //-------------------------
  render() {
    
    var {items,firstnameval,configDetails,reportingpersonDetails} = this.state;
    let button;
    //console.log("updateProfile=="+this.state.updateProfile);
    
    if(this.state.Id==''){
      button=<Button bsStyle="info"  pullRight fill onClick={this.submitFunction}>
               Save Profile
              </Button>
    }
    else{
      button=<Button bsStyle="info" pullRight fill  onClick={this.updateFunction}>
                Update Profile
             </Button>
    }
    //-----redux--------
    //const employeeDetails = useSelector(state=>state.EmployeeDetails);
    //const dispatch = useDispatch();
    //----------------
        
   
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                // title="DB Connection  Details:"
                content={
                  <form className="center_div">
                    <div className="row">
                     <div className="col-md-2">
                      <label>DB Type :</label>
                     </div>
                     <div className="col-md-8">
                       <input type="text" autoComplete="off" className="form-control" name="dbType" value={this.state.items.dbType|| ''}  onChange={this.handleInputChange}/>
                       <div className="errorMsg">{this.state.errors.dbType}</div>
                     </div>
                    </div>
                    <div className="row">
                     <div className="col-md-2">
                      <label>Connection Name :</label>
                     </div>
                     <div className="col-md-8">
                       <input type="text" autoComplete="off" className="form-control" name="connectionName" value={this.state.items.connectionName|| ''}  onChange={this.handleInputChange}/>
                       <div className="errorMsg">{this.state.errors.connectionName}</div>
                     </div>
                    </div>
                    <div className="row">
                     <div className="col-md-2">
                      <label>Host Name :</label>
                     </div>
                     <div className="col-md-8">
                       <input type="text" autoComplete="off" className="form-control" name="hostName" value={this.state.items.hostName|| ''}  onChange={this.handleInputChange}/>
                       <div className="errorMsg">{this.state.errors.hostName}</div>
                     </div>
                    </div>
                    <div className="row">
                     <div className="col-md-2">
                      <label>Port :</label>
                     </div>
                     <div className="col-md-8">
                       <input type="text" autoComplete="off" className="form-control" name="port" value={this.state.items.port|| ''}  onChange={this.handleInputChange}/>
                       <div className="errorMsg">{this.state.errors.port}</div>
                     </div>
                    </div>
                    <div className="row">
                     <div className="col-md-2">
                      <label>User Name :</label>
                     </div>
                     <div className="col-md-8">
                       <input type="text" autoComplete="off" className="form-control" name="userName" value={this.state.items.userName|| ''}  onChange={this.handleInputChange}/>
                       <div className="errorMsg">{this.state.errors.userName}</div>
                     </div>
                    </div>
                    <div className="row">
                     <div className="col-md-2">
                      <label>Password :</label>
                     </div>
                     <div className="col-md-8">
                       <input type="text" autoComplete="off" className="form-control" name="password" value={this.state.items.password|| ''}  onChange={this.handleInputChange}/>
                       {/* <div className="errorMsg">{this.state.errors.password}</div> */}
                     </div>
                    </div>
                   
                    {button}
                   
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            
          </Row>  
          </Grid>     
      </div>
    );
  }
}

export default DbConnecionForm;
