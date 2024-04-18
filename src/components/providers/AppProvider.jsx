import React from 'react'
import { Provider } from "react-redux";
import store from '../../models/redux/store';

export default function AppProvider({children}) {
  return (
    <Provider store={store}>{children}</Provider>
  )
}
