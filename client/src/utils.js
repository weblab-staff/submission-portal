// Source: https://stackoverflow.com/questions/8064691/how-do-i-pass-along-variables-with-xmlhttprequest
function formatParams(params) {
  return Object
    .keys(params)
    .map(function(key) {
      return key+'='+encodeURIComponent(params[key])
    })
    .join('&');
}

 // params is given as a JSON
export const get = (endpoint, params) => {
  const fullPath = endpoint + (params ? `?${formatParams(params)}` : '');
  return fetch(fullPath).then(res => res.json());
}

export const post = (endpoint, params) => {
  return fetch(endpoint, {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(params)
  }).then(res => {    
    if (res.status === 200) {
      return res.json();
    }
    return res.status;
  });
}

export const delet = (endpoint, params) => {
  return fetch(endpoint, {
    method: 'delete',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(params)
  }).then(res => {    
    if (res.status === 200) {
      return res.json();
    }
    return res.status;
  });
}