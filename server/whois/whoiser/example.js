const whoiser = require('./index.js');

(async () => {
  // whoiser fn auto discovers whois servers for domains, tld or IPs
  const tldInfo = await whoiser('blog');
  const domainInfo = await whoiser('google.com');
  const ipInfo = await whoiser('1.1.1.1');

  // OR use specific functions
  const domainInfo2 = await whoiser.domain('cloudflare.com', { host: 'whois.cloudflare.com' });

  console.log(tldInfo, domainInfo, ipInfo, domainInfo2);
})();
