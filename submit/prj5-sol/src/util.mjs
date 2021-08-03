
/** Return a new HTML element with specified tag, attributes and nested elements
 *  <tag ...attributes>
 *    ...nested
 *  </tag>
 */
export function newElement(tag, attributes = {}, ...nested) {
  const element = document.createElement(tag);
  for (const [k, v] of Object.entries(attributes)) element.setAttribute(k, v);
  if (nested.length > 0) element.append(...nested);
  return element;
}

//To set default location in Chrome: F12 to developer tools
//select 3 dots to "Customize and control DevTools" -> "More Tools" ->
//Sensors -> Location -> Other... Fill in Bingloc:
//{ lat: 42.087225457002376, lng: -75.96795097953378 },

/** Return current location { lat, lng } from browser */
export function geoLoc() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  const err = () => console.error(`cannot get geo-location`);
  return new Promise(resolve => {
    const succ = pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      resolve({ lat, lng });
    };
    navigator.geolocation.getCurrentPosition(succ, err, options);
  });
}

/** Return equivalent of `${baseUrl}${path}?${query}` with all
 *  necessary escaping performed.
 */
export function makeUrl(baseUrl, path='/', query={}) {
  const url = new URL(baseUrl);
  url.pathname = path;
  for (const [k, v] of Object.entries(query)) { url.searchParams.append(k, v); }
  return url.href;
}


/** Create and send a new custom 'buy' event to document, with details
 *  set to function parameters.
 */
export function sendBuyEvent(eateryId, itemId, nChanges=1) {
  const detail = { eateryId, itemId, nChanges };
  const buyEvent = new CustomEvent('buy', { detail });
  document.dispatchEvent(buyEvent);
}
