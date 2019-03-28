import React from 'react';
import { User } from '../../Models/User';
import ListableUser from '../Search/ListableUser';
import List from '../Common/List';

interface Props {
  followers: User[];
  requests: User[];
}

function Followers({ followers, requests }: Props): JSX.Element {
  const props = { hasRequestConfirmation: true };

  return (
    <div className="requests-followers">
      { requests.length !== 0 && (
        <div className="requests">
          <h3>Requests: </h3>
          <List component={ListableUser} data={requests} {...props} />
        </div>
      )
      }
      <div className="followers">
        <h3>Followers: </h3>
        {followers.length !== 0
          ? <List component={ListableUser} data={followers} />
          : <p>{'You don\'t have any followers yeat'}</p>}
      </div>
    </div>
  );
}

export default Followers;
