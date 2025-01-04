import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { getSystemMode } from '@core/utils/serverHelpers'
import '@/app/globals.css'

import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Saas Generator Unismuh',
  description:
    'Saas Generator Unismuh - is the most developer friendly & highly'
}

const RootLayout = async props => {
  const { children } = props
  const systemMode = await getSystemMode()
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction} suppressHydrationWarning>
      <body className='flex flex-col flex-auto is-full min-bs-full'>
        <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
