import { FormEvent, useEffect, useState } from 'react';

import { Header } from '../../components/header';
import { Input } from '../../components/input';

import { db } from '../../services/firebaseConnection';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export function Networks() {
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, 'social', 'link');
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setTwitter(snapshot.data()?.twitter);
        }
      });
    }

    loadLinks();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, 'social', 'link'), {
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
    })
      .then(() => {
        console.log('cadastrados com sucesso');
      })
      .catch((error) => {
        console.log('deu ruim' + error);
      });
  }

  return (
    <div className='flex items-center flex-col min-h-screen pb-7 px-2 font-poppins'>
      <Header />

      <h1 className='text-white text-2xl font-medium mt-8 mb-4 '>
        Minhas redes sociais
      </h1>

      <form className='flex flex-col max-w-xl w-full' onSubmit={handleRegister}>
        <label className='text-white font-medium mt-2 mb-2'>
          Link do Facebook
        </label>
        <Input
          placeholder='Digite a url do facebook...'
          type='url'
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label className='text-white font-medium mt-2 mb-2'>
          Link do Instagram
        </label>
        <Input
          placeholder='Digite a url do instagram...'
          type='url'
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className='text-white font-medium mt-2 mb-2'>
          Link do Twitter
        </label>
        <Input
          placeholder='Digite a url do twitter...'
          type='url'
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />

        <button
          type='submit'
          className='text-white bg-blue-600 h-10 rounded-md items-center justify-center flex mt-5 mb-5 font-medium'
        >
          Salvar Links
        </button>
      </form>
    </div>
  );
}
