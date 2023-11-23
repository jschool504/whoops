import fs from 'fs'
import crypto from 'crypto'
import fsPromises from 'fs/promises'

// https://gist.github.com/bminer/4600432
function variableHash(size: number, data: string, input_encoding: string) {
    // Generate 256-bit hash of data
    const hash = crypto.createHash('sha256');
    // @ts-ignore
    hash.update(data, input_encoding);
    const hashDigest = hash.digest('binary');
  
    // Generate pseudorandom-random output that is `size` bytes
    const output = Buffer.alloc(size);
    output.fill(0);
  
    // Encrypt a zero-filled buffer using the SHA-256 hash as the AES-256 key
    const key = crypto.scryptSync(hashDigest, '', 32);
    const cipher = crypto.createCipheriv('aes-256-ecb', key, null);
  
    const encrypted = Buffer.concat([cipher.update(output), cipher.final()]);
    return encrypted;
  }


export const memo = () => {
    const cache: { [k: string]: any } = {};
    return (_: any, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const hash = variableHash(64, JSON.stringify(args), 'utf8').toString('base64')
        const cacheKey = `__cacheKey__${hash}`;
  
  
        if (!cache.hasOwnProperty(cacheKey)) {
          cache[cacheKey] = originalMethod.apply(this, args);
        }
        return cache[cacheKey];
      }
    }
  }