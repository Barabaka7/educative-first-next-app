import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import { fetchSomeGifs } from "../../helpers/fetchSomeData";

export default function Search(initialData) {
  const router = useRouter();

  const searchTitle = `Search results for: ${router.query.searchTerm}`;
  const searchMeta = initialData.someNewGifys
    .map((each) => each.title)
    .join(", ");

  return (
    <>
      <Head>
        <title>{searchTitle}</title>
        <meta name="description" content={searchMeta}></meta>
      </Head>
      <p>
        Go <Link href="/">HOME</Link>
      </p>
      <h1>Search results for: {router.query.searchTerm}</h1>

      <div className="giphy-search-results-grid">
        {initialData.someNewGifys.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm;
  let someNewGifys = await fetchSomeGifs(searchTerm);
  return { props: { someNewGifys: someNewGifys } };
}
