import axios from 'axios';
import cheerio from 'cheerio';
import { ChartListType, ChartType } from 'src/entities/chart';

const getDocData = async () => {
  return await axios
    .get('https://www.melon.com/chart/')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getData = async (child, $) => {
  const lists: ChartListType[] = [];

  child.each(async (_, elem: HTMLElement) => {
    const songInfo: HTMLElement = $(elem).find('.wrap_song_info');

    const rank: number = parseInt(
      $(elem).find('.t_center > .rank').text().trim(),
    );
    const title: string = $(songInfo).find('.rank01 > span > a').text().trim();
    const singer: string = $(songInfo).find('.rank02 > span').text().trim();
    const album: string = $(songInfo).find('.rank03 > a').text().trim();
    const attr: string = $(songInfo)
      .find('.rank03 > a')
      .attr('href')
      .slice(37, -3);
    const url: string =
      'https://www.melon.com/album/detail.htm?albumId=' + attr;

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

const getTimestemp = ($) => {
  const calendar: HTMLElement = $('.calendar_prid');

  const date: HTMLElement = $(calendar).find('span.yyyymmdd').text().trim();
  const time: HTMLElement = $(calendar).find('span.hhmm').text().trim();

  return `${date} ${time}`;
};

const scrape = async (): Promise<ChartType> => {
  const $ = cheerio.load(await getDocData());

  const timestemp: string = getTimestemp($);

  const table = $('table tbody');
  const lst50: ChartListType[] = await getData(table.find('.lst50'), $);
  const lst100: ChartListType[] = await getData(table.find('.lst100'), $);

  const songRank: ChartListType[] = [...lst50, ...lst100].sort((a, b) => {
    if (a.rank > b.rank) {
      return 1;
    } else {
      return -1;
    }
  });

  return {
    timestemp,
    rank: songRank,
  };
};

export default scrape;
