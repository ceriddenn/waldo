/* eslint-disable prettier/prettier */
import axios from 'axios';
import { prisma } from '@server/db/client';
const retrieveRawUserInfoServer = async (
  cookies: Partial<{
    [key: string]: string;
  }>,
) => {
  const api_url = `${process.env.BASE_URL}/api/logto/user-info`;
  const converted_cookies = convertCookieObjectToString(cookies);
  const request = await axios.get(api_url, {
    withCredentials: true,
    headers: {
      Cookie: cookies && converted_cookies,
    },
  });
  const response = await request.data;
  return response;
};

const retrieveRawUserInfoClient = async () => {
  const api_url = `/api/logto/user-info`;
  const request = await axios.get(api_url, {
    withCredentials: true,
  });

  const response = await request.data;
  return response;
};

const getUserData = async (): Promise<V2Session | undefined> => {
  const api_url = `/api/logto/user-info`;
  const request = await axios.get(api_url, {
    withCredentials: true,
  });

  // demo user data obj
  // {
  //   logto_id: "",
  //   provider: "",
  //   providerId: "",
  //   name: "",
  //   image: "",
  //   logto_username: ""
  // }

  const response = await request.data;

  if (response.isAuthenticated == false) {
    return undefined;
  }

  const userData = response.userInfo;
  const jwtData = response.claims;

  const identityData =
    response.userInfo.identities[Object.keys(response.userInfo.identities)[0]];
  const usermetaReq = await axios.get('/api/logto/usermeta');
  const usermetaReqRes = await usermetaReq.data;
  const sessionObject = {
    logto_id: jwtData.sub,
    provider: Object.keys(response.userInfo.identities)[0],
    providerId: identityData.userId,
    name: identityData.details.name,
    image: userData.picture,
    logto_username: userData.username,
    blacklisted: usermetaReqRes.blacklisted,
  };

  return sessionObject;
};

interface V2Session {
  logto_id: string;
  provider: string;
  providerId: string | number;
  name: string;
  image: string;
  logto_username: string;
  blacklisted: boolean;
}

export {
  retrieveRawUserInfoServer,
  retrieveRawUserInfoClient,
  getUserData,
  type V2Session,
};

// utils

function convertCookieObjectToString(
  cookiesObj: Partial<{
    [key: string]: string;
  }>,
) {
  return Object.entries(cookiesObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
}
