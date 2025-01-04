'use client'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Image from 'next/image'

import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import classnames from 'classnames'

import { toast, ToastContainer } from 'react-toastify'

import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

import themeConfig from '@configs/themeConfig'

import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import useGraphql from '@utils/useGraphql'


const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const LoginV2 = ({ mode }) => {

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [errors, setErrors] = useState({ username: '', password: '' })

  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'
  const Logo = '/images/logo.png'

  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const { mutate } = useGraphql()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setHidden(isSmall)
  }, [isSmall])

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    let newErrors = { username: '', password: '' }

    if (!username) newErrors.username = 'Harap isi username'
    if (!password) newErrors.password = 'Harap isi kata sandi'
    setErrors(newErrors)
    if (newErrors.username || newErrors.password) return

    const mutation = `
        mutation Signin {
          signin(loginUserInput: { username: "${username}", password: "${password}" }) {
            access_token
          }
        }
      `

    try {
      const response = await mutate(mutation)
      const token = response?.data?.signin.access_token

      localStorage.setItem('access_token', token)
      router.push('/home')
    } catch (error) {
      toast.error('Ada kesalahan saat login, silahkan coba lagi')
    }
  }

  return (
    <div className='flex justify-center bs-full'>
      <ToastContainer />
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={characterIllustration} alt='ilustrasi-karakter' />
        {!hidden && (
          <MaskImg
            alt='masker'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px] flex items-center gap-4'>
          <Image src={Logo} alt='logo' width={50} height={50} />
          <Typography variant='h4' className='text-black'>
            Saas Artificial intelligence
          </Typography>
        </div>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Selamat datang di ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Rencana Pembelajaran Semester Saas AI Generate </Typography>
          </div>
          <form
            noValidate
            autoComplete='off'
            onSubmit={handleLogin}
            className='flex flex-col gap-5'
          >
            <CustomTextField autoFocus fullWidth label='Username' placeholder='Masukkan nama pengguna Anda' name='username' error={Boolean(errors.username)} helperText={errors.username} onChange={() => setErrors(current => ({ ...current, username: '' }))} />
            <CustomTextField
              fullWidth
              label='Kata Sandi'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
              name='password'
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={() => setErrors(current => ({ ...current, password: '' }))}
            />
            <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-1'>
              <Typography className='text-end' color='primary.main' component={Link}>
                Lupa kata sandi?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Masuk
            </Button>

            <Divider className='gap-2 text-textPrimary'>created by devnolife</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-twitter' size='small'>
                <i className='tabler-brand-twitter-filled' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small'>
                <i className='tabler-brand-github-filled' />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2


