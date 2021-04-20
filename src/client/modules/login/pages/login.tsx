import React, { useState, useEffect, useRef } from 'react'
import DingAuth from '@components/dingAuth'
import { getDingTalkCheck, postLoginTo } from '@/api/login'
import Logo from '../assets/logo.svg'
import { v1 as uuid } from 'uuid'
import '../style/login.less'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { Spin } from 'antd'
import env from '@/config/env'
const appId = 'dingoayi7vso3yeh5dhahw'
const state = uuid()

const getRedirectUri = () => {
  if (env.ENV === 'prod') {
    return `${window.ENV_DOMAIN.split(',')[1]}/api/login/dingtalk/callback`
  } else {
    return `${window.ENV_DOMAIN}/forchangedata/${window.CI_APP_NAME}/api/login/dingtalk/callback`
  }
}

const Login = () => {
  const history = useHistory()
  const timeRef = useRef<any>(null)
  const [isLoad, setIsLoad] = useState<boolean>(false)

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-misused-promises
  //   timeRef.current = setInterval(async () => {
  //     const data = await getDingTalkCheck(state)
  //     if (data) {
  //       clearInterval(timeRef.current)
  //       setIsLoad(false)
  //       message.success('登录成功')
  //       history.push('/databank/center')
  //     }
  //   }, 1000)
  // }, [])
  const handleSuccess = (code: string) => {
    setIsLoad(true)
    postLoginTo(code, state)
  }
  return (
    <div styleName="login">
      <div styleName="box">
        <div styleName="header">
          <img styleName="logo" src={Logo} alt="" />
          <span styleName="title">风变数据银行</span>
        </div>
        <DingAuth
          redirectUri={getRedirectUri()}
          appId={appId}
          state={state}
          height={'300px'}
          onSuccess={handleSuccess}
        />
        {isLoad && (
          <div styleName="loading">
            <Spin size="large" tip="加载中" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
