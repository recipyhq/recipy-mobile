export const FETCH_INGREDIENTS_LIST_REQUEST = 'FETCH_INGREDIENTS_LIST_REQUEST';
export const FETCH_INGREDIENTS_LIST_SUCCESS = 'FETCH_INGREDIENTS_LIST_SUCCESS';
export const FETCH_INGREDIENTS_LIST_FAILURE = 'FETCH_INGREDIENTS_LIST_FAILURE';

export const fetchIngredientsListRequest = () => ({
  type: FETCH_INGREDIENTS_LIST_REQUEST,
});

export const fetchIngredientsListSuccess = () => ({
  type: FETCH_INGREDIENTS_LIST_SUCCESS,
});

export const fetchIngredientsListFailure = () => ({
  type: FETCH_INGREDIENTS_LIST_FAILURE,
});
