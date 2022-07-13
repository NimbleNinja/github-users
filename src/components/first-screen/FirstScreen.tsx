/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, FC, UIEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IUserMoreInfo } from '../../dataTypes';
import User from './User';
import './first-screen.scss';
import { fetchUsers, fetchUsersWithReposCount } from '../../gateway';

const FirstScreen: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryName = searchParams.get('name') || '';

  const [value, setValue] = useState<string>('');
  const [users, setUsers] = useState<IUserMoreInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const getUsers = () => {
    fetchUsers(value, currentPage).then(usersData => {
      setTotalUsersCount(usersData.total_count);

      fetchUsersWithReposCount(usersData.items)
        .then(usersWithRepos => {
          setUsers([...users, ...usersWithRepos]);
          setCurrentPage(currentPage + 1);
        })
        .finally(() => setIsFetching(false));
    });
  };

  const searchHandler = () => {
    setSearchParams({ name: value });
    fetchUsers(value, 1).then(usersData => {
      setTotalUsersCount(usersData.total_count);

      fetchUsersWithReposCount(usersData.items)
        .then(usersWithRepos => {
          setUsers(usersWithRepos);
          setCurrentPage(2);
        })
        .finally(() => setIsFetching(false));
    });
  };

  useEffect(() => {
    if (queryName) {
      fetchUsers(queryName, 1).then(usersData => {
        setTotalUsersCount(usersData.total_count);

        fetchUsersWithReposCount(usersData.items)
          .then(usersWithRepos => {
            setUsers(usersWithRepos);
            setCurrentPage(2);
          })
          .finally(() => setIsFetching(false));
      });
    }
  }, [queryName]);

  useEffect(() => {
    if (isFetching && totalUsersCount > users.length) {
      getUsers();
    }
  }, [isFetching]);

  const scrollHandler = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, offsetHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - (offsetHeight + scrollTop) < 60) {
      setIsFetching(true);
    }
  };

  const navigate = useNavigate();
  const choiseUserHandler = (name: string) => {
    navigate(`${name}`);
  };

  return (
    <div className="first-screen">
      <div className="search-bar">
        <input
          value={value}
          onChange={changeHandler}
          className="search-bar__input"
          type="text"
          placeholder="Search for Users"
        />
        <button className="search-bar__button" onClick={searchHandler}>
          search
        </button>
      </div>
      <ul onScroll={scrollHandler} className="users">
        {users.map((user: IUserMoreInfo) => {
          return <User choiseUserHandler={choiseUserHandler} key={user.id} user={user} />;
        })}
      </ul>
    </div>
  );
};

export default FirstScreen;
