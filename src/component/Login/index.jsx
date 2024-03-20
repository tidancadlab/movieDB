/* eslint import/no-extraneous-dependencies: ["off", {"peerDependencies": true}] */
import Cookie from 'js-cookie'
import {useState} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom/cjs/react-router-dom.min'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Login = ({history}) => {
  const [userData, setUserData] = useState({})
  const [userError, setUserError] = useState({
    username: false,
    password: false,
  })
  const [status, setStatus] = useState(statusConstants.initial)
  const [errorMessage, setErrorMessage] = useState(null)
  const token = Cookie.get('jwt_token')
  if (token) {
    history.replace('/')
  }

  const onUserData = e => {
    setUserData(previous => ({...previous, [e.target.id]: e.target.value}))
    setUserError(previous => ({...previous, [e.target.id]: false}))
  }

  const onLogin = async e => {
    e.preventDefault()
    if (!userData.username && !userData.password) {
      setUserError({password: true, username: true})
      return
    }
    if (!userData.username) {
      setUserError(previous => ({...previous, username: true}))
      return
    }
    if (!userData.password) {
      setUserError(previous => ({...previous, password: true}))
      return
    }
    setStatus(statusConstants.inProgress)
    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify(userData),
      })
      if (response.status === 200) {
        const {jwt_token: jwtToken} = await response.json()
        Cookie.set('jwt_token', jwtToken)
        Redirect('/')
        setStatus(statusConstants.success)
      } else {
        const {error_msg: errorMsg} = await response.json()
        setStatus(statusConstants.failure)
        setErrorMessage(errorMsg)
      }
    } catch (error) {
      setStatus(statusConstants.failure)
      setErrorMessage('Something went wrong.')
      console.log(error)
    }
  }
  return (
    <>
      <div className='relative h-full w-full flex justify-center items-center grow'>
        <form
          onSubmit={onLogin}
          className='relative max-w-96 border border-black p-4 rounded-lg'
        >
          <h1 className='text-3xl font-bold mb-6 text-center'>Login</h1>
          <div className='flex flex-col gap-1'>
            <label className='pl-1' htmlFor='username'>
              Username
            </label>
            <input
              onChange={onUserData}
              className='px-2 py-0.5 outline-none border border-black rounded-md focus:outline-blue-500'
              type='text'
              placeholder='Username'
              id='username'
            />
            <p
              data-haserror={userError.username}
              className="-mt-1 pl-1 text-xs text-red-500 data-[haserror='true']:opacity-100 opacity-0"
            >
              Username required*
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='pl-1' htmlFor='username'>
              Password
            </label>
            <input
              onChange={onUserData}
              className='px-2 py-0.5 outline-none border border-black rounded-md focus:outline-blue-500'
              type='password'
              placeholder='Password'
              id='password'
            />
            <p
              data-haserror={userError.password}
              className="-mt-1 pl-1 text-xs text-red-500 data-[haserror='true']:opacity-100 opacity-0"
            >
              Password required*
            </p>
          </div>
          <button
            type='submit'
            disabled={status === statusConstants.inProgress}
            className='bg-black w-full text-white py-1 rounded mt-2 disabled:bg-black/70'
          >
            {status === statusConstants.inProgress ? (
              <Loader
                type='TailSpin'
                height={20}
                className='flex justify-center py-0.5'
                color='white'
              />
            ) : (
              'Login'
            )}
          </button>
          <div
            data-haserror={status === statusConstants.failure}
            className='absolute -top-16 left-1/2 -translate-x-1/2 text-center min-w-full rounded-lg py-1 px-2 bg-red-100 text-red-500 border border-red-500 hidden data-[hasError=true]:block'
          >
            {errorMessage || ' null '}
          </div>
        </form>
      </div>
    </>
  )
}
export default Login
