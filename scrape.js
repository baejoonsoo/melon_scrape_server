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

const getData = async (child, $) => {
  const lists = [];

  child.each(async (i, elem) => {
    const songInfo = $(elem).find(".wrap_song_info");

    const rank = $(elem).find(".t_center > .rank").text().trim();
    const title = $(songInfo).find(".rank01 > span > a").text().trim();
    const singer = $(songInfo).find(".rank02 > span").text().trim();
    const album = $(songInfo).find(".rank03 > a").text().trim();

    const attr = $(songInfo).find(".rank03 > a").attr("href").slice(37, -3);
    const url = "https://www.melon.com/album/detail.htm?albumId=" + attr;

    lists.push({
      rank,
      title,
      singer,
      album,
      url,
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
  // console.log(lists);

  return lists;
};

export default scrape;
