const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API;

export const fetchSomeGifs = async (searchWord = "cats") => {
  let someGiphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchWord}&api_key=${API_KEY}&limit=10`
  );
  someGiphys = await someGiphys.json();
  return someGiphys.data;
};
