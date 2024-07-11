import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react'

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextData = {
  kitsCart: Array<Object>
  setKitsCart: React.Dispatch<React.SetStateAction<Array<Object>>>
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

  const [kitsCart, setKitsCart] = useState([])

  return (
    <AuthContext.Provider value={{
      kitsCart,
      //@ts-ignore
      setKitsCart,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context
}

export {
  AuthProvider,
  useAuth
}