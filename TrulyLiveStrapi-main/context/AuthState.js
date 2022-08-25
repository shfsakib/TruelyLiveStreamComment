import { createContext, useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { baseUrl } from '../backend'
import { initialState, reducer } from './AuthReducer'
import cookie from 'js-cookie'

export const AuthContext = createContext()

const AuthState = ({ children }) => {
  const [error, setError] = useState(null)

  const [state, dispatch] = useReducer(reducer, initialState)

  const router = useRouter()
  const localRoute = typeof window !== 'undefined' && localStorage.getItem('route')

  const token = cookie.get('token')

  useEffect(() => {
    checkUserLogIn()
  }, [])

  // Register user
  const register = async (user) => {
    try {
      setError(null)
      dispatch({ type: 'LOADING' })
      const res = await fetch(`${baseUrl}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      if (res.ok) {
        dispatch({ type: 'REGISTER', payload: data.user })
        setError(null)
        cookie.set('token', data.jwt, {
          expires: 5
        })
        localRoute ? router.push(`/events/${localRoute}`) : router.push('/onboarding')
      } else {
        setError('Email address already taken')
        dispatch({ type: 'LOADING_DONE' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Login user
  const login = async (user, usersEmails) => {
    try {
      setError(null)
      dispatch({ type: 'LOADING' })

      if (!usersEmails.includes(user.identifier)) {
        setError('Invalid Email address')
        dispatch({ type: 'LOADING_DONE' })
      } else {
        const res = await fetch(`${baseUrl}/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        const data = await res.json()
        if (res.ok) {
          dispatch({ type: 'LOGIN', payload: data.user })
          setError(null)
          cookie.set('token', data.jwt, {
            expires: 5
          })
          localRoute ? router.push(`/events/${localRoute}`) : router.push('/onboarding')
        } else {
          setError('Invalid Password')
          dispatch({ type: 'LOADING_DONE' })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkUserLogIn = async () => {
    try {
      const res = await fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      dispatch({ type: 'LOGIN', payload: data })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        error,
        register,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
