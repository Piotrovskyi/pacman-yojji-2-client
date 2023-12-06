// ./app/models/profiles.server.ts

// import types
import { getUserData } from "~/utils/session.server";
import slugify from "~/utils/slugify";
import type {
  Engine,
  ErrorResponse,
  LoginActionData,
  LoginResponse,
  Profile,
  ProfileData,
  RegisterActionData,
  Score,
} from "~/utils/types";

// Strapi API URL from environment varaibles
const strapiApiUrl = process.env.STRAPI_API_URL;

// helper function to throw errors is any
// const catchError = (res: any) => { if (res.error) throw Error(JSON.stringify(res.error)) }

// function to fetch all profiles
export const getProfile = async (request: Request): Promise<Profile> => {
  const data = await getUserData(request);
  const profiles = await fetch(`${strapiApiUrl}/users/me?populate[user_codes][populate]=*`, {
    headers: {
      Authorization: `Bearer ${data?.jwt}`,
    },
  });
  let response = await profiles.json();
  response.jwt = data?.jwt;
  // catchError(response)
  console.log({ response });
  return response;
};

export const getTopScores = async (request: Request): Promise<Score[]> => {
  const engine  = 1;
  const scores = await fetch(`${strapiApiUrl}/scores?populate[user][fields][0]=username&populate[user][fields][1]=email&sort[0]=amount&pagination[limit]=10&filters[engine][id][$eq]=${engine}`);
  let response = await scores.json();
  // catchError(response)
  console.log({ response });
  return response.data;
};

export const getEngines = async (request: Request): Promise<Engine[]> => {
  const scores = await fetch(`${strapiApiUrl}/engines`);
  let response = await scores.json();
  // catchError(response)
  console.log({ response });
  return response.data;
};

// function to get a single profile by it's slug
export const getProfileBySlug = async (
  slug: string | undefined
): Promise<Profile> => {
  const profile = await fetch(
    `${strapiApiUrl}/users?populate=profilePic&filters[slug]=${slug}`
  );
  let response = await profile.json();
  console.log({ response });
  // catchError(response)

  // since the request is filter, it returns an array
  // here we return the first itm in the array
  // since the slug is unique, it'll only return one item
  return response[0];
};

// function to sign in
export const signIn = async (data: LoginActionData): Promise<LoginResponse> => {
  console.log({ data });

  // make POST request to Strapi Auth URL
  const profile = await fetch(`${strapiApiUrl}/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let response = await profile.json();

  console.log({ response });

  // return login response
  return response;
};

// function to register user
export const register = async (
  data: RegisterActionData
): Promise<LoginResponse> => {
  // generate slug from username
  let slug = slugify(data.username?.toString());
  data.slug = slug;

  // make POST request to Strapi Register Auth URL
  const profile = await fetch(`${strapiApiUrl}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // console.log({ profile });

  // get response from request
  let response = await profile.json();
  // console.log({ response });

  // return register response
  return response;
};

// function to update a profile
export const updateProfile = async (
  data: ProfileData,
  token: string | undefined
): Promise<Profile & ErrorResponse> => {
  // get id from data
  const { id } = data;

  // PUT request to update data
  const profile = await fetch(`${strapiApiUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // set the auth token to the user's jwt
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  let response = await profile.json();

  console.log({ response });

  return response;
};

// function to send password reset email
export const sendResetMail = async (
  email: string | File | null | undefined
) => {
  const response = await (
    await fetch(`${strapiApiUrl}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
  ).json();

  return response;
};

// function to reset password
export const resetPass = async ({
  password,
  passwordConfirmation,
  code,
}: {
  password: File | string | null | undefined;
  passwordConfirmation: File | string | null | undefined;
  code: File | string | null | undefined;
}) => {
  const response = await (
    await fetch(`${strapiApiUrl}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        passwordConfirmation,
        code,
      }),
    })
  ).json();

  return response;
};
