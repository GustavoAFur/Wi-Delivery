import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react'

type AuthProviderProps = {
  children: ReactNode;
}

interface AuthContextData {
  name: string;
  setName: (name: string) => void;
  cpfCnpj: string;
  setCpfCnpj: (cpfCnpj: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  province: string;
  setProvince: (district: string) => void;
  street: string;
  setStreet: (street: string) => void;
  number: string;
  setNumber: (number: string) => void;
  complement: string;
  setComplement: (complement: string) => void;
  reference: string;
  setReference: (reference: string) => void;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

  const [name, setName] = useState<string>('')
  const [cpfCnpj, setCpfCnpj] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [province, setProvince ] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [complement, setComplement] = useState<string>('')
  const [reference, setReference] = useState<string>('')

  return (
    <AuthContext.Provider 
      value={{ 
        name, 
        setName,
        cpfCnpj,
        setCpfCnpj,
        lastName,
        setLastName,
        phone,
        setPhone,
        province,
        setProvince,
        street,
        setStreet,
        number,
        setNumber,
        complement,
        setComplement,
        reference,
        setReference
      }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export {
  AuthProvider,
  useAuth
}
