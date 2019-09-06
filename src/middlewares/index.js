const logger = store => next => action => {
  console.log('dispatching', action.type);
  // console.log('dispatching', action.payload);
  // console.log('dispatching', action.payload.error);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { logger, crashReporter };
