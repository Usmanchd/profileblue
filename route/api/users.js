const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const makeid = require('../../middleware/makeId');
const nodemailer = require('nodemailer');
const jsonfile = require('jsonfile');

router.get('/insert-record', async (req, res) => {
  try {
    const name = 'Usman';
    const file = 'data.json';
    let array = [];
    let obj = [];

    for (let index = 0; index < 9; index++) {
      const lengthId = makeid(8) + '-' + parseInt(index + 1);

      // let names = await User.find({ privateName: name.toLowerCase() });

      let userName = name.replace(/\s+/g, '').toLowerCase();
      if (index > 0) {
        userName = `${userName}-${index}`;
      }

      const salt = await bcrypt.genSalt(10);
      let password = lengthId;
      obj.push({ email: userName + '@gmail.com', password });
      password = await bcrypt.hash(password, salt);
      user = new User({
        privateName: name.toLowerCase(),
        lengthId,
        userName,
        name,
        email: userName + '@gmail.com',
        password,
        avatarUrl:
          'https://firebasestorage.googleapis.com/v0/b/blue-f42e7.appspot.com/o/images%2F9f0524f8-059a-4401-9ee0-9057eb3878ed.jpg?alt=media&token=0c175f2f-9557-46b8-9f65-7534d4621dcc',
        bio: '',
        social: {
          instagram: { value: '', clicks: 0 },
          venmo: { value: '', clicks: 0 },
          snapchat: { value: '', clicks: 0 },
          whatsapp: { value: '', clicks: 0 },
          phone: { value: '', clicks: 0 },
          twitter: { value: '', clicks: 0 },
          facebook: { value: '', clicks: 0 },
          linkedin: { value: '', clicks: 0 },
          youtube: { value: '', clicks: 0 },
          tiktok: { value: '', clicks: 0 },
          twitch: { value: '', clicks: 0 },
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
        },
      });

      // await user.save();

      array.push(user);
    }
    await User.insertMany(array);
    await jsonfile.writeFile(file, obj);
    res.send('success');
  } catch (error) {
    console.log(error);
  }
});

// @route  POST/api/users
//@desc    Register user
//@access  Public
router.post('/register', async (req, res) => {
  // See if user exist
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: { msg: 'User is already registered' } });
    }

    const lengthId =
      makeid(8) + '-' + parseInt((await User.countDocuments()) + 1);

    let names = await User.find({ privateName: name.toLowerCase() });

    let userName = name.replace(/\s+/g, '').toLowerCase();

    if (names.length > 0) {
      userName = `${userName}-${names.length}`;
    }

    user = new User({
      privateName: name.toLowerCase(),
      lengthId,
      userName,
      name,
      email,
      password,
    });

    // // hashing the password

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    // // Returning the jwt token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.jwtSecret, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/current/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findOne({ userName: id });

    if (!user)
      return res.status(400).json({ msg: 'there is no user for this user' });

    //  Enable the code below to make sure that one user only give one view
    //  and on refresh views won't increase!

    // const ip = req.connection.remoteAddress;
    // if (user.ipOfUsersThatRequestedYourProfile.includes(ip))
    //   return res.json(user);
    // user.ipOfUsersThatRequestedYourProfile.push(ip);

    user.views++;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json('Server Error');
  }
});

router.get('/myusername/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const username = await User.findOne({ lengthId: id });
    if (!username) return res.status(404).json('Not Found');
    res.json({ userName: username.userName });
  } catch (error) {
    res.status(500).json('Server Error');
  }
});

router.get('/reset/:email', async (req, res) => {
  const { email } = req.params;

  const code = Math.floor(Math.random() * 9000 + 999);

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { resetCode: code },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'there is no user for this email' });
    }

    const transporter = nodemailer.createTransport({
      service: 'Yandex',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Reset Password✔',
      text: `Your Reset Code is ${code}`,
      html: `<h1>Your Reset Code is <ul>${code}</ul></h1>`,
    });

    res.status(200).send('Check Your Email');
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/code_check', async (req, res) => {
  let code = req.body.code;
  let email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (user.resetCode === code) res.status(200).send('success');
    else res.status(400).send({ msg: 'incorrect code' });
  } catch (err) {
    res.status(500).send({ msg: 'Server Error' });
  }
});

