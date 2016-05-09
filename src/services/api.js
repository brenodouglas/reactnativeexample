import Device from './device';

export default class Api
{

  constructor()
  {
      this.url = 'https://www.bbommais.com.br/app/get_token';
  }

  getToken(hash)
  {
       let appendUri = `register_token/${hash}/${Device.getDeviceId()}/${Device.getPlatform()}`;
       return fetch(`${this.url}/${appendUri}`).then((res) => {
         return JSON.parse(res._bodyText);
       });
  }

  refreshToken(hash)
  {
   let appendUri = `update_token/${hash}/${Device.getDeviceId()}/${Device.getPlatform()}`;
   return fetch(`${this.url}/${appendUri}`).then((res) => {
     return JSON.parse(res._bodyText);
   });
  }
}
