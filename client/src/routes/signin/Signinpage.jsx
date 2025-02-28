import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import './Signinpage.css'

const Signinpage = () => {
  return (
    <div className='signinpage'>
        <SignIn path="/sign-in" signUpUrl='/sign-up' forceRedirectUrl={'/dashboard'}/>
    </div>
  )
}

export default Signinpage