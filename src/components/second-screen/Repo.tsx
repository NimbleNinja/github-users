import React, { FC } from 'react';
import { IUserRepo } from '../../dataTypes';

interface RepoProps {
  repoData: IUserRepo;
}

const Repo: FC<RepoProps> = ({ repoData }) => {
  return (
    <a className="link" href={repoData.html_url}>
      <li className="repos__list-item repo">
        <div className="repo__name">{repoData.name}</div>
        <div className="repo__info">
          <div className="repo__forks">{`${repoData.forks_count} Forks`}</div>
          <div className="repo__stars">{`${repoData.stargazers_count} Stars`}</div>
        </div>
      </li>
    </a>
  );
};

export default Repo;
