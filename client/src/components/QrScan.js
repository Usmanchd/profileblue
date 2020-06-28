import React from 'react';
import xclose from '../assets/xclose.png';
import logo from '../assets/blue-logo.png';
var QRCode = require('qrcode.react');

export default function QrScan({ user, show, setshow }) {
  return (
    <div>
      <div className={`col-12 ${show}`} id="profileQrCon">
        <div className="col-12 text-right pt-4 p-0" onClick={() => setshow('')}>
          <img
            src={xclose}
            width="25"
            className="clsPopup"
            target="#profileQrCon"
            alt="QR CODE"
          />
        </div>
        <div className="col-12 r2 text-center">
          <div className="my-profile-photo">
            <img src={user.avatarUrl} alt="Avatar" id="profileImg" />
          </div>
          <div className="col-12 p-2">
            <h1>
              <b>{user.name}</b>
            </h1>
          </div>
        </div>

        <div className="col-12 text-center r3" width="200">
          <QRCode value={`${process.env.REACT_APP_DOMAIN}/${user.lengthId}`} />
        </div>
        <div className="col-12 text-center r4">
          <b>Scan this code with a camera</b>
          <br />
          <b>to share your Blue profile.</b>
        </div>
        <div className="col-12 text-center r5">
          <img src={logo} width="100" alt="LOGO" />
        </div>
      </div>
    </div>
  );
}
