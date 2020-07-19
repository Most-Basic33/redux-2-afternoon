import axios from 'axios'

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading:false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA',
    ADD_PURCHASE = 'ADD_PURCHASE',
    REMOVE_PURCHASE = 'REMOVE_PURCHASE'

    export function addPurchase(price, description, category){
        let data = axios.post(`/api/budget-data/purchase`,{
            description,
            price,
            category
        }).then(res=>res.data)
        return{
            type:ADD_PURCHASE,
            payload:data
        }
    }

export const removePurchase=(id)=>{
    let data = axios.delete(`/api/budget-data/purchase/${id}`)
    .then(res=>res.data)
    return{
        type: REMOVE_PURCHASE,
        payload: data
    }
}
// SET UP AN ACTION CREATOR THAT RETURNS AN ACTION OBJECT WITH A TYPE AND PAYLOAD PROPERTY
export function requestBudgetData(){
    let data =  axios.get(`/api/budget-data`)
    .then(res=>res.data)
    return{
        type:REQUEST_BUDGET_DATA,
        payload:data
    }
}
    // IN ORDER TO KEEP VALUES PREVIOUSLY STORED ON STATE, WE SPREAD THE CURRENT STATE OBJECT
    // INTO THE RETURNED OBJECT AND UPDATE ONLY THE VALUES IN STATE WE WANT TO CHANGE
 
export default function reducer(state=initialState, action){
 const {payload, type} = action
 switch (type) {
     case REQUEST_BUDGET_DATA + '_PENDING':
         return {...state, loading:true}
    case REQUEST_BUDGET_DATA + '_FULFILLED':
        return {...state, ...payload, loading: false}
        case ADD_PURCHASE + '_FULFILLED':
            return {...state, purchases: payload, loading: false}
            case REMOVE_PURCHASE + '_FULFILLED':
                return {...state, loading: false, purchases: payload}
     default:
        return state
 }
     
    
}