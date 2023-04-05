import { SessionProvider } from '@/components/SessionProvider'
import SideBar from '@/components/SideBar'

import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Login from '@/components/Login'
import ClinentProvider from '@/components/ClinentProvider'

export const metadata = {
  title: 'ChatGPT Clone',
  description: 'chat gpt clone nextjs',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  // console.log(session)
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) :
            <div className='flex'>
              <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto
                     md:min-w-[20rem]'>
                <SideBar />
              </div>

              <ClinentProvider/>

              <div className='bg-[#343541] flex-1'>{children}</div>
            </div>
          }
        </SessionProvider>
      </body>
    </html>
  )
}
