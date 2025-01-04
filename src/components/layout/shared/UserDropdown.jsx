'use client'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useSettings } from '@core/hooks/useSettings'
import useGraphql from '@utils/useGraphql'


const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isProfileFetched, setIsProfileFetched] = useState(false)
  const anchorRef = useRef(null)
  const router = useRouter()
  const { settings } = useSettings()
  const [profile, setProfile] = useState({ name: 'John Doe', role: 'admin@vuexy.com' })
  const { query } = useGraphql(localStorage.getItem('access_token'))

  useEffect(() => {
    if (isProfileFetched) return

    const fetchProfile = async () => {
      const queryProfile = `
        query Profile {
          profile {
            username
            name
            role
          }
        }
      `
      try {
        const response = await query(queryProfile, {}, { skipSuccessToast: true })
        if (response.data && response.data.profile) {
          const { name, role } = response.data.profile
          setProfile({ name, role })
        } else {
          setProfile({ name: '', role: '' })
        }
      } catch (error) {
        setProfile({ name: '', role: '' })
      } finally {
        setLoading(false)
        setIsProfileFetched(true)
      }
    }

    fetchProfile()
  }, [query, isProfileFetched])

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    setOpen(false)
  }

  const handleUserLogout = async () => {
    localStorage.removeItem('access_token');
    router.push('/login')
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt='John Doe'
          src='/images/avatars/1.png'
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e)}>
                <MenuList>
                  {loading ? (
                    <div className='flex items-center justify-center p-4'>
                      <CircularProgress />
                    </div>
                  ) : (
                    [
                      <div key="profile-info" className='flex items-center gap-2 plb-2 pli-6' tabIndex={-1}>
                        <Avatar alt={profile.name} src='/images/avatars/1.png' />
                        <div className='flex flex-col items-start'>
                          <Typography className='font-medium' color='text.primary'>
                            {profile.name}
                          </Typography>
                          <Typography variant='caption'>{profile.role || "Dosen"}</Typography>
                        </div>
                      </div>,
                      <Divider key="divider-1" className='mlb-1' />,
                      <MenuItem key="profile" className='gap-3 mli-2' onClick={e => handleDropdownClose(e)}>
                        <i className='tabler-user' />
                        <Typography color='text.primary'>Profile</Typography>
                      </MenuItem>,
                      <MenuItem key="settings" className='gap-3 mli-2' onClick={e => handleDropdownClose(e)}>
                        <i className='tabler-settings' />
                        <Typography color='text.primary'>Settings</Typography>
                      </MenuItem>,
                      <div key="logout" className='flex items-center plb-2 pli-3'>
                        <Button
                          fullWidth
                          variant='contained'
                          color='error'
                          size='small'
                          endIcon={<i className='tabler-logout' />}
                          onClick={handleUserLogout}
                          sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                        >
                          Keluar
                        </Button>
                      </div>
                    ]
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
