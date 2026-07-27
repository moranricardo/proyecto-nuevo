const https = require('https');

const fetchChanges = (url, project) => {
  return new Promise((resolve, reject) => {
    https.get(`${url}/changes/?q=project:${project}+status:open`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const cleanData = data.replace(/^\)\]\}'\n/, '');
          resolve(JSON.parse(cleanData));
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
};

module.exports = { fetchChanges };
