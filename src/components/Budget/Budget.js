import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux'
import { requestUserData } from './../../ducks/userReducer'
import { requestBudgetData, addPurchase, removePurchase} from './../../ducks/budgetReducer'


class Budget extends Component {

  componentDidMount() {
    this.props.requestBudgetData();
    this.props.requestUserData()
  }


  render() {
      // DESTRUCTURING VALUES HERE IS OPTIONAL BUT RECOMMENDED FOR CLEANER JSX
const { loading, purchases, budgetLimit} = this.props.budget;
const {firstName, lastName} = this.props.user
	    // USE PROPS TO PASS DOWN addPurchase AND removePurchase FUNCTIONS

    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.AddPurchase} />
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase}/>
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    budget: state.budget,
    user: state.user
  }
}
// ADD addPurchase AND removePurchase TO THE 2ND OBJ ARG IN THE CONNECT METHOD

export default connect(mapStateToProps, { requestUserData, requestBudgetData, addPurchase,removePurchase })(Budget);
