import { to } from '@/library/utils'
import { message } from 'antd'

export const getDingTalkCheck = async (state: string) => {
  const [err, res] = await to(window.apis.getDingTalkCheck({ params: { state } }))
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    // message.error(res?.msg)
    return null
  }
}

export const postLoginTo = async (code: string, state: string) => {
  const [err, res] = await to(
    window.apis.postLoginTo({ data: { loginTmpCode: code, state } })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    // message.error(res?.msg)
  }
}

export const getUser = async () => {
  const [err, res] = await to(window.apis.getUser())
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}
