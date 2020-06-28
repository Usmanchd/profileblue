import React, { useState } from 'react';
import qr from '../assets/imgs/qr-code.svg';
import { Link, Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from './Footer';
import Spinner from './Spinner';
import { logout, updateClicks } from '../actions/registerUser';
import PublicProfile from './PublicProfile';
import QrScan from './QrScan';
import ListItem from './ListItem';

const Dashboard = ({
  authh: { isAuth, loading },
  logout,
  user,
  updateClicks,
}) => {
  const [show, setshow] = useState('');
  const { id } = useParams();

  if ((!user || id !== user.userName) && !loading) {
    return <PublicProfile />;
  }

  const handleClicks = (name) => {
    let social = {
      ...user.social,
      [name]: {
        ...user.social[name],
        clicks: user.social[name].clicks + 1,
      },
    };
    updateClicks({ social }, user._id);
  };

  if (loading || !user.social) return <Spinner />;
  else
    return (
      <div>
        <div className="tuto1">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tuto-ttl">
                  <Link
                    to="/edit_profile"
                    className="edit1"
                    style={{ marginTop: '9px' }}
                  >
                    Edit Profile
                  </Link>
                  <h1>Hello</h1>
                  <span>
                    <a href="!#"></a>
                    my name is
                  </span>
                  <Link to="/login" onClick={logout}>
                    <i className=""></i>
                    Log out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-profile">
          <div className="container">
            <div className="row">
              <div
                className="col-12 text-right pt-2 pl-2 pr-2"
                onClick={() => setshow('show')}
              >
                <img
                  src={qr}
                  width="25"
                  className="showPopup"
                  target="#profileQrCon"
                />
              </div>
              <div class="col-12 text-center pViewSec">
                Profile views {user.views}
              </div>
              <div className="col-12">
                <div className="my-profile-photo">
                  <img src={user.avatarUrl} alt="photo" id="profileImg" />
                </div>
                <h1 id="name">{user.name} </h1>

                <p id="bio">{user.bio}</p>

                <b className="text-center mt-2 mb-2 d-block">
                  <div className="col-12 social2">
                    <ul className="row">
                      {Object.keys(user.social).map(
                        (username) =>
                          user.social[username].value !== '' && (
                            <ListItem
                              user={user}
                              handleClicks={handleClicks}
                              username={username}
                              isPublic={false}
                              size={'14px'}
                            />
                          )
                      )}
                    </ul>
                  </div>
                </b>
              </div>
            </div>
          </div>
          <Footer />
          <QrScan user={user} show={show} setshow={setshow} />
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  authh: state.registerUser,
  user: state.registerUser.user,
});

export default connect(mapStateToProps, { logout, updateClicks })(Dashboard);
