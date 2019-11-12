const util = require("util");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const normalizeUrl = require("normalize-url");

const geoip = require("geoip-lite");
const dns = require("dns");

const normalizeUrlWrapper = (...args) => {
  try {
    return normalizeUrl(...args);
  } catch (error) {
    return null;
  }
};

const lookup = async url =>
  new Promise((resolve, reject) => {
    const hostname = new URL(url).hostname;
    dns.lookup(hostname, (err, address) => {
      if (err) resolve(null);
      util.log("Lookup", hostname);
      resolve({ hostname, address });
    });
  });

const getGeo = ({ hostname, address }) => {
  const geo = geoip.lookup(address);
  util.log("Geo", hostname);
  if (!geo) return null;
  return {
    hostname,
    address,
    country: geo.country,
    city: geo.country,
    latitude: geo.ll[0],
    longitude: geo.ll[1],
  }
}

const onlySuccessLookup = v => !!v;
const onlySuccessNormalizeUrl = v => !!v;

const getLinks = async url => {
  const resources_hostnames = new Set();

  class CustomResourceLoader extends jsdom.ResourceLoader {
    fetch(url, options) {
      try {
        resources_hostnames.add(normalizeUrlWrapper(new URL(url).hostname));
      } catch (error) { }
      return super.fetch(url, options);
    }
  }

  const options = {
    resources: new CustomResourceLoader(),
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole: new jsdom.VirtualConsole(),
    cookieJar: new jsdom.CookieJar(),
    strictSSL: false,
  };

  console.log('here');
  const dom = await JSDOM.fromURL(url, options);

  [
    ...dom.window.document.getElementsByTagName("link"),
    ...dom.window.document.getElementsByTagName("script")
  ]
    .map(element => element.getAttribute("href") || element.getAttribute("src"))
    .filter(href => href)
    .map(normalizeUrlWrapper)
    .filter(onlySuccessNormalizeUrl)
    .map(href => new URL(href).hostname)
    .map(normalizeUrlWrapper)
    .filter(onlySuccessNormalizeUrl)
    .forEach(hostname => resources_hostnames.add(hostname));

  console.log(resources_hostnames);
  return [...resources_hostnames];
}

const mapping = async (hostname) => {
  const url = hostname;

  const parent = (await Promise.all([url].map(lookup)))
  .filter(onlySuccessLookup)
  .map(getGeo)[0];
  
  const links = await getLinks(url);
  const childs = (await Promise.all(links.map(lookup)))
    .filter(onlySuccessLookup)
    .map(getGeo)
    .filter(onlySuccessLookup)

  return { parent, childs };
}

exports.mapping = async (req, res) => {
  try {
    console.log(req.query.hostname || req.body.hostname);
    const data = await mapping(req.query.hostname || req.body.hostname);
    console.log(data);
    res.status(200).send({ data, status: 200 });
  } catch (error) {
    res.status(500).send({ error: error.toString(), status: 500 });
  }
}