import axios from "axios";
import cheerio from "cheerio";

const getDocData = async () => {
  return await axios
    .get("https://www.melon.com/chart/")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// const getYoutubeUrl = (searchKeyword) => {
//   const
// };

const getData = async (child, $) => {
  const lists = [];
  // const $ = cheerio.load(await getDocData());

  child.each(async (i, elem) => {
    const songInfo = $(elem).find(".wrap_song_info");

    const rank = $(elem).find(".t_center > .rank").text().trim();
    const title = $(songInfo).find(".rank01 > span > a").text().trim();
    const singer = $(songInfo).find(".rank02 > span").text().trim();
    const album = $(songInfo).find(".rank03 > a").text().trim();

    // const url = await getYoutubeUrl(`${singer} ${title}`);

    lists.push({
      rank: rank,
      title: title,
      singer: singer,
      album: album,
    });
  });

  return lists;
};

const scrape = async () => {
  const $ = cheerio.load(await getDocData());

  const table = $("table tbody");
  const lst50 = await getData(table.find(".lst50"), $);
  const lst100 = await getData(table.find(".lst100"), $);

  const lists = [...lst50, ...lst100];
  console.log(lists);

  return lists;
};

export default scrape;
