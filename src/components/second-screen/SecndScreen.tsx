import React, { ChangeEvent, FC, UIEvent, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchUser, fetchUserRepos } from '../../gateway';
import { IUserMoreInfo, IUserRepo } from '../../dataTypes';
import Repo from './Repo';
import './second-screen.scss';

const SecondScreen: FC = () => {
  const { userName } = useParams<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get('filter') || '';

  const [value, setValue] = useState<string>(filter);
  const [userData, setUserData] = useState<IUserMoreInfo | null>(null);
  const [userRepos, setUserRepos] = useState<IUserRepo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [totalReposCount, setTotalReposCount] = useState<number>(0);

  useEffect(() => {
    fetchUser(userName).then((user: IUserMoreInfo) => {
      setTotalReposCount(user.public_repos);
      setUserData(user);
    });
    fetchUserRepos(userName, currentPage).then(repos => {
      setUserRepos(repos);
      setCurrentPage(currentPage + 1);
    });
  }, []);

  useEffect(() => {
    if (isFetching && totalReposCount > userRepos.length)
      fetchUserRepos(userName, currentPage)
        .then(repos => {
          setUserRepos([...userRepos, ...repos]);
          setCurrentPage(currentPage + 1);
        })
        .finally(() => setIsFetching(false));
  }, [isFetching]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ filter: e.target.value });
    setValue(e.target.value);
  };

  const scrollHandler = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, offsetHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - (offsetHeight + scrollTop) < 60) {
      setIsFetching(true);
    }
  };

  const reposToRender: IUserRepo[] = filter
    ? userRepos.filter(repo => {
        return repo.name.toLowerCase().includes(filter.toLowerCase());
      })
    : userRepos;

  return (
    <div className="second-screen">
      <div className="second-screen__user-info user-info">
        <div className="user-info__row">
          <img className="user-info__avatar" src={userData?.avatar_url} alt="User Avatar" />
          <div className="user-info__column">
            <div className="user-info__name">{`Name: ${userData?.name}`}</div>
            <div className="user-info__email">{`Email: ${userData?.email || 'not available'}`}</div>
            <div className="user-info__location">{`Location: ${
              userData?.location || 'not available'
            }`}</div>
            <div className="user-info__join-date">{`Join date: ${userData?.created_at}`}</div>
            <div className="user-info__followers">{`Followers: ${userData?.followers}`}</div>
            <div className="user-info__following">{`Following: ${userData?.following}`}</div>
          </div>
        </div>
        <div className="user-info__biography">{userData?.bio || ''}</div>
      </div>
      <div className="repos">
        <div className="repos__search-bar search-bar">
          <input
            value={value}
            onChange={changeHandler}
            type="text"
            className="search-bar__input"
            placeholder="Search for Users Repositories"
          />
        </div>
        <ul onScroll={scrollHandler} className="repos__list">
          {reposToRender.map(repo => {
            return <Repo key={repo.id} repoData={repo} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default SecondScreen;
