import React from "react";
import { IToken } from "../../types/token";

export const userTokenCntx = React.createContext<IToken>({
    Token: undefined,
    TokenRefresh: undefined,
    Message: undefined,
    Tipo: undefined,
});

export const setUserTokenCntx = React.createContext<any>(() => {});