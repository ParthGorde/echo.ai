import { Link, Outlet } from "react-router-dom";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import "./rootlayout.css";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();
const Rootlayout = () => {
  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <QueryClientProvider client={queryClient}>
          <div className="rootlayout">
            <header>
              <Link to="/" className="logo">
                <img src="/echo.webp" alt="Echo AI" height={64} width={64} />
                <span>ECHO.AI</span>
              </Link>
              <div className="user">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>

            <main>
              <Outlet />
            </main>
          </div>
        </QueryClientProvider>
      </ClerkProvider>
    </>
  );
};

export default Rootlayout;
