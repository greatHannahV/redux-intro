import { combineReducers, createStore } from 'redux'
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}
const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      }

    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      }
    case 'account/requestLoan':
      if (state.loan > 0) return state
      return {
        ...state,
        //later
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      }
    case 'account/payLoan':
      return {
        ...state,
        balance: state.balance - state.loan,
        loanPurpose: '',
        loan: 0,
      }

    default:
      return state
  }
}
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      }
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      }

    default:
      return state
  }
}
//combine all reducers that we have
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})
const store = createStore(rootReducer)

// store.dispatch({ type: 'account/deposit', payload: 500 })
// console.log(store.getState())
// store.dispatch({ type: 'account/withdraw', payload: 100 })
// console.log(store.getState())
// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { amount: 1000, purpose: 'car' },
// })
// console.log(store.getState())
// store.dispatch({
//   type: 'account/payLoan',
// })
// console.log(store.getState())

function deposit(amount) {
  return { type: 'account/deposit', payload: amount }
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount }
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  }
}

function payLoan() {
  return {
    type: 'account/payLoan',
  }
}

store.dispatch(deposit(500))
store.dispatch(withdraw(300))
store.dispatch(requestLoan(1000, 'car'))
console.log(store.getState())
store.dispatch(payLoan())
console.log(store.getState())

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  }
}
store.dispatch(createCustomer('Boryana Mokova', 123325468))
console.log(store.getState())

function updateName(newName) {
  return {
    type: 'customer/updateName',
    payload: newName,
  }
}
store.dispatch(updateName('Angela Galkina'))
console.log(store.getState())
