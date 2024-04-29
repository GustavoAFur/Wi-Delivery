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
  kitsCarrinho: Array<Object>
  setKitsCarrinho: React.Dispatch<React.SetStateAction<Array<Object>>>
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

  const [kitsCarrinho, setKitsCarrinho] = useState([])

  return (
    <AuthContext.Provider value={{
      kitsCarrinho,
      //@ts-ignore
      setKitsCarrinho,
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