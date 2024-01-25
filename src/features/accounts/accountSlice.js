const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}
export function accountReducer(state = initialStateAccount, action) {
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
