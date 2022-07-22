import md5 from 'md5'
import { IToken } from '../../types/token'

export function obterTokenPeloToken(): Promise<IToken> {
  let header = new Headers()
  header.append('Content-Type', 'application/json')

  if (sessionStorage.authorization) {
    let auth = sessionStorage.authorization
    let authrefresh = sessionStorage.authorizationrefresh
    header.append('authorization', auth)
    header.append('authorizationrefresh', authrefresh)
  }
  let arquivojson = fetch(`http://localhost:3000/autenticacao`, {
    method: 'POST',
    headers: header,
  }).then((response) => response.json())

  return arquivojson
}

export function obterTokenPeloUsuario(
  Nome: string,
  Senha: string,
): Promise<IToken> {
  let header = new Headers()
  header.append('Content-Type', 'application/json')

  let Pass: string = md5(Senha)
  let status: number
  let messa: string
  let fetchAPI = fetch(`http://localhost:3000/autenticacao`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({ Nome, Pass }),
  })
    .then((response) => {
      status = response.status
      messa = response.statusText
      return response.json()
    })
    .then((result) => {
      let jsonresult = result
      return jsonresult
    })
    .catch(() => {
      let retorno: IToken = {}
      retorno.Tipo = 'Erro'
      retorno.Message = `Error: Network Error ${status} - ${messa}`

      return retorno
    })
  return fetchAPI
}
