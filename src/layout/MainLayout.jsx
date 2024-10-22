import React, { useContext } from 'react';
import Header from '../components/Header';
import { ThemeContext } from '../App';

export default function MainLayout({ children }) {
  const [mode, setMode] = useContext(ThemeContext);
  return (
    <>
      <Header />
      <main className={mode ? 'dark' : ''}>
        <div className='dark:bg-[#272935] min-h-screen'>{children}</div>
      </main>
    </>
  );
}
