import { useState, FormEvent, useEffect } from 'react';
import { Header } from '../../components/header';
import { Input } from '../../components/input';

import { FiTrash, FiLink2 } from 'react-icons/fi';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

interface ILinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [textColorInput, setTextColorInput] = useState('#f1f1f1');
  const [bgColorInput, setbgColorInput] = useState('#121212');
  const [links, setLinks] = useState<ILinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, 'links');
    const queryRef = query(linksRef, orderBy('created', 'asc'));

    const unsub = onSnapshot(queryRef, (snapshot) => {
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

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput.trim() === '' || urlInput.trim() === '') {
      alert('Preencha todos os campos');
      return;
    }

    addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        console.log('cadastrado com sucesso');
        setNameInput('');
        setUrlInput('');
      })
      .catch((error) => {
        console.log('Erro ao cadastrar no banco' + error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, 'links', id);
    await deleteDoc(docRef);
  }

  return (
    <div className='flex items-center flex-col min-h-screen pb-7 px-2 font-poppins'>
      <Header />

      <form
        className='flex flex-col mt-8 mb-3 w-full max-w-xl'
        onSubmit={handleRegister}
      >
        <label className='text-white font-medium my-2'>Nome do Link</label>
        <Input
          placeholder='Digite o nome do Link...'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className='text-white font-medium my-2'>Url do Link</label>
        <Input
          type='url'
          placeholder='Digite a url...'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        {nameInput.trim() !== '' && (
          <>
            <section className='flex my-4 gap-5 justify-around'>
              <div className='flex flex-col items-center'>
                <label className='text-white font-medium my-2'>
                  Cor do Link:
                </label>
                <input
                  className='h-10 w-10 rounded'
                  type='color'
                  value={textColorInput}
                  onChange={(e) => setTextColorInput(e.target.value)}
                />
              </div>
              <div className='flex flex-col items-center'>
                <label className='text-white font-medium my-2'>
                  Fundo do Link:
                </label>
                <input
                  className='h-10 w-10 rounded'
                  type='color'
                  value={bgColorInput}
                  onChange={(e) => setbgColorInput(e.target.value)}
                />
              </div>
            </section>

            <div className='flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md'>
              <label className='text-white font-medium my-2 mb-3'>
                Veja como está ficando:
              </label>
              <article
                className='w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3'
                style={{
                  marginBottom: 8,
                  marginTop: 8,
                  backgroundColor: bgColorInput,
                }}
              >
                <p className='font-medium' style={{ color: textColorInput }}>
                  {nameInput}
                </p>
              </article>
            </div>
          </>
        )}

        <button
          type='submit'
          className='my-7 bg-blue-600 h-10 rounded-md text-white font-medium gap-2 flex justify-center items-center'
        >
          Cadastrar
          <FiLink2 size={18} color='#fff' />
        </button>
      </form>

      <h2 className='font-bold text-white mb-4 text-2xl'>Meus Links</h2>

      {links.map((link) => (
        <article
          key={link.id}
          className='flex items-center justify-between w-11/12 max-w-xl rounded p-2 mb-2 select-none'
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button
              className='border p-1 rounded-md border-neutral-700 bg-white'
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash size={20} color='#000' />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
