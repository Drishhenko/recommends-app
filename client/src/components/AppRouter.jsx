import React from 'react'
import { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import { routers } from '../routers'
import { Context } from '..'

const AppRouter = () => {
    const {user} = useContext(Context)

    
  return (
      <Routes>
          {routers.map(({path, Component}) => <Route key={path} path={path} element={<Component />} exact/> )}
      </Routes>
  )
}

export default AppRouter
