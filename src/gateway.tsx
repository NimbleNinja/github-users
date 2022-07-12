import { IUser } from './dataTypes';

const url = 'https://api.github.com';
const token = 'Z2hwX3FWUGpETHVXdE9WdUx1UTBNZXN2RjJ0TjRmRFpNRDFqdlZFbwo=';

const base64 = require('base-64');

const key = base64.decode(token);

// const key = Buffer.from(token, 'base64').toString();

export const fetchUsers = async (name: string, page: number) => {
  try {
    const response = await fetch(
      `${url}/search/users?q=${name}+in:login&per_page=15&page=${page}`,
      {
        headers: {
          Authorization: key,
          Accept: 'application/vnd.github+json',
        },
      },
    );

    const responseData = await response.json();

    return responseData;
  } catch (err) {
    return err;
  }
};

export const fetchUsersWithReposCount = async (users: IUser[]) => {
  const promisesArr = users.map(({ login }) => {
    return fetch(`${url}/users/${login}`, {
      headers: {
        Authorization: key,
      },
    }).then(response => response.json());
  });

  const newUsersList = await Promise.all(promisesArr);

  return newUsersList;
};

export const fetchUser = async (name: string | undefined) => {
  try {
    const response = await fetch(`${url}/users/${name}`, {
      headers: {
        Authorization: key,
      },
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchUserRepos = async (name: string | undefined, page: number) => {
  try {
    const response = await fetch(`${url}/users/${name}/repos?per_page=10&page=${page}`, {
      headers: {
        Authorization: key,
      },
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
