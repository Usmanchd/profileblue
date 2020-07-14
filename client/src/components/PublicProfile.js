import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/registerUser';
import axios from 'axios';
import Footer from './Footer';
import Spinner from './Spinner';
import QrScan from './QrScan';
import ListItem from './ListItem';

const getid = (hash) => {
  let index = hash.indexOf('-');
  let result = hash.slice(index + 1);
  return result;
};

const PublicProfile = ({ authh: { isAuth, loading }, logedUser }) => {
  const history = useHistory();
  const { id } = useParams();
  const [user, setuser] = useState();
  const [show, setshow] = useState('show1');
  const [error, seterror] = useState(null);
  const parsed = parseInt(getid(id), 10);

  useEffect(() => {
    (() => {
      if (!isNaN(parsed)) {
        axios
          .get(`/api/users/myusername/${id}`)
          .then((res) => {
            const user = res.data;
            history.push(`/${user.userName}`);
          })
          .catch(() => {
            seterror('not Found');
          });
      } else {
        axios
          .get(`/api/users/current/${id}`)
          .then((user) => setuser(user.data))
          .catch(() => {
            seterror('not Found');
          });
      }
    })();
  }, [id]);

  const handleClicks = async (name) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    let social = {
      ...user.social,
      [name]: {
        ...user.social[name],
        clicks: user.social[name].clicks + 1,
      },
    };
    const body = JSON.stringify({ social });

    try {
      const u = await axios.post(
        `/api/users/update_clicks/${user._id}`,
        body,
        config
      );
      setuser(u.data);
    } catch (err) {}
  };

  if (error) return <Redirect to="/login" />;

  if (logedUser !== null && id === logedUser.userName)
    return <Redirect to="/login" />;

  if (loading || !user) return <Spinner />;

  return (
    <div>
      <div className="tuto1">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tuto-ttl">
                <h1>Hello</h1>
                <span>my name is</span>
                {isAuth ? (
                  <Link to="/login">
                    <i className=""></i>
                    Profile
                  </Link>
                ) : (
                  <Link to="/login">
                    <i className=""></i>
                    Login
                  </Link>
                )}
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
                src="https://www.profiles.blue/assets/imgs/qr-code.svg"
                width="25"
                className="showPopup"
                target="#profileQrCon"
              />
            </div>
            <div className="col-12">
              <div className="my-profile-photo">
                <img src={user.avatarUrl} alt="photo" id="profileImg" />
              </div>
              <h1 id="name">{user.name}</h1>
              <p id="bio">{user.bio}</p>
              <div className="col-12" id="btnDownloadVcard">
                <a
                  href={`${process.env.REACT_APP_DOMAIN}/api/users/vcf/${user._id}`}
                  download
                  className="btn"
                >
                  Add to Contacts
                </a>
              </div>

              <b className="text-center mt-2 mb-2 d-block">
                <Link to="/register">
                  <a className="d-block href" id="shareContact">
                    Share My Contact With {user.name}?
                  </a>
                </Link>
                <div className="col-12 social2">
                  <ul className="row">
                    {user.social &&
                      Object.keys(user.social).map(
                        (username) =>
                          user.social[username].value !== '' && (
                            <ListItem
                              user={user}
                              handleClicks={handleClicks}
                              username={username}
                              isPublic={true}
                              size={'18px'}
                            />
                          )
                      )}
                  </ul>
                </div>
              </b>
            </div>
            <b className="text-center mt-2 mb-2 d-block"></b>
          </div>
          <b className="text-center mt-2 mb-2 d-block"></b>
        </div>
        <b className="text-center mt-2 mb-2 d-block"></b>
      </div>
      <Footer />

      <QrScan user={user} show={show} setshow={setshow} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  authh: state.registerUser,
  logedUser: state.registerUser.user,
});

export default connect(mapStateToProps, { logout })(PublicProfile);
