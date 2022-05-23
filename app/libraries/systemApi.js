import os from "os";

let systemApi;

const jsonResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).end(JSON.stringify(data, null, 4));
};

const netLocal = (result) => {
  const nets = os.networkInterfaces();
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and Internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  console.log(results);
};

export default systemApi = {
  jsonResponse,
  netLocal,
};
