/* eslint-disable */
import localFont from 'next/font/local';
import './globals.css';
import { Provider, QueryProvider } from './Provider';
import { Layout } from '@/components/domain/layout/Layout';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'city gold covering',
  description: 'gold covering shop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <QueryProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Layout>{children}</Layout>
          </body>
        </QueryProvider>
      </Provider>
    </html>
  );
}
