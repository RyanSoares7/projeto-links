import { useState, useEffect } from 'react';
import { Social } from '../../components/social';

import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { db } from '../../services/firebaseConnection';
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from 'firebase/firestore';

interface ILinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface ISocialLinksProps {
  facebook: string;
  instagram: string;
  twitter: string;
}

export function Home() {
  const [links, setLinks] = useState<ILinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<ISocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, 'links');
      const queryRef = query(linksRef, orderBy('created', 'asc'));

      getDocs(queryRef).then((snapshot) => {
        const lista = [] as ILinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, 'social', 'link');
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            twitter: snapshot.data()?.twitter,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  return (
    <div className='flex flex-col w-full py-4 items-center justify-center font-poppins'>
      <h1 className='sm:text-5xl text-4xl font-semibold text-white mt-20'>
        Ryan Soares
      </h1>
      <span className='text-gray-50 mb-9 mt-5 text-base'>
        Veja meus links 👇
      </span>

      <main className='flex flex-col w-11/12 max-w-xl text-center'>
        {links.map((item) => (
          <section
            style={{ backgroundColor: item.bg }}
            key={item.id}
            className='mb-4 w-full py-2 rounded-md select-none transition-transform hover:scale-105 cursor-pointer'
          >
            <a href={item.url} target='_blank'>
              <p
                className='text-base sm:text-lg font-medium'
                style={{ color: item.color }}
              >
                {item.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className='flex justify-center gap-5 my-4'>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color='#fff' />
            </Social>

            <Social url={socialLinks?.facebook}>
              <FaFacebook size={35} color='#fff' />
            </Social>

            <Social url={socialLinks?.twitter}>
              <FaTwitter size={35} color='#fff' />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
