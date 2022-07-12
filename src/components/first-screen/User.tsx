import React, { FC } from 'react';
import { IUserMoreInfo } from '../../dataTypes';

interface UserProps {
  user: IUserMoreInfo;
  choiseUserHandler: (name: string) => void;
}

const User: FC<UserProps> = ({ user, choiseUserHandler }) => {
  return (
    <li onClick={() => choiseUserHandler(user.login)} className="users__item user">
      <img className="user__avatar" src={user.avatar_url} alt="logo" />
      <div className="user__name">{user.login}</div>
      <div className="user__repos">
        <span>Repo: </span>
        <span>{user.public_repos}</span>
      </div>
    </li>
  );
};

export default User;
