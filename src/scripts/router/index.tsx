import React, { Suspense } from 'react'

const lazyComponent = (Elm: any) => <Suspense fallback={<div></div>}><Elm /></Suspense>

export const routeMap = [
  {p: '/', c: lazyComponent(React.lazy(() => import('@/pages/Home')))},
  {p: '/chat', c: lazyComponent(React.lazy(() => import('@/pages/Chat')))},
]
