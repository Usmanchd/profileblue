import React from 'react';
import { Link } from 'react-router-dom';
import map from '../../assets/map.png';

export const keys = [
  'instagram',
  'venmo',
  'snapchat',
  'twitter',
  'facebook',
  'whatsapp',
  'phone',
  'linkedin',
  'youtube',
  'pinterest',
  'applemusic',
  'spotify',
  'paypal',
  'soundcloud',
  'website',
  'link',
  's_email',
  'address',
  'skype',
];

export const defaultstate = {
  instagram: { value: '', clicks: 0 },
  venmo: { value: '', clicks: 0 },
  snapchat: { value: '', clicks: 0 },
  whatsapp: { value: '', clicks: 0 },
  phone: { value: '', clicks: 0 },
  twitter: { value: '', clicks: 0 },
  facebook: { value: '', clicks: 0 },
  linkedin: { value: '', clicks: 0 },
  youtube: { value: '', clicks: 0 },
  pinterest: { value: '', clicks: 0 },
  applemusic: { value: '', clicks: 0 },
  spotify: { value: '', clicks: 0 },
  paypal: { value: '', clicks: 0 },
  soundcloud: { value: '', clicks: 0 },
  website: { value: '', clicks: 0 },
  link: { value: '', clicks: 0 },
  s_email: { value: '', clicks: 0 },
  address: { value: '', clicks: 0 },
  skype: { value: '', clicks: 0 },
};

export const defaultdisplay = {
  instagram: 'none',
  venmo: 'none',
  snapchat: 'none',
  twitter: 'none',
  facebook: 'none',
  whatsapp: 'none',
  phone: 'none',
  linkedin: 'none',
  youtube: 'none',
  pinterest: 'none',
  applemusic: 'none',
  spotify: 'none',
  paypal: 'none',
  soundcloud: 'none',
  website: 'none',
  link: 'none',
  s_email: 'none',
  address: 'none',
  skype: 'none',
};

export const getLink = (social, display, state) => {
  if (
    social !== 'address' &&
    social !== 'link' &&
    social !== 's_email' &&
    social !== 'website' &&
    social !== 'phone' &&
    social !== 'whatsapp'
  ) {
    if (state[social].value) {
      if (social === 'spotify') {
        return (
          <li
            className="urlCon"
            style={{ display: display[social] }}
            id="uc_instagram"
          >
            <div>
              <p className="m-0">
                http://open.{social}.com/add/{state[social].value}
                <b></b>
              </p>
            </div>
          </li>
        );
      }
      if (social === 'snapchat') {
        return (
          <li
            className="urlCon"
            style={{ display: display[social] }}
            id="uc_instagram"
          >
            <div>
              <p className="m-0">
                http://{social}.com/add/{state[social].value}
                <b></b>
              </p>
            </div>
          </li>
        );
      }
      if (social === 'skype') {
        return (
          <li
            className="urlCon"
            style={{ display: display[social] }}
            id="uc_instagram"
          >
            <div>
              <p className="m-0">
                skype:{state[social].value}?chat
                <b></b>
              </p>
            </div>
          </li>
        );
      }
      return (
        <li
          className="urlCon"
          style={{ display: display[social] }}
          id="uc_instagram"
        >
          <div>
            <p className="m-0">
              http://{social}.com/{state[social].value}
              <b></b>
            </p>
          </div>
        </li>
      );
    }
  }
};

export const getButton = (mode, state, onSubmit, id) =>
  mode === 'gettingStarted' ? (
    <React.Fragment>
      <Link to={`/${id}`}>
        <button
          className="btn w-100prc"
          id="submitBtn"
          onClick={() => onSubmit(state)}
        >
          Connect
        </button>
      </Link>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link to={`/${id}`}>
        <button
          className="btn w-100prc"
          id="submitBtn"
          onClick={() => onSubmit(state)}
        >
          Save
        </button>
      </Link>
    </React.Fragment>
  );

export const SocialInput = ({
  state,
  display,
  social,
  setstate,
  setdisplay,
}) => {
  return (
    <input
      value={state[social].value}
      onChange={(e) => {
        if (
          e.target.value[e.target.value.length - 1] === ' ' &&
          e.target.name !== 'address'
        )
          return;
        setstate({
          ...state,
          [e.target.name]: {
            ...state[e.target.name],
            value: e.target.value,
          },
        });
      }}
      onFocus={(e) => setdisplay({ ...display, [e.target.name]: 'block' })}
      onBlur={(e) => setdisplay({ ...display, [e.target.name]: 'none' })}
      name={social}
      placeholder={social === 's_email' ? 'EMAIL' : social.toUpperCase()}
      className="socLink"
      type="text"
    />
  );
};

export const getImg = (social) => (
  <img
    src={
      social === 'address'
        ? map
        : `https://www.profiles.blue/assets/imgs/social-network-${social}.png`
    }
    alt="social"
  />
);
