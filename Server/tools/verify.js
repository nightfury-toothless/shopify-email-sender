const hmacValidator = require("hmac-validator");

exports.verify = function (query) {
  const validate = hmacValidator({
    replacements: {
      both: {
        "&": "%26",
        "%": "%25",
      },
      keys: {
        "=": "%3D",
      },
    },
    excludedKeys: ["signature", "hmac"],
    algorithm: "sha256",
    format: "hex",
    digestKey: "hmac",
  });

  // 3. Verify signature
  return validate(process.env.APP_SECRET, null, query);
};
