import fetch from 'node-fetch';

export default async  () => {

  const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
  let pc = {};

  try {
    let pc = {};
    let f = await fetch(pcUrl);

    if(f) return f.json();

    return "Empty result";

  } catch(e) {

    return "some error " + e;
  }

}
