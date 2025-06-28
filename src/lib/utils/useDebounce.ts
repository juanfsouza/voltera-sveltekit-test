import { writable } from 'svelte/store';

export function useDebounce<T>(initialValue: T, delay = 500) {
    const value = writable(initialValue);
    const debounced = writable(initialValue);

    let timer: ReturnType<typeof setTimeout>

    value.subscribe((val) => {
        clearTimeout(timer);
        timer = setTimeout(() => debounced.set(val), delay);
    });
    
    return { value, debounced };
}