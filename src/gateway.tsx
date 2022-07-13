import { IUser } from './dataTypes';

const url = 'https://api.github.com';
const key = process.env.REACT_APP_TOKEN;

const headers = {
  Authorization: `token ${key}`,
  Accept: 'application/vnd.github+json',
};

export const fetchUsers = async (name: string, page: number) => {
  console.log(process.env.REACT_APP_TEST);
  try {
    const response = await fetch(
      `${url}/search/users?q=${name}+in:login&per_page=15&page=${page}`,
      { headers },
    );

    const responseData = await response.json();

    return responseData;
  } catch (err) {
    return err;
  }
};

export const fetchUsersWithReposCount = async (users: IUser[]) => {
  const promisesArr = users.map(({ login }) => {
    return fetch(`${url}/users/${login}`, { headers }).then(response => response.json());
  });

  const newUsersList = await Promise.all(promisesArr);

  return newUsersList;
};

export const fetchUser = async (name: string | undefined) => {
  try {
    const response = await fetch(`${url}/users/${name}`, { headers });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchUserRepos = async (name: string | undefined, page: number) => {
  try {
    const response = await fetch(`${url}/users/${name}/repos?per_page=10&page=${page}`, {
      headers,
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
