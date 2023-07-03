import { ReactNode } from 'react';

interface ISocialProps {
  url: string;
  children: ReactNode;
}

export function Social({ url, children }: ISocialProps) {
  return (
    <a
      href={url}
      rel='noopener noreferrer'
      target='_blank'
      className='transition-transform hover:scale-105 cursor-pointer'
    >
      {children}
    </a>
  );
}
