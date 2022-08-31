export const helpHttp = () => {
  let api="";
  if (window.location.href.includes("localhost")) {
    api="http://localhost:8080/";    
  }else{
    api= "https://api.wander-lust.com.ar/";
  }

  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      "content-type": "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    //console.log(options);
    setTimeout(() => controller.abort(), 6000);

    return fetch(endpoint, options)
      .then((res) =>{ 
        return res.json()
      }).then((res)=>{
        return res
      }).catch((err) => console.log(err) );
  };

  const get = (url, options = {}) => customFetch(api+url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(api+url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(api+url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(api+url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
