import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.jpg';
import Footer from '@/layouts/Footer';
import Books from './Books';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState({ search: '' });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-around items-center p-5 md:h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            DIVINE SPEECH
          </h1>
          <p className="text-secondary font-semibold text-xl">
            exploring quran as literature
          </p>
          <div className="text-primary mt-10 max-w-lg">
            <p>
              The contents of the book is arranged to introduce readers to the
              in-depth meanings of Al-Quran through its Arabic language -
              structure and composition through selected translations and
              researches.
            </p>
            <p className="font-semibold mt-3">
              {' '}
              Written by Nouman Ali Khan and Sharif Randhawa
            </p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative">
          <img className="rounded-md " src={banner} alt="" />
        </div>
      </div>

      <form className="max-w-2xl mx-auto my-10 p-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none outline-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <Input
            type="search"
            name="search"
            onChange={(e) => setSearch({ search: e.target.value })}
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ring-0 outline-none"
            placeholder="Search book with, author..."
            autoComplete="none"
          />
        </div>
      </form>

      <div className="mb-96 mt-20 p-5">
        <div>
          <Books {...search} />
        </div>
      </div>
      <Footer />
    </>
  );
}
