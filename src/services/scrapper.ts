import axios from 'axios';
import { decode, encode } from 'iconv-lite';
import * as querystring from 'querystring';
import { ZDUPostData } from './scrapper.model';

const endpoint = 'https://dekanat.zu.edu.ua/cgi-bin/timetable.cgi';

class TimetableScrapper {
  private static setupURL(endpoint: string): string {
    const url = new URL(endpoint);
    url.searchParams.set('n', '701');
    url.searchParams.set('faculty', '1004'); // NNIIF
    return url.toString();
  }

  private static generatePostData(postData: ZDUPostData): Buffer {
    const postDataString: string = querystring.stringify(postData);
    const unescapedPostData: string = querystring.unescape(postDataString);
    return encode(unescapedPostData, 'win1251');
  }

  constructor(private endpoint: string) {
  }

  get url(): string {
    return TimetableScrapper.setupURL(this.endpoint);
  }

  // TODO: return Promise
  public getTeacher(name: string): void {
    const url = new URL(this.url);
    url.searchParams.set('query', name);
    url.searchParams.set('lev', '141'); // teachers
    axios.get(url.toString(), { responseType: 'arraybuffer' })
      .then(res => res.data)
      .then(data => console.log(decode(data, 'win1251')));
  }

  public getTeachers(): void {
    return this.getTeacher('');
  }

  public getGroups(): void {
    const url = new URL(this.url);
    url.searchParams.set('query', name);
    url.searchParams.set('lev', '142'); // groups
    axios.get(url.toString(), { responseType: 'arraybuffer' })
      .then(res => res.data)
      .then(data => console.log(decode(data, 'win1251')));
  }

  public getTimeTable(): Promise<string> {
    const postData: Buffer = TimetableScrapper.generatePostData({
      faculty: 1004,
      teacher: 'Фант',
      // group: ,
      // sdate:,
      // parse from Date 0,+1,0
      edate: '1.1.2019',
      n: 700,
    });
    return axios.post(this.endpoint, postData, { responseType: 'arraybuffer' })
      .then(res => decode(res.data, 'win1251'));
  }
}

const timetableScrapper = new TimetableScrapper(endpoint);

export { timetableScrapper };
