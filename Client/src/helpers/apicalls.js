const API = process.env.REACT_APP_API;

export const fetchUser = (store) => {
  return fetch(`${API}/user?store=${store}.myshopify.com`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.length !== 0) {
        localStorage.setItem("shopify-user", JSON.stringify(data[0]));
      } else {
        localStorage.setItem("shopify-user", JSON.stringify(data[0]));
      }
      return data;
    });
};

export const updateTemplate = (store, template) => {
  return fetch(`${API}/user/template?store=${store}.myshopify.com`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(template),
  }).then((response) => {
    return response.json();
  });
};
