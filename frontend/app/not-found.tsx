import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <Image
          src="/Illustrations/404-PageNotFound.png"
          alt="404 Page Not Found - Disconnected Plug"
          width={1063}
          height={1216}
        />

        <p
          style={{
            position: 'relative',
            top: '0',
            left: '0',
            transform: 'none',
            width: '100%',
            maxWidth: '38rem',
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
            lineHeight: '1.4',
            color: '#000000',
            marginTop: 'clamp(1rem, 3vw, 2rem)',
            fontFamily: 'cooper',
          }}
        >
          Let&apos;s go back{' '}
          <Link
            href="/"
            style={{
              color: '#f490b1',
              textDecoration: 'underline',
              fontWeight: 'bold',
            }}
          >
            home
          </Link>
          !
        </p>
      </div>
    </main>
  );
}
