import { TextField, Button, Box, Container } from '@mui/material'
import React, { useContext, useState } from 'react'
import { IToken } from '../../types/token'
import { obterTokenPeloUsuario } from './AppLoginBackEnd';
import { userTokenCntx, setUserTokenCntx } from './authToken';

const AppLogin = () => {
    let user = useContext(userTokenCntx);
    const setCntxToken = useContext(setUserTokenCntx);

    const [token, setToken] = useState<IToken>({
        Token: undefined,
        TokenRefresh: undefined,
        Message: undefined,
        Tipo: undefined,
    });
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    function onLogin(evt: React.FormEvent) {
        evt.preventDefault();
        setError("");
        if (usuario == "") {
            setError("Campo USUÁRIO está vazio.");
        }
        if (senha == "") {
            setError("Campo SENHA está vazio.");
        }

        if (error == "") {
            return;
        }
        obterTokenPeloUsuario(usuario, senha)
            .then((token: IToken) => {
                if (token.Message != null) {
                    console.log(token);
                    setError(token.Message);
                }
                else if (!!token.Token && !!token.TokenRefresh) {
                    sessionStorage.setItem('authorization', token.Token);
                    sessionStorage.setItem('authorizationrefresh', token.TokenRefresh);
                    setToken(token);
                    //user = token; Se eu fizer isso, ele não atualiza renderiza e me redireciona para a aba de logado.
                    setCntxToken(token);
                }
            }, setError);
    }

    return (
        <div className="AppLogin">
            <Container>
                <form onSubmit={onLogin}>
                    <Box
                        className="AppLogin"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField
                            onChange={(e) => { setUsuario(e.target.value); setError("") }}
                            style={{ margin: "10px 0px 10px 0px" }}
                            id="usuario_"
                            label="Usuário"
                            variant="outlined"
                            error={!!error}
                            value={usuario}
                        />
                        <TextField
                            onChange={(e) => { setSenha(e.target.value); setError("") }}
                            value={senha}
                            style={{ margin: "10px 0px 10px 0px" }}
                            id="senha"
                            type="password"
                            label="Senha"
                            variant="outlined"
                            error={!!error}
                            helperText={error}
                            required
                        />
                        <Button type="submit" variant="contained" onClick={onLogin}>
                            Fazer Login
                        </Button>
                    </Box>
                </form>
            </Container>
        </div>
    )
}

export default AppLogin
