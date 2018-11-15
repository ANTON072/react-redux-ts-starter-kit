import { setError } from "./redux/modules/api"
import { Store } from "redux"

class Api {
  private _store: Store | null
  private _token: string | null

  set store(s: Store) {
    this._store = s
  }

  set token(t: string) {
    this._token = t
  }

  constructor() {
    this._store = null
    this._token = null
  }

  async http(url: string, options: object) {
    return fetch(url, humps.decamelizeKeys(options))
      .catch(err => {
        // corsエラー、networkエラー等、そもそもサーバへ本リクエストする以前のエラー
        if (this._store) {
          this._store.dispatch(
            setError({
              errorType: "CLIENT_ERROR",
              errorMessage: "アクセスできません、時間を置いてお試しください"
            })
          )
        }
        console.error("CLIENT_ERROR :", err)
        throw new Error("アクセスできません、時間を置いてお試しください")
      })
      .then(async response => {
        // レスポンスヘッダの処理
        for (const pair of response.headers.entries()) {
          console.info(" RES_HEADER: ", pair[0] + ": " + pair[1])
        }
        const body = await response.json()
        return { body, ok: response.ok }
      })
      .then(({ body, ok }) => {
        // 正常リクエストが完了
        if (ok) {
          return humps.camelizeKeys(body)
        }
        // 40x, 50x系エラー
        if (this._store) {
          this._store.dispatch(
            setError({
              errorType: "SERVER_ERROR",
              errorMessage: body || "リクエストに失敗しました"
            })
          )
        }
        console.error("SERVER_ERROR :", body)
        throw new Error(body || "リクエストに失敗しました")
      })
  }

  json(url: string, options: object) {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    // CORS（クロスドメイン通信）を使う場合かつCookie等をリクエストに含める場合
    // const corsOptions = { mode: 'cors', credentials: 'include' }
    return this.http(url, { headers, ...options })
  }
}

export default new Api()
