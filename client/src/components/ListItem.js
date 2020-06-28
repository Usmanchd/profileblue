import React from 'react';
import { getImg } from './Views/socialstate';

export default function ListItem({
  user,
  handleClicks,
  username,
  isPublic,
  size,
}) {
  return (
    <React.Fragment>
      <li className="col-12">
        <a
          type="instagram"
          href={getLink(username, user)}
          target="_blank"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            margin: 'auto',
          }}
          onClick={() => handleClicks(username)}
        >
          {getImg(username)}
          <div
            style={{
              marginLeft: '16px',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <p
              style={{
                margin: '0',
                padding: '0',
                fontSize: size,
              }}
            >
              <b>{username.charAt(0).toUpperCase() + username.slice(1)}</b>
            </p>

            <p
              style={{
                margin: '0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              {!isPublic && (
                <span>
                  <span>{user.social[username].clicks}</span> Clicks
                </span>
              )}
            </p>
          </div>
        </a>
      </li>
      <span
        style={{
          borderTop: '1px solid #bdbdbd',
          // height: '1px',
          width: '100%',
          margin: 'auto',
        }}
      ></span>
    </React.Fragment>
  );
}

const getLink = (username, user) => {
  if (user.social[username]) {
    if (username === 'spotify')
      return `http://open.${username}.com/add/${user.social[username].value}`;
    if (username === 'snapchat')
      return `http://${username}.com/add/${user.social[username].value}`;
    if (username === 'address')
      return `https://www.google.com/maps/place/${user.social[username].value}`;
    if (username === 'phone') return `tel:${user.social[username].value}`;
    if (username === 's_email') return `mailto:${user.social[username].value}`;
    if (username === 'website') return `http://${user.social[username].value}`;
    if (username === 'link') return `http://${user.social[username].value}`;
    if (username === 'linkedin')
      return `http://${username}.com/in/${user.social[username].value}`;
    if (username === 'whatsapp')
      return `http://api.${username}.com/send?phone=${user.social[username].value}`;
    if (username === 'skype')
      return `skype:${user.social[username].value}?chat`;
    return `http://${username}.com/${user.social[username].value}`;
  }
};
