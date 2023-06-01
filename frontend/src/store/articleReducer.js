const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';
const WRITE_ARTICLE = 'article/writeArticle'

const headers = { 'Content-Type': 'application/json' }
//actions
const loadArticles = (articles) =>
{
  return {
    type: LOAD_ARTICLES,
    articles
  };
};

export const addArticle = (article) =>
{
  return {
    type: ADD_ARTICLE,
    article
  };
};

const writeArticle = (article) =>
{
  return {
    type: WRITE_ARTICLE,
    article
  }
}

//thunks
export const fetchArticles = () => async dispatch =>
{
  const res = await fetch('/api/articles');
  const articles = await res.json();
  dispatch(loadArticles(articles));
}

export const thunkWriteArticle = (article) => async dispatch =>
{
  console.log(article);
  const request = {
    method: 'POST',
    headers,
    body: JSON.stringify(article)
  }
  console.log(request);

  const res = await fetch('/api/articles', request)
  const data = await res.json();
  if (res.ok)
  {
    dispatch(writeArticle(data));
    return res;
  }
  else
  {
    return data;
  }
}

const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) =>
{
  switch (action.type)
  {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.articles] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    case WRITE_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] }
    default:
      return state;
  }
};

export default articleReducer;
