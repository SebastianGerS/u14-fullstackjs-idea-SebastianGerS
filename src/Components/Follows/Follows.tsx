import React, { useState, MouseEvent, useEffect } from 'react';
import { User } from '../../Models/User';
import Following from './Following';
import Followers from './Followers';

interface Props {
  user: User;
  getFollows: () => void;
  followers: User[];
  requests: User[];
  following: User[];
}

function Follows({
  user, followers, getFollows, requests, following,
}: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getFollows();
  }, [user]);

  const changeTab = (e: MouseEvent<HTMLButtonElement>): void => {
    setActiveTab(+e.currentTarget.value);
  };

  return (
    <div className="follows">
      <h2>Follows</h2>
      <div className="follows-navigation">
        <div>
          <ul>
            <li>
              <button
                type="button"
                value={0}
                onClick={changeTab}
                className={activeTab === 0 ? 'active' : ''}
              >
                Following
              </button>
            </li>
            <li>
              <button
                type="button"
                value={1}
                onClick={changeTab}
                className={activeTab === 1 ? 'active' : ''}
              >
                Followers
              </button>
            </li>
          </ul>
        </div>
      </div>
      { activeTab === 0
        && <Following following={following} />
      }
      { activeTab === 1
        && <Followers followers={followers} requests={requests} />
      }
      <div />
    </div>
  );
}

export default Follows;