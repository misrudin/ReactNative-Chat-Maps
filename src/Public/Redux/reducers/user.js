const initialValue = {
  dataUser: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  datalogin: [],
  token: '',
};

const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'REGISTER_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataUser: action.payload.data.result,
      };
    case 'LOGIN_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        datalogin: action.payload.data,
        token: action.payload.data.token,
      };
    case 'TOKEN_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'TOKEN_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'TOKEN_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        datalogin: action.payload.data,
        token: action.payload,
      };
    case 'ID_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'ID_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'ID_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        datalogin: action.payload.data,
        dataUser: action.payload.data.result,
      };
    case 'ROLE_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'ROLE_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'ROLE_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataUser: action.payload.data.result,
      };
    default:
      return state;
  }
};

export default userReducer;
