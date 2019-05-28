export function createStore(initialState = {}) {
  let state = initialState;
  let subscribers = [];

  const getState = () => state;

  const setState = newState => {
    state = newState;
    subscribers.map(fn => fn());
  };

  const subscribe = fn => {
    if (!subscribers.includes(fn)) {
      subscribers.push(fn);
    }
    return () => {
      subscribers = subscribers.filter(fun => fun !== fn);
    };
  };

  return {
    getState,
    setState,
    subscribe
  };
}
