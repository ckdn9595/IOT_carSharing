import React, { createContext, useReducer, useContext } from "react";

const curr = new Date();
const utc = 
      curr.getTime() + 
      (curr.getTimezoneOffset() * 60 * 1000);
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
let sDate =  new Date(utc + (KR_TIME_DIFF));
let eDate =  new Date(utc + (KR_TIME_DIFF));
eDate.setDate(eDate.getDate()+1);

const initialState = {
  pageName: '',
  roadAddr: '',
  address: '',
  map: null,
  searchOption:{
    carSizes: [false,false,false,false,false,false],
    startDate: sDate,
    endDate: eDate
  }
};

// const setPage = data => ({
//   pageName: data
// })

// const setAddr = data => ({
//   roadAddr: data.roadAddr,
//   address: data.address
// })


function commonReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':
       return{
        ...state,
        pageName: (action.data)
      };
    case 'SET_ADDR':
      return{
        ...state,
        address: (action.data.address),
        roadAddr: (action.data.roadAddr)
     };
    case 'SET_MAP':
      return{
        ...state,
        map: (action.data),
     };
    case 'SET_OPTION':
      return{
        ...state,
        searchOption: (action.data)
      }
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}
export function CommonProvider({ children }) {
 
  const [state, dispatch] = useReducer(commonReducer, initialState);
  return (
    <CommonStateContext.Provider value={state}>
      <CommonDispatchContext.Provider value={dispatch}>
        {children}
      </CommonDispatchContext.Provider>
    </CommonStateContext.Provider>
  );
}
const CommonStateContext = createContext(null);
const CommonDispatchContext = createContext(null);

export function useCommonState() {
  const state = useContext(CommonStateContext);
  if (!state) {
    throw new Error('Cannot find UsersProvider');
  }
  return state;
}

export function useCommonDispatch() {
  const dispatch = useContext(CommonDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find UsersProvider');
  }
  return dispatch;
}
