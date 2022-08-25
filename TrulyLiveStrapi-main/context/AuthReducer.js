export const initialState = {
  user: null,
  loading: false
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        user: action.payload,
        loading: false
      }
    case 'LOGIN':
      return {
        user: action.payload,
        loading: false
      }
    case 'PROVIDER':
      return {
        user: action.payload,
        loading: false
      }
    case 'LOADING':
      return {
        loading: true
      }
    case 'LOADING_DONE':
      return {
        loading: false
      }
    default:
      return state
  }
}
