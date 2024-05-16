import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';

export function encryptData<T>(
  data: T,
  secret: string = import.meta.env.VITE_SESSION_SECRET ??
    'areallylongsecretthatyoushouldreplace'
): string {
  return AES.encrypt(JSON.stringify(data), secret).toString();
}

export function decryptData<T>(
  data: string,
  secret: string = import.meta.env.VITE_SESSION_SECRET ??
    'areallylongsecretthatyoushouldreplace'
): T {
  try {
    return JSON.parse(AES.decrypt(data, secret).toString(encUTF8)) as T;
  } catch (e) {
    return data as T;
  }
}
