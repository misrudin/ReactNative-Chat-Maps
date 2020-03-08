const initialValue = {
  data: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  detail: [],
  feature: [],
  filter: [],
};

const laundryReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_DATA_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_DATA_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_DATA_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data.result,
      };
    case 'GET_DETAIL_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_DETAIL_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_DETAIL_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        detail: action.payload.data.result,
      };
    case 'GET_FEATURE_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_FEATURE_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_FEATURE_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        feature: action.payload.data.result,
      };
    case 'FILTER_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'FILTER_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'FILTER_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        filter: action.payload.data.result,
      };
    case 'ADD_LAUNDRY_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'ADD_LAUNDRY_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'ADD_LAUNDRY_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        filter: action.payload.data.result,
      };
    case 'EDIT_LAUNDRY_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'EDIT_LAUNDRY_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'EDIT_LAUNDRY_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        filter: action.payload.data.result,
      };
    case 'FEATURE_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'FEATURE_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'FEATURE_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        filter: action.payload.data.result,
      };

    default:
      return state;
  }
};

export default laundryReducer;
