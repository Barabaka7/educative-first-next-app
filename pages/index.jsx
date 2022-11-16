import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

import { fetchSomeGifs } from "../helpers/fetchSomeData";

export default function Home(initialData) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("cats");

  useEffect(() => {
    setSearchResults(initialData.defaultGifs);
  }, [initialData]);

  const handleInput = ({ target }) => {
    setSearchTerm(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let someNewGifys = await fetchSomeGifs(searchTerm);
    setSearchResults(someNewGifys);
  };

  return (
    <>
      <div className="container">
        <Head>
          <title>Giphy Search App</title>
          <meta
            name="description"
            content="This my first attempt to create NextJS app and it was successfull."
          ></meta>
        </Head>

        <h1>Giphy Search App</h1>

        <div className="logo-container">
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="searchTerm"
            value={searchTerm}
            onChange={handleInput}
            type="text"
            required
          />
          <button>Search</button>
        </form>

        <h1>Search results for: {searchTerm}</h1>

        <p>
          Share this search with others:
          <Link href={`/search/${searchTerm}`}>
            {`http://localhost:3000/search/${searchTerm}`}
          </Link>
        </p>

        <div className="giphy-search-results-grid">
          {searchResults.map((each, index) => {
            return (
              <div key={index}>
                <h3>{each.title}</h3>
                <Image
                  src={each.images.original.url}
                  alt={each.title}
                  width={0}
                  height={0}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  let defaultGifs = await fetchSomeGifs();
  return { props: { defaultGifs: defaultGifs } };
}
