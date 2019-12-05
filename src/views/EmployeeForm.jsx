/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import "../assets/css/customDatePickerWidth.css";
import "../assets/css/custom_css.css";

import store from "../redux/employee/store"
//import {Provider,connect} from "react-redux";
import {useSelector,useDispatch} from "react-redux";
import {addEmployee} from "redux/employee/employeeAction";
import employeeReducer from "redux/employee/employeeReducer";
import EmpList from "views/EmployeeName.jsx";

import {
  Grid,
  Row,
  Col,
 
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray ,updateId} from "variables/Variables.jsx";
import avatar from "assets/img/faces/face-3.jpg";

class EmployeeForm extends Component {


  constructor(props)
  {
    super(props);
    this.state={
      items:[],
      userDetails:[],
      configDetails:[],
      firstname:"",
      middlename:"",
      lastname:"",
      initial:"",
      fathername:"",
      spousename:"",
      dob: new Date(),
      companyid:"",
      department:"",
      businesstitle:"",
      reportingperson:"",
      employmentType:"",
      jobband:"",
      joiningdate:new Date(),
      mobilenumber:"",
      alternatenumber:"",
      pannumber:"",
      aadhernumber:"",
      uannumber:"",
      passportnumber:"",
      employeeactive:"",
      companyemail:"",
      personalemail:"",
      employeeid:"",
      bloodgroup:"",
      gender:"",
      resignationdate:new Date(),
      leavingdate:new Date(),
      value: 'dddddd',
      assigneesvalue:"1003",
      startDate: '',
      Id:'',
      updateProfile:false,
      n_dob:'',//update profile
      n_joiningdate:'',
      n_resignationdate:'',
      n_leavingdate:'',
      current_Desgination :"",
      reportingpersonDetails:[],
      errors: {}
    };

    

    this.submitFunction = this.submitFunction.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.fetchUserFullDetailById = this.fetchUserFullDetailById.bind(this);
    this.getAllConfigDetails = this.getAllConfigDetails.bind(this);
    this.getAllUserDetails = this.getAllUserDetails.bind(this);
    this.updateFunction = this.updateFunction.bind(this);
    this.fetchReportingPerson =this.fetchReportingPerson.bind(this);
    
  }
  

  componentDidMount(){
    console.log("updateId11111111="+updateId[0]);

    

    this.getAllUserDetails();
    this.getAllConfigDetails();
    //==============
    if(updateId[0]!=0)
    {
      this.setState({updateProfile:true});
      this.setState({Id:updateId[0]});
      console.log("updateId22222="+updateId[0]);
      fetch('http://localhost:4000/getUserDetailsById/'+updateId[0])
      .then(res=>res.json())
      .then(json=>{
        var responseLength = Object.keys(json).length;
        if(responseLength!=0){
          this.setState({userDetails:json});
          this.fetchReportingPerson(this.state.userDetails[0].BusinessTitle);
          this.setState({
            firstname:this.state.userDetails[0].FirstName?this.state.userDetails[0].FirstName:'',
            middlename:this.state.userDetails[0].MiddleName?this.state.userDetails[0].MiddleName:'',
            lastname:this.state.userDetails[0].LastName?this.state.userDetails[0].LastName:'',
            initial:this.state.userDetails[0].Initials?this.state.userDetails[0].Initials:'',
            fathername:this.state.userDetails[0].FatherName?this.state.userDetails[0].FatherName:'',
            spousename:this.state.userDetails[0].SpouseName?this.state.userDetails[0].SpouseName:'',
            dob:this.state.userDetails[0].DOB?new Date(this.state.userDetails[0].DOB):new Date(),
            n_dob:this.state.userDetails[0].DOB?new Date(this.state.userDetails[0].DOB):new Date(),
            companyid:this.state.userDetails[0].CompanyID?this.state.userDetails[0].CompanyID:'',
            department:this.state.userDetails[0].Department?this.state.userDetails[0].Department:'',
            businesstitle:this.state.userDetails[0].BusinessTitle?this.state.userDetails[0].BusinessTitle:'',
            reportingperson:this.state.userDetails[0].ReportingPerson?this.state.userDetails[0].ReportingPerson:'',
            employmentType:this.state.userDetails[0].EmploymentType?this.state.userDetails[0].EmploymentType:'',
            jobband:this.state.userDetails[0].JobBand?this.state.userDetails[0].JobBand:'',
            joiningdate:this.state.userDetails[0].JoiningDate?new Date(this.state.userDetails[0].JoiningDate):new Date(),
            n_joiningdate:this.state.userDetails[0].JoiningDate?new Date(this.state.userDetails[0].JoiningDate):new Date(),
            mobilenumber:this.state.userDetails[0].MobileNo?this.state.userDetails[0].MobileNo:'',
            alternatenumber:this.state.userDetails[0].AlternateContactNo?this.state.userDetails[0].AlternateContactNo:'',
            pannumber:this.state.userDetails[0].PAN?this.state.userDetails[0].PAN:'',
            aadhernumber:this.state.userDetails[0].AADHAAR?this.state.userDetails[0].AADHAAR:'',
            uannumber:this.state.userDetails[0].PF_UAN?this.state.userDetails[0].PF_UAN:'',
            passportnumber:this.state.userDetails[0].PassportNo?this.state.userDetails[0].PassportNo:'',
            employeeactive:this.state.userDetails[0].Active?this.state.userDetails[0].Active:'',
            companyemail:this.state.userDetails[0].email?this.state.userDetails[0].email:'',
            personalemail:this.state.userDetails[0].personalEmailId?this.state.userDetails[0].personalEmailId:'',
            employeeid:this.state.userDetails[0].EmpID?this.state.userDetails[0].EmpID:'',
            bloodgroup:this.state.userDetails[0].bloodGroup?this.state.userDetails[0].bloodGroup:'',
            gender:this.state.userDetails[0].gender?this.state.userDetails[0].gender:'',
            resignationdate:this.state.userDetails[0].ResignationDate?new Date(this.state.userDetails[0].ResignationDate):new Date(),
            n_resignationdate:this.state.userDetails[0].ResignationDate?new Date(this.state.userDetails[0].ResignationDate):new Date(),
            leavingdate:this.state.userDetails[0].LeavingDate?new Date(this.state.userDetails[0].LeavingDate):new Date(),
            n_leavingdate:this.state.userDetails[0].LeavingDate?new Date(this.state.userDetails[0].LeavingDate):new Date()
          });
          updateId[0]=0;
        }
        //console.log("items=="+this.state.userDetails,this.state.userDetails[0].FirstName,this.state.userDetails[0].LastName);
      });      
    }
  }
  // componentWillMount()
  // {
  //   this.getAllUserDetails();
  // }

