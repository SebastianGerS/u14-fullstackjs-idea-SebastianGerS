import { List } from 'immutable';
import * as ActionTypes from '../Actions/Search/types';
import { User } from '../Models/User';
import { Episode } from '../Models/Episode';
import { Podcast } from '../Models/Podcast';
import { SearchAction } from '../Actions/Search/index';
import { Filters } from '../Models/Filters';
import { Genre } from '../Models/Genre';

export interface SearchState {
  isSearching: boolean;
  isUpdatingSearchSettings: boolean;
  type: string;
  filters: Filters;
  sorting: string;
  results: (Podcast|Episode|User)[];
  term: string;
  morePages: boolean;
  offset: number;
  genres: List<Genre>;
  languages: List<string>;
}
const DEFAULT_STATE: SearchState = {
  isSearching: false,
  isUpdatingSearchSettings: false,
  type: 'podcast',
  filters: new Filters(
    {
      genres: List(),
      field: undefined,
      language: undefined,
      len_max: '',
      len_min: '',
    },
  ),
  sorting: '0',
  results: [],
  term: '',
  morePages: false,
  offset: 0,
  genres: List(),
  languages: List(),
};

export default function (state: SearchState = DEFAULT_STATE, action: SearchAction): SearchState {
  switch (action.type) {
    case ActionTypes.SET_SEARCHTYPE_START:
      return { ...state, isUpdatingSearchSettings: true };
    case ActionTypes.SET_SEARCHTYPE_SUCCESS:
      return {
        ...state,
        type: action.searchType,
        isUpdatingSearchSettings: false,
        offset: 0,
        morePages: false,
        filters: new Filters(),
      };
    case ActionTypes.SET_SEARCHTYPE_FAILURE:
      return { ...state, isUpdatingSearchSettings: false };
    case ActionTypes.SEARCH_START:
      return { ...state, isSearching: true };
    case ActionTypes.SEARCH_SUCCESS:
      let results: (User | Podcast | Episode)[];
      switch (state.type) {
        case 'user':
          results = action.data.results.map((user: User) => new User(user));
          break;
        case 'episode':
          results = action.data.results.map((episode: Episode) => new Episode(episode));
          break;
        case 'podcast':
          results = action.data.results.map((podcast: Podcast) => new Podcast(podcast));
          break;
        default:
          results = [];
          break;
      }
      return {
        ...state,
        results,
        term: action.data.term,
        offset: action.data.next_offset,
        morePages: action.data.morePages,
        isSearching: false,
      };
    case ActionTypes.SEARCH_FAILURE:
      return {
        ...state, isSearching: false, results: [], morePages: false,
      };
    case ActionTypes.SET_SEARCHFILTERS_START:
      return {
        ...state, isUpdatingSearchSettings: true,
      };
    case ActionTypes.SET_SEARCHFILTERS_SUCCESS:
      return {
        ...state,
        isUpdatingSearchSettings: false,
        filters: new Filters(action.filters),
        offset: 0,
        morePages: false,
      };
    case ActionTypes.SET_SEARCHFILTERS_FAILURE:
      return {
        ...state, isUpdatingSearchSettings: false,
      };
    case ActionTypes.FETCH_FILTERS_START:
      return {
        ...state, isUpdatingSearchSettings: true,
      };
    case ActionTypes.FETCH_FILTERS_SUCCESS:
      return {
        ...state,
        isUpdatingSearchSettings: false,
        genres: List(action.genres),
        languages: List(action.languages),
      };
    case ActionTypes.FETCH_FILTERS_FAILURE:
      return {
        ...state, isUpdatingSearchSettings: false,
      };
    case ActionTypes.SET_SEARCHSORTING_START:
      return {
        ...state, isUpdatingSearchSettings: true,
      };
    case ActionTypes.SET_SEARCHSORTING_SUCCESS:
      return {
        ...state,
        isUpdatingSearchSettings: false,
        sorting: action.sorting,
      };
    case ActionTypes.SET_SEARCHSORTING_FAILURE:
      return {
        ...state, isUpdatingSearchSettings: false,
      };
    case ActionTypes.UPDATE_USER_SEARCH_RESULTS:
      return {
        ...state,
        results: state.results.map((item: User) => {
          if (item._id === action.user._id) {
            return new User(action.user);
          }

          return item;
        }),
      };
    default:
      return { ...state };
  }
}
