import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

const cookieDomain = "localhost";

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export const GetCookie = (name: string) => {
  try {
    const getToken = Cookies.get(name);
    if (getToken) {
      const tokenObj = JSON.parse(getToken);
      return tokenObj;
    }
    return null;
  } catch (error) {
    console.error(`Error retrieving cookie '${name}':`, error);
    throw error;
  }
};

export const SetCookie = (name: string, secureKey: string) => {
  try {
    if (!secureKey || typeof secureKey !== "string") {
      throw new Error("Invalid secure key provided");
    }
    const tokenInfo: TokenPayload = jwtDecode(secureKey);
    Cookies.set(name, secureKey, {
      expires: moment().add(Number(tokenInfo.exp), "seconds").toDate(),
      secure: true,
      domain: cookieDomain,
      sameSite: "strict",
      path: "/",
    });
  } catch (error) {
    console.error(`Error setting cookie '${name}':`, error);
    throw error;
  }
};

export const RemoveCookie = (name: string) => {
  try {
    Cookies.set(name, "", {
      expires: moment().add(Number(0), "seconds").toDate(),
      secure: true,
      domain: cookieDomain,
      sameSite: "strict",
      path: "/",
    });
  } catch (error) {
    console.error(`Error removing cookie '${name}':`, error);
    throw error;
  }
};
