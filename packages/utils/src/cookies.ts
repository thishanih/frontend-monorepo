import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { COOKIE_DOMAIN, COOKIE_SECURE } from './config';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export const GetCookie = (name: string) => {
  try {
    return Cookies.get(name) ?? null;
  } catch (error) {
    console.error(`Error retrieving cookie '${name}':`, error);
    throw error;
  }
};

export const SetCookie = (name: string, secureKey: string) => {
  try {
    if (!secureKey || typeof secureKey !== 'string') {
      throw new Error('Invalid secure key provided');
    }
    const tokenInfo: TokenPayload = jwtDecode(secureKey);
    Cookies.set(name, secureKey, {
      expires: moment.unix(tokenInfo.exp).toDate(),
      secure: COOKIE_SECURE,
      ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
      sameSite: 'strict',
      path: '/',
    });
  } catch (error) {
    console.error(`Error setting cookie '${name}':`, error);
    throw error;
  }
};

export const RemoveCookie = (name: string) => {
  try {
    Cookies.remove(name, {
      ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
      path: '/',
    });
  } catch (error) {
    console.error(`Error removing cookie '${name}':`, error);
    throw error;
  }
};
