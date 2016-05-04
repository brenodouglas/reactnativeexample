import DeviceInfo from 'react-native-device-info';

export default class Device
{

  static getDeviceId()
  {
    return DeviceInfo.getUniqueID();
  }

  static getPlatform()
  {
    return DeviceInfo.getManufacturer().substring(0,1).toLowerCase();
  }

}
