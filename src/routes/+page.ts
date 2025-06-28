import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
  const name = url.searchParams.get('name');
  const country = url.searchParams.get('country');

  if (!name) {
    return { age: null, name: '', count: null, country: '', invalid: false, limitReached: false };
  }

  const namePattern = /^[a-zA-ZÀ-ÿ]+$/;
  if (!namePattern.test(name)) {
    return { age: null, name, count: null, country, invalid: true, limitReached: false };
  }

  let apiUrl = `https://api.agify.io/?name=${name}`;
  if (country) {
    apiUrl += `&country_id=${country}`;
  }

  const res = await fetch(apiUrl);

  if (res.status === 429) {
    return { age: null, name, count: null, country, invalid: false, limitReached: true };
  }

  if (!res.ok) {
    return { age: null, name, count: null, country, invalid: false, limitReached: false };
  }

  const data = await res.json();

  return {
    age: data.age,
    name: data.name,
    count: data.count,
    country: data.country_id || country,
    invalid: false,
    limitReached: false
  };
};
