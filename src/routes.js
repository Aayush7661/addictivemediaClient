import React from 'react'
const personalDetail = React.lazy(() => import('./pages/PersonalDetail'));
const PreviousAddress = React.lazy(()=> import('./pages/PreviousAddress'))

const routes = [
    { path: '/', name: 'personalDetails', exact: true,element: personalDetail },
    { path: '/previous-address/:id', name: 'previous address', element: PreviousAddress },
]

export default routes