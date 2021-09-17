const User = require("../models/user");
const url = require("url");
const request = require("request-promise");
const { verify } = require("../tools/verify");

exports.install = (req, res) => {
  const shop = req.query.shop;
  const apiKey = process.env.API_KEY;
  const appScope = process.env.APP_SCOPE;
  const appDomain = process.env.APP_DOMAIN;

  //build the url
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${appScope}&redirect_uri=http://${appDomain}/api/shopify/auth`;

  //Do I have the token already for this store?
  //Check database
  res.redirect(installUrl);
};

exports.authenticate = async (req, res) => {
  let securityPass = false;
  const apiKey = process.env.API_KEY;
  const appSecret = process.env.APP_SECRET;
  const shop = req.query.shop;
  const storename = shop.split(".")[0];
  const code = req.query.code;

  const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;

  shop.match(regex) ? (securityPass = true) : (securityPass = false);

  // 1. Parse the string URL to object
  const urlObj = url.parse(req.url);
  // 2. Get the 'query string' portion
  const query = urlObj.search.slice(1);
  verify(query) ? (securityPass = true) : (securityPass = false);

  if (securityPass && regex) {
    //Exchange temporary code for a permanent access token
    let accessTokenRequestUrl = "https://" + shop + "/admin/oauth/access_token";
    let accessTokenPayload = {
      client_id: apiKey,
      client_secret: appSecret,
      code,
    };

    request
      .post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then((accessTokenResponse) => {
        let accessToken = accessTokenResponse.access_token;

        const user = new User({
          store: shop,
          accesstoken: accessToken,
        });

        User.find({
          store: shop,
        }).exec((err, u) => {
          if (err) {
            return res.status(400).json(err);
          }
          if (u.length === 0) {
            user.save((err, user) => {
              if (err) {
                return res
                  .status(400)
                  .json({ error: "Not able to save user in DB" });
              }
            });
          }
        });
        res.redirect(process.env.APP_CLIENT + storename);
      })
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });
  } else {
    res.redirect("/installerror");
  }
};
