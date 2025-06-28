
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
    const name = url.searchParams.get('name');
    if (!name) {
        return { age: null, name: ''};
    }

    const res = await fetch(`https://api.agify.io/?name=${name}`);
    if (!res.ok) {
        return {age: null, name };
    }

    const data = await res.json();
    return { age: data.age, name};
}