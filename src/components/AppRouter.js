import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
// import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../index'

import Login from './Login/Login'
import Chat from './Chat/Chat'

const AppRouter = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    return user ? (
        <Routes>
            <Route
                key={CHAT_ROUTE}
                path={CHAT_ROUTE}
                element={
                    user ? <Chat /> : <Navigate to={LOGIN_ROUTE} replace />
                }
                exact={true}
            />

            <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} />
        </Routes>
    ) : (
        <Routes>
            <Route
                key={LOGIN_ROUTE}
                path={LOGIN_ROUTE}
                element={<Login />}
                exact={true}
            />
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    )

    // return user ? (
    //     <Routes>
    //         {privateRoutes.map(({ path, Component }) => (
    //             <Route
    //                 key={path}
    //                 path={path}
    //                 element={Component}
    //                 exact={true}
    //             />
    //         ))}
    //     </Routes>
    // ) : (
    //     <Routes>
    //         {publicRoutes.map(({ path, Component }) => (
    //             <Route
    //                 key={path}
    //                 path={path}
    //                 element={Component}
    //                 exact={true}
    //             />
    //         ))}
    //     </Routes>
    // )
}

export default AppRouter
