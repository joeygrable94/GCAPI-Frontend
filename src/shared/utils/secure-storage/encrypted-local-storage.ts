import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';
import ls from 'localstorage-slim';
import { once } from '../global';

/**
 * @summary creates a secure localstorage instance
 * @reference https://www.npmjs.com/package/localstorage-slim
 * @reference https://digitalfortress.tech/js/encrypt-localstorage-data/
 *
 * @param encryptGlobally encrypt data globally
 * @returns a secure localstorage instance
 */
const createSecureLocalStorage = (encryptGlobally: boolean = true): typeof ls => {
  /**
   * @summary ensure session secret is set or throw error
   */
  if (!import.meta.env.VITE_SESSION_SECRET)
    throw new Error('Missing SESSION SECRET. Cannot securely encrypt data.');
  /**
   * @summary configure localstorage
   *
   * @param encrypt data global
   * @param secret to encrypt data with
   */
  ls.config.encrypt = encryptGlobally || true;
  ls.config.secret = import.meta.env.VITE_SESSION_SECRET;

  /**
   * @summary encrypts localstorage data with AES
   *
   * @param data to be encrypted
   * @param secret the data will be encrypted with
   * @returns the encrypted data
   */
  ls.config.encrypter = (
    data: any,
    secret: any = import.meta.env.VITE_SESSION_SECRET
  ) => AES.encrypt(JSON.stringify(data), secret).toString();

  /**
   * @summary decrypts localstorage data with AES
   *
   * @param data to be decrypted
   * @param secret the data was encrypted with
   * @returns the decrypted data or the encrypted data if incorrect/missing secret
   */
  ls.config.decrypter = (
    data: any,
    secret: any = import.meta.env.VITE_SESSION_SECRET
  ) => {
    try {
      return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
    } catch (e) {
      return data;
    }
  };

  return ls;
};

const SecureLocalStorage: typeof ls = once(() => createSecureLocalStorage())();

export default SecureLocalStorage;
