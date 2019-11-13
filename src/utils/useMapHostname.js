import { computed, watch, ref } from '@vue/composition-api';

import { useGeolocation } from 'vue-use-web';

const BASE_URL = 'http://localhost:3000/mapping';

const getCache = (hostname) => localStorage.getItem(hostname)
  && JSON.parse(localStorage.getItem(hostname));


const fetchMap = async (hostname) => {
  const response = await fetch(BASE_URL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ hostname }),
  });
  const json = await response.json();
  return { data: json.data, error: json.error };
};

const useMapHostname = (hostname) => {
  const { coords } = useGeolocation({
    timeout: 27000,
  });

  const user = computed(() => ({
    latitude: coords.value.latitude || 51.44083,
    longitude: coords.value.longitude || 5.47778,
  }));

  const parent = ref(null);
  const childs = ref(null);
  const errorRef = ref(null);

  watch([hostname], () => {
    if (!hostname.value) return;
    const cache = getCache(hostname.value);

    if (cache && cache.parent && cache.childs) {
      parent.value = cache.parent;
      childs.value = cache.childs;
      console.log('from cache', cache.parent, cache.childs);
      return;
    }

    console.log('fetching...', hostname.value);
    fetchMap(hostname.value).then(({ data, error }) => {
      if (error) {
        console.log('error', error);
        errorRef.value = error;
        return;
      }
      console.log('fetched', data);
      parent.value = data.parent;
      childs.value = data.childs;
    });
  });

  watch([parent, childs], () => {
    if (parent.value && childs.value) {
      errorRef.value = null;
      localStorage.setItem(
        hostname.value,
        JSON.stringify({ parent: parent.value, childs: childs.value }),
      );
    }
  });

  return {
    user, parent, childs, error: errorRef,
  };
};

export default useMapHostname;
