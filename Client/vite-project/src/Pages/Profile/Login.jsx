import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
export const Login = () => {
    return (
        <header>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}
