import React, { createContext, useState } from "react";

export const AuthContext = createContext({})
function AuthProvider({ children }){
    const [user, setUser] = useState({
        nome: "Tiao",
        id: 5454545
    })

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider