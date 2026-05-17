import { useState, useEffect } from 'react'

const state = { isAuth: false, wallet: null, listeners: [] }

function subscribe(fn) {
  state.listeners.push(fn)
  return () => { state.listeners = state.listeners.filter(l => l !== fn) }
}

function notify() {
  state.listeners.forEach(fn => fn({ isAuth: state.isAuth, wallet: state.wallet }))
}

export function login(wallet) {
  state.isAuth = true
  state.wallet = wallet
  notify()
}

export function logout() {
  state.isAuth = false
  state.wallet = null
  notify()
}

export function useAuth() {
  const [auth, setAuth] = useState({ isAuth: state.isAuth, wallet: state.wallet })
  useEffect(() => subscribe(setAuth), [])
  return { ...auth, login, logout }
}