router.post('/reset_password', async (req, res) => {
  let password = req.body.password;
  let email = req.body.email;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ email }, { password: hashedpassword });

    res.status(200).send('success');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route GET/api/users/current
//@desc Get current user profile
//@access PRIVATE

// Update User
router.post('/update_user', auth, async (req, res) => {
  let obj = req.body;
  if (obj._id) delete obj._id;

  try {
    const user = await User.findById(req.user.id);

    if (
      user.name !== obj.name &&
      obj.avatarUrl !== null &&
      obj.bio !== undefined &&
      obj.social !== undefined
    ) {
      let names = await User.find({ privateName: obj.name.toLowerCase() });
      let userName = obj.name.replace(/\s+/g, '').toLowerCase();
      if (names.length > 0) {
        userName = `${userName}-${names.length}`;
      }
      obj.privateName = obj.name.toLowerCase();
      obj.userName = userName;
      obj.name = obj.name;
    }

    if (obj.curpassword && obj.newpassword) {
      const isMatch = await bcrypt.compare(obj.curpassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: 'Password Update Fail, Current password is not correct',
        });
      }
      const salt = await bcrypt.genSalt(10);
      obj.password = await bcrypt.hash(obj.newpassword, salt);
    }
    delete obj.curpassword;
    delete obj.newpassword;

    await User.findByIdAndUpdate(req.user.id, obj);
    res.status(200).send('success');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/update_clicks/:id', async (req, res) => {
  let obj = req.body;
  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/vcf/:id', async (req, res) => {
  let { id } = req.params;

  try {
    const user = await User.findById(id);
    var vCardsJS = require('./vcards-js');
    var vCard = vCardsJS();

    if (user.avatarUrl) {
      const image2base64 = require('image-to-base64');
      const response = await image2base64(user.avatarUrl);

      vCard.photo.embedFromString(response, 'image/jpg');
    }

    if (user._id) vCard.uid = user._id;
    if (user.name) vCard.firstName = user.name;
    if (user.email) vCard.email = user.social.s_email.value;
    if (user.social.address.value)
      vCard.homeAddress.city = user.social.address.value;
    if (user.social.phone.value) vCard.cellPhone = user.social.phone.value;

    vCard.url = `${process.env.REACT_APP_DOMAIN}/${user.lengthId}`;

    if (user.social.instagram.value)
      vCard.workUrl = `https://www.instagram.com/${user.social['instagram'].value}`;
    if (user.social.instagram.value)
      vCard.instagramUrl = `https://www.instagram.com/${user.social['instagram'].value}`;
    if (user.social.snapchat.value)
      vCard.snapchatUrl = `http://snapchat.com/add/${user.social['snapchat'].value}`;
    if (user.social.twitter.value)
      vCard.twitterUrl = `http://twitter.com/${user.social['twitter'].value}`;
    if (user.social.facebook.value)
      vCard.facebookUrl = `http://facebook.com/${user.social['facebook'].value}`;
    if (user.social.linkedin.value)
      vCard.linkedinUrl = `http://linkedin.com/${user.social['linkedin'].value}`;
    if (user.social.tiktok.value)
      vCard.tiktokUrl = `http://tiktok.com/@${user.social['tiktok'].value}`;
    if (user.social.twitch.value)
      vCard.twitchUrl = `http://twitch.com/${user.social['twitch'].value}`;
    if (user.social.youtube.value)
      vCard.youtubeUrl = `http://youtube.com/${user.social['youtube'].value}`;
    if (user.social.applemusic.value)
      vCard.applemusicUrl = `http://applemusic.com/${user.social['applemusic'].value}`;
    if (user.social.spotify.value)
      vCard.spotifyUrl = `http://open.spotify.com/add/${user.social['spotify'].value}`;
    if (user.social.website.value)
      vCard.websiteUrl = `http://${user.social['website'].value}`;

    vCard.saveToFile(`./public/${user.name}.vcf`);

    res.download(`./public/${user.name}.vcf`);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
