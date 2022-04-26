import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Context } from './index'
import { useAuthState } from 'react-firebase-hooks/auth'
//UI
import Loader from './components/UI/Loader/Loader'

//Components
import Navbar from './components/Navbar/Navbar'
import AppRouter from './components/AppRouter'

function App() {
    const { auth } = useContext(Context)
    const [user, loading, error] = useAuthState(auth)

    if (loading) {
        return <Loader />
    }
    return (
        <Router>
            <Navbar />
            <AppRouter></AppRouter>
        </Router>
    )
}

export default App
