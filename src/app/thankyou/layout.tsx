import React from 'react'
export const metadata = {
    title:'شكرا على الطلب'
}
export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>{children}</>
  )
}
