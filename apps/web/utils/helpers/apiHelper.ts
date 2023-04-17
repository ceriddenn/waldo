import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import { verify, hash } from 'argon2';
const checkURL = (url: string): boolean => {
  const p =
    // eslint-disable-next-line max-len
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  if (url.match(p)) {
    return true;
  }
  return false;
};

// eslint-disable-next-line no-undef
function genApiKey(size = 20, format: BufferEncoding = 'base64') {
  const buffer = randomBytes(size);
  return buffer.toString(format);
}

async function genSecretHash(key: string) {
  const hashStore = await hash(key);

  return hashStore;
}

async function compareKeyAgainstHash(storedKey: string, suppliedKey: string) {
  try {
    if (await verify(storedKey, suppliedKey)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export { checkURL, genApiKey, genSecretHash, compareKeyAgainstHash };