  handleInputChange(event)
  {
    console.log("name-----"+event.target.name,event.target.value);
    this.setState({[event.target.name]:event.target.value});

    if(event.target.name==="businesstitle")
    {
      var current_Desgination = event.target.value;
      this.fetchReportingPerson(current_Desgination);
    }
    if(event.target.name==="aadhernumber")
    {
      var value = event.target.value;
      value = value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
      //console.log("value--"+value);
      this.setState({aadhernumber:value});
    }

    
  }

  fetchReportingPerson(current_Desgination)
  {
    var Role_hierarchy_List =["CEO","President","VP","Manager","Assistant Manager","Developer"];
    if(current_Desgination!="CEO")
    {
      var reporting_personrole = Role_hierarchy_List[Role_hierarchy_List.indexOf(current_Desgination)-1];
      console.log("reporting_personrole=="+reporting_personrole);
      fetch('http://localhost:4000/getReportingPersonsIDByRole/'+reporting_personrole)
      .then(res=>res.json())
      .then(json=>{
      console.log("res.length"+Object.keys(json).length);
      var responseLength = Object.keys(json).length;
      if(responseLength!=0)
      this.setState({reportingpersonDetails:json});
      else
      this.setState({reportingpersonDetails:[]});
      });
    }
    else if(current_Desgination=="CEO")
    {
      this.setState({reportingpersonDetails:[]});
    }
  }

  handleDateChange = (date) => {
    if(date!=null){
      var n_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      this.setState({
        n_dob: n_date
      });
  
      this.setState({
        dob: date
      });
      console.log("n_date="+n_date);
    }
   
  };

  handleDateChange2 = (date) => {
    if(date!=null){
      var n_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      this.setState({
        n_joiningdate: n_date
      });

      this.setState({
        joiningdate: date
      });
      console.log("n_date="+n_date);
    }
  };
  handleDateChange3 = (date) => {
    if(date!=null){
      var n_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      this.setState({
        n_resignationdate: n_date
      });

      this.setState({
        resignationdate: date
      });
      console.log("n_date="+n_date);
    }
  };

  handleDateChange4 = (date) => {
    if(date!=null){
      var n_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      this.setState({
        n_leavingdate: n_date
      });

      this.setState({
        leavingdate: date
      });
      console.log("n_date="+n_date);
    }
  };

  getAllUserDetails()
  {
   
    //fetch('https://localhost:8082/employee/employeeMaster/viewAll')
    fetch('http://localhost:4000/getUserDetails')
    .then(res=>res.json())
    .then(json=>{
      var responseLength = Object.keys(json).length;
      if(responseLength!=0){
        this.setState({
          items:json
        });

      //  const dispatch = useDispatch();
      // dispatch(addEmployee(json));
        //employeeReducer.initialState.EmployeeDetails=json;
      }

      // for(let i=0;i<this.state.items.length;i++)
      // {
      //   var temparr=[];
      //   temparr.push(i+1,this.state.items[i].FirstName,this.state.items[i].LastName,
      //   <Button bsStyle="info"  fill  onClick={this.viewProfileFun}>
      //   View Profile
      //   </Button>);
      //   console.log("temparr="+temparr);
      //   tdArray.push(temparr);
      // }
      

      // // this.tdArray=this.state.items;
      // // console.log("tdArray="+this.tdArray);
    //  console.log("items=="+this.state.items[0].FirstName,this.state.items[0].LastName);
    });
  }

