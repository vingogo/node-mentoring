import { createHash } from 'crypto';

export function getHashCode(value: string): string {
    return createHash('md5').update(value).digest('hex');
}
