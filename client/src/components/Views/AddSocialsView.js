import React, { useState, useEffect } from 'react';
import {
  keys,
  defaultstate,
  defaultdisplay,
  getLink,
  getButton,
  SocialInput,
  getImg,
} from './socialstate';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddSocialsView = ({ onSubmit, mode, initialState, id }) => {
  useEffect(() => {
    if (mode !== 'gettingStarted') {
      setstate({ ...defaultstate, ...initialState });
    }
  }, []);

  const [state, setstate] = useState(defaultstate);

  const [display, setdisplay] = useState(defaultdisplay);

  return (
    <div id="show1" className="toppad showtxt1">
      <form onSubmit={(e) => e.preventDefault()}>
        <ul>
          {keys.map((social) => (
            <React.Fragment>
              <li style={{ display: 'flex' }}>
                <div className="s-img">{getImg(social)}</div>
                {social === 'phone' || social === 'whatsapp' ? (
                  <PhoneInput
                    country={'pk'}
                    value={state[social].value}
                    name={social}
                    enableSearch
                    onChange={(phone, country, e, formattedValue) =>
                      setstate({
                        ...state,
                        [social]: {
                          ...state[social],
                          value: formattedValue,
                        },
                      })
                    }
                  />
                ) : (
                  <SocialInput
                    state={state}
                    social={social}
                    display={display}
                    setstate={setstate}
                    setdisplay={setdisplay}
                  />
                )}
              </li>
              {getLink(social, display, state)}
            </React.Fragment>
          ))}
        </ul>
        {getButton(mode, state, onSubmit, id)}
      </form>
    </div>
  );
};

export default AddSocialsView;
