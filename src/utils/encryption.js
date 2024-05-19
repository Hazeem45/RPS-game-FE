import CryptoJS from "crypto-js";

export const encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, import.meta.env.VITE_ENCRYPTION_KEY, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const decrypt = (encryptedData) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, import.meta.env.VITE_ENCRYPTION_KEY, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
