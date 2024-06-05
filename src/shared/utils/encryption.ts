import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';

export function encryptData<T>(data: T): string {
  const secret =
    import.meta.env.VITE_SESSION_SECRET ?? 'areallylongsecretthatyoushouldreplace';
  return AES.encrypt(JSON.stringify(data), secret).toString();
}

export function decryptData<T>(data: string): T {
  try {
    const secret =
      import.meta.env.VITE_SESSION_SECRET ?? 'areallylongsecretthatyoushouldreplace';
    return JSON.parse(AES.decrypt(data, secret).toString(encUTF8)) as T;
  } catch (e) {
    return data as T;
  }
}
