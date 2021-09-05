import React, {
    createContext,
    FC,
    FormEvent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

interface IAuthContext {
    setToken: (token: string) => void;
    token: string;
    values: {
        userName: string;
        password: string;
    }
    isAuth: boolean | undefined;
    handleSubmit: (ev: FormEvent<HTMLFormElement>) => void
    handleLogout: () => void
    changeHandle: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC = ({ children }) => {
    const [token, setToken] = useState('token');

    const initialValues = () => {
        return { userName: "", password: "" }
    }

    const [values, setValues] = useState(initialValues)

    const [isAuth, setIsAuth] = useState<boolean>();

    const history = useHistory();


    useEffect(() => {
        if (token) {
            setIsAuth(true)
        }
    }, [])

    const onClickLogin = useCallback(
        (userName: string, password: string) => {
            if (userName === 'framework' && password === 'framework') {
                return { token: '123456789' }
            }
            toast.error('Usuário ou senha inválidos')
            return { error: 'Usuário ou senha inválidos' }
        },
        [],
    )

    const changeHandle = useCallback((ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
    }, []);


    const handleSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const { token } = onClickLogin(values.password, values.password);

        if (token) {
            localStorage.setItem('token', JSON.parse(token))
            setToken(token)
            setIsAuth(true)
            return history.push('/')
        }
        setValues(initialValues)
    }, [values])

    const handleLogout = () => {
        setIsAuth(false)
        localStorage.removeItem('token')
        return history.push('/login')
    }

    return (
        <AuthContext.Provider
            value={{
                setToken,
                token,
                values,
                isAuth,
                handleSubmit,
                changeHandle,
                handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
