import {ReactElement, createContext, useState} from "react";
import {IUser} from "../user/model.ts";

const getDefaultContext = () => {
    return {
        signInRedirectCallback: () => {throw new Error('Sign in redirect callback not used')},
        logout: async () => {},
        signOutRedirectCallback: async () => {},
        isAuthenticated: () => false,
        signInRedirect: async () => {},
        signInSilentCallback: async () => {},
        createSignInRequest: async () => {}
    }
};

export interface AuthContextValue {
    signInRedirectCallback: () => Promise<IUser>
    logout: () => Promise<void>,
    signOutRedirectCallback: () => Promise<void>,
    isAuthenticated: () => boolean,
    signInRedirect: () => Promise<void>,
    signInSilentCallback: () => Promise<void>,
    createSignInRequest: () => Promise<any>
}

export const AuthContext = createContext<AuthContextValue>({
    ...getDefaultContext()
});

export const AuthDispatchContext = createContext<(context: AuthContextValue) => void>(() => {});

export const AuthContextProvider = ({ children }: { children: ReactElement }) => {
    const [context, setContext] = useState<AuthContextValue>({
        ...getDefaultContext()
    });

    return (
        <AuthContext.Provider value={context}>
            <AuthDispatchContext.Provider value={setContext}>{children}</AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}