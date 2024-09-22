// src/app/components/Navbar.tsx
import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav style={{ textAlign: "center", backgroundColor: "#1a202c", padding: "1rem" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>POS Application</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <SignedIn>
                        <UserButton />
                        <Link href="/transactions" style={{ color: "white" }}>Transactions</Link>
                        <Link href="/smart-contracts" style={{ color: "white" }}>Smart Contracts</Link>
                        
                    </SignedIn>
                    <SignedOut>
                        <Link href="/sign-in" style={{ color: "white" }}>Sign In</Link>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
