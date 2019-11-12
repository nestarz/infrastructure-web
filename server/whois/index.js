const whoiser = require('./whoiser');
const dns = require('dns');
let root_db = require('./root_database_iana_101119.json');
const geoip = require("geoip-lite");

root_db = root_db.reduce((res, { Domain, ...information }) => {
  res[Domain.toUpperCase().replace('.', '')] = information;
  return res;
}, {})

var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder({
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
});

const lookup = async hostname =>
  new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, address) => {
      if (err) reject(err);
      resolve(address);
    });
  });

var parse_host = async function (url) {
  const host = new URL(url).hostname
  const tlds = await whoiser.allTlds();
  var parts = host.split(".");
  var stack = "", tld_level = 1; //unknown tld are 1st level
  for (var i = parts.length - 1, part; i >= 0; i--) {
    part = parts[i];
    stack = stack ? part + "." + stack : part;

    if (!tlds[stack]) break;
    tld_level = tlds[stack];
  }

  if (parts.length <= tld_level)
    throw new Error("Invalid TLD");

  return {
    tld: parts.slice(-tld_level).join('.'),
    domain: parts.slice(-tld_level - 1).join('.'),
    sub: parts.slice(0, (-tld_level - 1)).join('.'),
  };
};

const whois = async (url) => {
  const hostname = await parse_host(url);
  const hostip = await lookup(hostname.domain);
  const domain = await whoiser(hostname.domain, { raw: true })
  const tld = await whoiser(hostname.tld, { raw: true })
  tld.organisation.geo = await geocoder.geocode(tld.organisation.address);
  const ip = await whoiser(hostip, { raw: true })

  return { domain, tld, ip };
}

exports.whois = async (req, res) => {
  const result = await whois(req.query.hostname || req.body.hostname || 'https://www.designacademy.nl/');
  console.log(result);
  res.status(200).send(result);
}

exports.whoisIps = async (req, res) => {
  const result = await Promise.all(req.body.map(async ip => {
    const geo = geoip.lookup(ip);
    if (!geo) return null;
    return {
      ip,
      country: geo.country,
      city: geo.city,
      latitude: geo.ll[0],
      longitude: geo.ll[1],
    }
  }));
  console.log(result);
  res.status(200).send(result);
}

exports.allTlds = async (req, res) => {
  const tlds = [...new Set(await whoiser.allTlds())];
  res.status(200).send(tlds);
}

exports.whoisTlds = async (req, res) => {
  let cancelRequest = false;
  req.on('close', () => cancelRequest = true);

  const tlds = [...new Set(req.body)];

  const result = [];
  for (const tld of tlds) {
    if (cancelRequest) break;

    const domain = `.${tld.toLowerCase()}`;
    const whois = await whoiser(domain, { raw: true });
    if (!whois.organisation || !whois.organisation.address) {
      result.push(null);
      continue;
    };
    result.push({
      domain: tld,
      ...(root_db[tld] || {}),
      ...whois,
      // geo: await geocoder.geocode(whois.organisation.address),
    })
  }
  res.status(200).send(result);
}