"use client";

import Link from 'next/link';
import Image from 'next/image';


export default function Custom404() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      padding: '2rem'
    }}>
      
      {/* 1. Simplify the container. Remove relative positioning and display. */}
      <div style={{ maxWidth: '500px', width: '100%' }}>
        
        {/* The Illustration */}
        <Image
          src="/Illustrations/404-PageNotFound.png" /* Make sure this image is saved in your /public folder */
          alt="404 Page Not Found - Disconnected Plug"
          width={1063}
          height={1216}
        />
        
        {/* 2. Change positioning to relative or normal block flow. 
             3. Significantly reduce the font size for small mobile screens. */}
        <p style={{
          /* CHANGE: Move positioning to relative */
          position: 'relative',
          top: '0',
          left: '0',
          transform: 'none',

          /* Responsive sizing: narrower on mobile, comfortable width on desktop */
          width: '100%',
          maxWidth: '38rem',

          /* Responsive typography: scales from mobile to desktop */
          fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
          lineHeight: '1.4',

          color: '#000000',
          /* Responsive spacing after the image */
          marginTop: 'clamp(1rem, 3vw, 2rem)',

          fontFamily: 'cooper'
        }}>
          Let&apos;s go back{' '}
          <Link href="/" style={{ color: '#f490b1', textDecoration: 'underline', fontWeight: 'bold' }}>
            home
          </Link>!
        </p>
        
      </div>
      
    </main>
  );
}