  getAllConfigDetails()
  {
    fetch('http://localhost:4000/getConfigDetails')
    .then(res=>res.json())
    .then(json=>{
      var responseLength = Object.keys(json).length;
      if(responseLength!=0){
        this.setState({
          configDetails:json
        });
        console.log("configDetails=="+this.state.configDetails[0].EmploymentType);
      }
    });
  }

  submitFunction(e)
  {
    console.log(this.state.firstname,this.state.lastname);
  
    e.preventDefault();
    if (this.validateForm())   //----validation---
    {
      fetch('http://localhost:4000/addname', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName:this.state.firstname,
          MiddleName:this.state.middlename,
          LastName:this.state.lastname,
          Initials:this.state.initial,
          FatherName:this.state.fathername,
          SpouseName:this.state.spousename,
          DOB:this.state.n_dob?this.state.n_dob:new Date(),
          CompanyID:this.state.companyid,
          Department:this.state.department,
          BusinessTitle:this.state.businesstitle,
          ReportingPerson:this.state.reportingperson,
          EmploymentType:this.state.employmentType,
          JobBand:this.state.jobband,
          JoiningDate:this.state.n_joiningdate?this.state.n_joiningdate:new Date(),
          MobileNo:this.state.mobilenumber,
          AlternateContactNo:this.state.alternatenumber,
          PAN:this.state.pannumber,
          AADHAAR:this.state.aadhernumber,
          PF_UAN:this.state.uannumber,
          PassportNo:this.state.passportnumber,
          Active:this.state.employeeactive,
          email:this.state.companyemail,
          personalEmailId:this.state.personalemail,
          EmpID:this.state.employeeid,
          bloodGroup:this.state.bloodgroup,
          gender:this.state.gender,
          ResignationDate:this.state.n_resignationdate?this.state.n_resignationdate:new Date(),
          LeavingDate:this.state.n_leavingdate?this.state.n_leavingdate:new Date()
        }),
      })
      .then((res)=>{
        this.setState({
          firstname:"",
          middlename:"",
          lastname:"",
          initial:"",
          fathername:"",
          spousename:"",
          n_dob:"",
          dob:new Date(),
          companyid:"",
          department:"",
          businesstitle:"",
          reportingperson:"",
          employmentType:"",
          jobband:"",
          n_joiningdate:"",
          joiningdate:new Date(),
          mobilenumber:"",
          alternatenumber:"",
          pannumber:"",
          aadhernumber:"",
          uannumber:"",
          passportnumber:"",
          employeeactive:"",
          companyemail:"",
          personalemail:"",
          employeeid:"",
          bloodgroup:"",
          gender:"",
          n_resignationdate:"",
          resignationdate:new Date(),
          n_leavingdate:"",
          leavingdate:new Date(),
          Id:""});
        this.getAllUserDetails();
        window.alert('New Profile Added');
      });
    }
    //------
   
  }

  updateFunction(e)
  {
    console.log(this.state.firstname,this.state.lastname,this.state.Id);
    e.preventDefault();
    console.log(this.state.firstname,this.state.lastname,this.state.Id);
    if (this.validateForm())   //----validation---
    {
      console.log(this.state.firstname,this.state.lastname,this.state.Id);
      fetch('http://localhost:4000/updateById/'+this.state.Id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName:this.state.firstname,
          MiddleName:this.state.middlename,
          LastName:this.state.lastname,
          Initials:this.state.initial,
          FatherName:this.state.fathername,
          SpouseName:this.state.spousename,
          DOB:this.state.n_dob?this.state.n_dob:new Date(),
          CompanyID:this.state.companyid,
          Department:this.state.department,
          BusinessTitle:this.state.businesstitle,
          ReportingPerson:this.state.reportingperson,
          EmploymentType:this.state.employmentType,
          JobBand:this.state.jobband,
          JoiningDate:this.state.n_joiningdate?this.state.n_joiningdate:new Date(),
          MobileNo:this.state.mobilenumber,
          AlternateContactNo:this.state.alternatenumber,
          PAN:this.state.pannumber,
          AADHAAR:this.state.aadhernumber,
          PF_UAN:this.state.uannumber,
          PassportNo:this.state.passportnumber,
          Active:this.state.employeeactive,
          email:this.state.companyemail,
          personalEmailId:this.state.personalemail,
          EmpID:this.state.employeeid,
          bloodGroup:this.state.bloodgroup,
          gender:this.state.gender,
          ResignationDate:this.state.n_resignationdate?this.state.n_resignationdate:new Date(),
          LeavingDate:this.state.n_leavingdate?this.state.n_leavingdate:new Date()
        }),
      })
      .then((res)=>{
        this.setState({
          firstname:"",
          middlename:"",
          lastname:"",
          initial:"",
          fathername:"",
          spousename:"",
          n_dob:"",
          dob:new Date(),
          companyid:"",
          department:"",
          businesstitle:"",
          reportingperson:"",
          employmentType:"",
          jobband:"",
          n_joiningdate:"",
          joiningdate:new Date(),
          mobilenumber:"",
          alternatenumber:"",
          pannumber:"",
          aadhernumber:"",
          uannumber:"",
          passportnumber:"",
          employeeactive:"",
          companyemail:"",
          personalemail:"",
          employeeid:"",
          bloodgroup:"",
          gender:"",
          n_resignationdate:"",
          resignationdate:new Date(),
          n_leavingdate:"",
          leavingdate:new Date(),
          Id:"",
          updateProfile:false
        });
        window.alert('Updation successful');
        this.getAllUserDetails();
      });
    }
  
  }
  
  fetchUserFullDetailById(event)
  {
    console.log("value=="+event.target.value);
    if(event.target.value!=''){
      
      this.setState({Id:event.target.value,
        errors: {}
      });
      this.setState({updateProfile:true});
      fetch('http://localhost:4000/getUserDetailsById/'+event.target.value)
      .then(res=>res.json())
      .then(json=>{
        var responseLength = Object.keys(json).length;
        if(responseLength!=0){
          this.setState({userDetails:json});
        // console.log("userDetails="+this.state.userDetails[0].DOB);
        // var n1 = new Date("11/8/2019");//month-date-year (or) year-date-month
        // console.log("q=",n1.getMonth()+1,n1.getDate(),n1.getFullYear());
          this.fetchReportingPerson(this.state.userDetails[0].BusinessTitle);
          this.setState({
            firstname:this.state.userDetails[0].FirstName?this.state.userDetails[0].FirstName:'',
            middlename:this.state.userDetails[0].MiddleName?this.state.userDetails[0].MiddleName:'',
            lastname:this.state.userDetails[0].LastName?this.state.userDetails[0].LastName:'',
            initial:this.state.userDetails[0].Initials?this.state.userDetails[0].Initials:'',
            fathername:this.state.userDetails[0].FatherName?this.state.userDetails[0].FatherName:'',
            spousename:this.state.userDetails[0].SpouseName?this.state.userDetails[0].SpouseName:'',
            dob:this.state.userDetails[0].DOB?new Date(this.state.userDetails[0].DOB):new Date(),
            n_dob:this.state.userDetails[0].DOB?new Date(this.state.userDetails[0].DOB):new Date(),
            companyid:this.state.userDetails[0].CompanyID?this.state.userDetails[0].CompanyID:'',
            department:this.state.userDetails[0].Department?this.state.userDetails[0].Department:'',
            businesstitle:this.state.userDetails[0].BusinessTitle?this.state.userDetails[0].BusinessTitle:'',
            reportingperson:this.state.userDetails[0].ReportingPerson?this.state.userDetails[0].ReportingPerson:'',
            employmentType:this.state.userDetails[0].EmploymentType?this.state.userDetails[0].EmploymentType:'',
            jobband:this.state.userDetails[0].JobBand?this.state.userDetails[0].JobBand:'',
            joiningdate:this.state.userDetails[0].JoiningDate?new Date(this.state.userDetails[0].JoiningDate):new Date(),
            n_joiningdate:this.state.userDetails[0].JoiningDate?new Date(this.state.userDetails[0].JoiningDate):new Date(),
            mobilenumber:this.state.userDetails[0].MobileNo?this.state.userDetails[0].MobileNo:'',
            alternatenumber:this.state.userDetails[0].AlternateContactNo?this.state.userDetails[0].AlternateContactNo:'',
            pannumber:this.state.userDetails[0].PAN?this.state.userDetails[0].PAN:'',
            aadhernumber:this.state.userDetails[0].AADHAAR?this.state.userDetails[0].AADHAAR:'',
            uannumber:this.state.userDetails[0].PF_UAN?this.state.userDetails[0].PF_UAN:'',
            passportnumber:this.state.userDetails[0].PassportNo?this.state.userDetails[0].PassportNo:'',
            employeeactive:this.state.userDetails[0].Active?this.state.userDetails[0].Active:'',
            companyemail:this.state.userDetails[0].email?this.state.userDetails[0].email:'',
            personalemail:this.state.userDetails[0].personalEmailId?this.state.userDetails[0].personalEmailId:'',
            employeeid:this.state.userDetails[0].EmpID?this.state.userDetails[0].EmpID:'',
            bloodgroup:this.state.userDetails[0].bloodGroup?this.state.userDetails[0].bloodGroup:'',
            gender:this.state.userDetails[0].gender?this.state.userDetails[0].gender:'',
            resignationdate:this.state.userDetails[0].ResignationDate?new Date(this.state.userDetails[0].ResignationDate):new Date(),
            n_resignationdate:this.state.userDetails[0].ResignationDate?new Date(this.state.userDetails[0].ResignationDate):new Date(),
            leavingdate:this.state.userDetails[0].LeavingDate?new Date(this.state.userDetails[0].LeavingDate):new Date(),
            n_leavingdate:this.state.userDetails[0].LeavingDate?new Date(this.state.userDetails[0].LeavingDate):new Date()
          });

          console.log("items=="+this.state.userDetails,this.state.userDetails[0].FirstName,this.state.userDetails[0].LastName);
        }
      });
    
    }
    else if(event.target.value==''){
      this.setState({
        firstname:"",
        middlename:"",
        lastname:"",
        initial:"",
        fathername:"",
        spousename:"",
        n_dob:"",
        dob:new Date(),
        companyid:"",
        department:"",
        businesstitle:"",
        reportingperson:"",
        employmentType:"",
        jobband:"",
        n_joiningdate:"",
        joiningdate:new Date(),
        mobilenumber:"",
        alternatenumber:"",
        pannumber:"",
        aadhernumber:"",
        uannumber:"",
        passportnumber:"",
        employeeactive:"",
        companyemail:"",
        personalemail:"",
        employeeid:"",
        bloodgroup:"",
        gender:"",
        n_resignationdate:"",
        resignationdate:new Date(),
        n_leavingdate:"",
        leavingdate:new Date(),
        Id:"",
        updateProfile:false
      });
    }
  }
  setStartDate(date)
  {
    this.setState({startDate:date})
  }
  //---------validation------
  validateForm() {

  //  let fields = this.state.fields;
  console.log("valid==="+this.state.firstname,typeof this.state.firstname);
    let errors = {};
    let formIsValid = true;

    if (!this.state.firstname) {
      formIsValid = false;
      errors["firstname"] = "*Please enter First Name.";
    }

    if (this.state.firstname != "") {
      if (!this.state.firstname.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["firstname"] = "*Please enter alphabet characters only.";
      }
    }

    // if (!this.state.middlename) {
    //   formIsValid = false;
    //   errors["middlename"] = "*Please enter Middle Name.";
    // }

    if (this.state.middlename != "") {
      if (!this.state.middlename.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["middlename"] = "*Please enter alphabet characters only.";
      }
    }

    // if (!this.state.lastname) {
    //   formIsValid = false;
    //   errors["lastname"] = "*Please enter Last Name.";
    // }

    if (this.state.lastname != "") {
      if (!this.state.lastname.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.initial) {
      formIsValid = false;
      errors["initial"] = "*Please enter initial.";
    }

    if (this.state.initial != "") {
      if (!this.state.initial.match(/^[a-zA-Z.]*$/)) {
        formIsValid = false;
        errors["initial"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.fathername) {
      formIsValid = false;
      errors["fathername"] = "*Please enter Father Name.";
    }

    if (this.state.fathername != "") {
      if (!this.state.fathername.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["fathername"] = "*Please enter alphabet characters only.";
      }
    }

    // if (!this.state.spousename) {
    //   formIsValid = false;
    //   errors["spousename"] = "*Please enter Spouse Name.";
    // }

    if (this.state.spousename != "") {
      if (!this.state.spousename.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["spousename"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.dob) {
      formIsValid = false;
      errors["dob"] = "*Please select Date of Birth.";
    }

    if (!this.state.companyid) {
      formIsValid = false;
      errors["companyid"] = "*Please select Company ID.";
    }

    if (!this.state.department) {
      formIsValid = false;
      errors["department"] = "*Please select Department.";
    }

    if (!this.state.businesstitle) {
      formIsValid = false;
      errors["businesstitle"] = "*Please select Business Title.";
    }

    if (!this.state.reportingperson) {
      formIsValid = false;
      errors["reportingperson"] = "*Please select Reporting Person.";
    }

    if (!this.state.employmentType) {
      formIsValid = false;
      errors["employmentType"] = "*Please select Employment Type.";
    }

    if (!this.state.jobband) {
      formIsValid = false;
      errors["jobband"] = "*Please select Job Band.";
    }

    if (!this.state.joiningdate) {
      formIsValid = false;
      errors["joiningdate"] = "*Please select Joining Date.";
    }

    if (!this.state.mobilenumber) {
      formIsValid = false;
      errors["mobilenumber"] = "*Please enter Mobile Number.";
    }

    if (this.state.mobilenumber != "") {
      if (!this.state.mobilenumber.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobilenumber"] = "*Please enter valid Mobile Number.";
      }
    }

    if (!this.state.alternatenumber) {
      formIsValid = false;
      errors["alternatenumber"] = "*Please enter Alternate Number.";
    }

    if (this.state.alternatenumber != "") {
      if (!this.state.alternatenumber.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["alternatenumber"] = "*Please enter valid Alternate Number.";
      }
    }

    if (!this.state.pannumber) {
      formIsValid = false;
      errors["pannumber"] = "*Please enter PAN Number.";
    }

    if (this.state.pannumber != "") {
      if (!this.state.pannumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
        formIsValid = false;
        errors["pannumber"] = "*Please enter valid PAN Number.";
      }
    }

    if (!this.state.aadhernumber) {
      formIsValid = false;
      errors["aadhernumber"] = "*Please enter AADHAR Number.";
    }

    if (this.state.aadhernumber != "") {
     // if (!this.state.aadhernumber.match(/^\d{4}-\d{4}-\d{4}$/)) {
      if (!this.state.aadhernumber.match(/^\d{4}-\d{4}-\d{4}$/)) {
        formIsValid = false;
        errors["aadhernumber"] = "*Please enter valid AADHAR Number.";
      }
    }

    if (!this.state.uannumber) {
      formIsValid = false;
      errors["uannumber"] = "*Please enter UAN Number.";
    }

    if (this.state.uannumber != "") {
      if (!this.state.uannumber.match(/^[a-zA-Z]{5}\d{17}$/)) {
        formIsValid = false;
        errors["uannumber"] = "*Please enter valid UAN Number.";
      }
    }

    if (!this.state.passportnumber) {
      formIsValid = false;
      errors["passportnumber"] = "*Please enter Passport Number.";
    }

    if (this.state.passportnumber != "") {
      if (!this.state.passportnumber.match(/^[a-zA-Z]{1}[0-9]{7}$/)) {
        formIsValid = false;
        errors["passportnumber"] = "*Please enter valid Passport Number.";
      }
    }

    if (!this.state.employeeactive) {
      formIsValid = false;
      errors["employeeactive"] = "*Please Select Employee Active.";
    }

    if (!this.state.companyemail) {
      formIsValid = false;
      errors["companyemail"] = "*Please enter Company Email.";
    }

    if (this.state.companyemail != "") {
      if (!this.state.companyemail.match(/^((([a-zA-Z0-9]+[-._]*){0,2})[a-zA-Z0-9]+@[a-z0-9][a-z0-9-]*\.[a-z]+[[\.]?[a-z]+]*)$/)) {
        formIsValid = false;
        errors["companyemail"] = "*Please enter valid Email-ID.";
      }
    }

    if (!this.state.personalemail) {
      formIsValid = false;
      errors["personalemail"] = "*Please enter Personal Email.";
    }

    if (this.state.personalemail != "") {
      if (!this.state.personalemail.match(/^((([a-zA-Z0-9]+[-._]*){0,2})[a-zA-Z0-9]+@[a-z0-9][a-z0-9-]*\.[a-z]+[[\.]?[a-z]+]*)$/)) {
        formIsValid = false;
        errors["personalemail"] = "*Please enter valid Email-ID.";
      }
    }

    if (!this.state.employeeid) {
      formIsValid = false;
      errors["employeeid"] = "*Please enter Employee ID.";
    }

    // if (this.state.employeeid != "") {
    //   if (!this.state.employeeid.match(/^[a-zA-Z]{1}[0-9]{7}$/)) {
    //     formIsValid = false;
    //     errors["employeeid"] = "*Please enter valid Passport Number.";
    //   }
    // }
    if (!this.state.bloodgroup) {
      formIsValid = false;
      errors["bloodgroup"] = "*Please enter Blood Group.";
    }

    if (!this.state.gender) {
      formIsValid = false;
      errors["gender"] = "*Please select Gender.";
    }

    if (!this.state.resignationdate) {
      formIsValid = false;
      errors["resignationdate"] = "*Please enter Resignation Date.";
    }

    if (!this.state.leavingdate) {
      formIsValid = false;
      errors["leavingdate"] = "*Please enter Leaving Date.";
    }

    // if (!fields["emailid"]) {
    //   formIsValid = false;
    //   errors["emailid"] = "*Please enter your email-ID.";
    // }

    // if (typeof fields["emailid"] !== "undefined") {
    //   //regular expression for email validation
    //   var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //   if (!pattern.test(fields["emailid"])) {
    //     formIsValid = false;
    //     errors["emailid"] = "*Please enter valid email-ID.";
    //   }
    // }

    // if (!fields["mobileno"]) {
    //   formIsValid = false;
    //   errors["mobileno"] = "*Please enter your mobile no.";
    // }

    // if (typeof fields["mobileno"] !== "undefined") {
    //   if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
    //     formIsValid = false;
    //     errors["mobileno"] = "*Please enter valid mobile no.";
    //   }
    // }

    // if (!fields["password"]) {
    //   formIsValid = false;
    //   errors["password"] = "*Please enter your password.";
    // }

    // if (typeof fields["password"] !== "undefined") {
    //   if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter secure and strong password.";
    //   }
    // }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }
  //-------------------------
  render() {
   
    var {items,firstnameval,configDetails,reportingpersonDetails} = this.state;
    let button;
    console.log("updateProfile=="+this.state.updateProfile);
    if(this.state.updateProfile==false){
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
                title="Employees Details:"
                content={
                  <form>
                    <div className="row">
                     
                     <div className="col-md-3"> 
                        <select className="form-control" onChange={this.fetchUserFullDetailById} value={this.state.Id}>
                        <option key='0' value=''>- Choose Employee -</option>
                          {items.map(item=>(
                            <option key={item._id} value={item._id}>
                              {item.FirstName}
                            </option>
                          ))}
                        </select>
                        {/* <input type="text" className="form-control" name="firstname" value={this.state.firstname}  onChange={this.handleInputChange} /> */}
                     </div>
                     <div className="col-md-3">
                       {/* <EmpList/> */}
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>First Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="firstname" value={this.state.firstname}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.firstname}</div>
                     </div>
                     <div className="col-md-3"><label>Middle Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="middlename" value={this.state.middlename}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.middlename}</div>
                     </div>
                     <div className="col-md-3"><label>Last Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="lastname" value={this.state.lastname}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.lastname}</div>
                     </div>
                     <div className="col-md-3"><label>Initial:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="initial" value={this.state.initial}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.initial}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Father Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="fathername" value={this.state.fathername}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.fathername}</div>
                     </div>
                     <div className="col-md-3"><label>Spouse Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="spousename" value={this.state.spousename}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.spousename}</div>
                     </div>
                     <div className="col-md-3"><label>Date of Birth:</label>
                        {/* <input type="text" className="form-control" name="dob" value={this.state.dob}  onChange={this.handleInputChange} /> */}
                        <DatePicker className="form-control customDatePickerWidth"
                        selected={ this.state.dob }
                       // onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleDateChange} //only when value has changed
                        name="dob"
                      />
                      <div className="errorMsg">{this.state.errors.dob}</div>
                     </div>
                     <div className="col-md-3"><label>Company ID:</label>
                      <select className="form-control" name="companyid" value={this.state.companyid} onChange={this.handleInputChange}>
                        <option key='0' value=''>- Choose Company ID -</option>
                          {configDetails.map(data=>(
                            data.CompanyId?<option key={data.CompanyId} value={data.CompanyId}>
                              {data.CompanyId}
                            </option>:''
                          ))}
                      </select>
                      <div className="errorMsg">{this.state.errors.companyid}</div>
                        {/* <input type="text" className="form-control" name="companyid " value={this.state.companyid}  onChange={this.handleInputChange} /> */}
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3">
                       <label>Department:</label>
                        <select className="form-control" name="department" onChange={this.handleInputChange} value={this.state.department}>
                        <option key='0' value=''>- Choose Department -</option>
                          {configDetails.map(data=>(
                            data.Department?<option key={data.Department} value={data.Department}>
                              {data.Department}
                            </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.department}</div>
                     </div>
                     <div className="col-md-3"><label>Business Title:</label>
                        <select className="form-control" name="businesstitle" onChange={this.handleInputChange} value={this.state.businesstitle}>
                        <option key='0' value=''>- Choose Business Title -</option>
                          {configDetails.map(data=>(
                            data.BusinessTitle?<option key={data.BusinessTitle} value={data.BusinessTitle}>
                              {data.BusinessTitle}
                            </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.businesstitle}</div>
                     </div>
                     <div className="col-md-3"><label>Reporting Person:</label>
                        {/* <input type="text" className="form-control" name="reportingperson" value={this.state.reportingperson}  onChange={this.handleInputChange} /> */}
                        <select className="form-control" name="reportingperson" onChange={this.handleInputChange} value={this.state.reportingperson}>
                        <option key='0' value=''>- Choose Reporting Person -</option>
                          {reportingpersonDetails.map(data=>(
                            data.EmpID?<option key={data.EmpID} value={data.EmpID}>
                              {data.FirstName}
                            </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.reportingperson}</div>
                     </div>
                     <div className="col-md-3"><label>Employment Type:</label>
                        <select className="form-control" name="employmentType" onChange={this.handleInputChange} value={this.state.employmentType}>
                        <option key='0' value=''>- Choose Employment Type -</option>
                         {configDetails.map(data=>(
                            data.EmploymentType?<option key={data.EmploymentType} value={data.EmploymentType}>
                            {data.EmploymentType}
                          </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.employmentType}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Job Band:</label>
                        {/* <input type="text" className="form-control" name="jobband " value={this.state.jobband}  onChange={this.handleInputChange} /> */}
                        <select className="form-control" name="jobband" onChange={this.handleInputChange} value={this.state.jobband}>
                        <option key='0' value=''>- Choose Job Band -</option>
                         {configDetails.map(data=>(
                            data.JobBand?<option key={data.JobBand} value={data.JobBand}>
                            {data.JobBand}
                          </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.jobband}</div>
                     </div>
                     <div className="col-md-3"><label>Joining Date:</label>
                        {/* <input type="text" className="form-control" name="joiningdate" value={this.state.joiningdate}  onChange={this.handleInputChange} /> */}
                        <DatePicker className="form-control customDatePickerWidth"
                        selected={ this.state.joiningdate }
                       // onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleDateChange2} //only when value has changed
                        name="joiningdate"
                        />
                        <div className="errorMsg">{this.state.errors.joiningdate}</div>
                     </div>
                     <div className="col-md-3"><label>Mobile Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="mobilenumber" value={this.state.mobilenumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.mobilenumber}</div>
                     </div>
                     <div className="col-md-3"><label>Alternate Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="alternatenumber" value={this.state.alternatenumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.alternatenumber}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>PAN Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="pannumber" value={this.state.pannumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.pannumber}</div>
                     </div>
                     <div className="col-md-3"><label>AADHAR Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="aadhernumber" value={this.state.aadhernumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.aadhernumber}</div>
                     </div>
                     <div className="col-md-3"><label>UAN (PF):</label>
                        <input type="text" autoComplete="off" className="form-control" name="uannumber" value={this.state.uannumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.uannumber}</div>
                     </div>
                     <div className="col-md-3"><label>Passport Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="passportnumber" value={this.state.passportnumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.passportnumber}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Employee Active:</label>
                        {/* <input type="text" autoComplete="off" className="form-control" name="employeeactive " value={this.state.employeeactive}  onChange={this.handleInputChange} /> */}
                        <select className="form-control" name="employeeactive" onChange={this.handleInputChange} value={this.state.employeeactive}>
                        <option key='0' value=''>- Choose -</option>
                        <option key='1' value='Yes'>Yes</option>
                        <option key='2' value='No'>No</option>
                        </select>
                        <div className="errorMsg">{this.state.errors.employeeactive}</div>
                     </div>
                     <div className="col-md-3"><label>Company Email:</label>
                        <input type="text" autoComplete="off" className="form-control" name="companyemail" value={this.state.companyemail}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.companyemail}</div>
                     </div>
                     <div className="col-md-3"><label>Personal Email:</label>
                        <input type="text" autoComplete="off" className="form-control" name="personalemail" value={this.state.personalemail}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.personalemail}</div>
                     </div>
                     <div className="col-md-3"><label>Employee ID:</label>
                        <input type="text" autoComplete="off" className="form-control" name="employeeid" value={this.state.employeeid}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.employeeid}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Blood Group:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="bloodgroup" value={this.state.bloodgroup}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.bloodgroup}</div>
                     </div>
                     <div className="col-md-3"><label>Gender:</label>
                        {/* <input type="text" autoComplete="off" className="form-control" name="gender" value={this.state.gender}  onChange={this.handleInputChange} /> */}
                        <select className="form-control" name="gender" onChange={this.handleInputChange} value={this.state.gender}>
                        <option key='0' value=''>- Choose Gender -</option>
                        <option key='1' value='Male'>Male</option>
                        <option key='2' value='Female'>Female</option>
                        <option key='3' value='Transgender'>Transgender</option>
                        </select>
                        <div className="errorMsg">{this.state.errors.gender}</div>
                     </div>
                     <div className="col-md-3"><label>Resignation Date:</label>
                        {/* <input type="text" className="form-control" name="resignationdate" value={this.state.resignationdate}  onChange={this.handleInputChange} /> */}
                        <DatePicker className="form-control customDatePickerWidth"
                        selected={ this.state.resignationdate }
                       // onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleDateChange3} //only when value has changed
                        name="resignationdate"
                        />
                        <div className="errorMsg">{this.state.errors.resignationdate}</div>
                     </div>
                     <div className="col-md-3"><label>Leaving Date:</label>
                        {/* <input type="text" className="form-control" name="leavingdate" value={this.state.leavingdate}  onChange={this.handleInputChange} /> */}
                        <DatePicker className="form-control customDatePickerWidth"
                        selected={ this.state.leavingdate }
                       // onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleDateChange4} //only when value has changed
                        name="leavingdate"
                        />
                        <div className="errorMsg">{this.state.errors.leavingdate}</div>
                     </div>
                   </div>
                   
                   
                   {/* <Button bsStyle="info"  fill  onClick={this.submitFunction}>
                      Save Profile
                    </Button>
                    <Button bsStyle="info" pullRight fill  onClick={this.updateFunction}>
                      Update Profile
                    </Button> */}

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

export default EmployeeForm;
