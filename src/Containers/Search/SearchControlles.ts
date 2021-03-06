import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import SearchControlles from '../../Components/Search/SearchControlles';
import {
  attemptSetSearchTypes, SetSearchTypeAction, attemptSetSearchFilters,
  SetSearchFiltersAction, FetchFiltersAction, attemptFetchFilters,
  attemptSetSearchSorting,
  SetSearchSortingAction,
} from '../../Actions/Search';
import { SearchState } from '../../Reducers/SearchReducer';
import { Filters } from '../../Models/Filters';
import { Genre } from '../../Models/Genre';
import { SetMessage } from '../../Actions/Message';

interface State {
  SearchReducer: SearchState;
}

interface StateProps {
  type: string;
  filters: Filters;
  genres: List<Genre>;
  languages: List<string>;
  sorting: string;
  isSearching: boolean;
}

function mapStateToProps({ SearchReducer }: State): StateProps {
  return {
    type: SearchReducer.type,
    filters: SearchReducer.filters,
    genres: SearchReducer.genres,
    languages: SearchReducer.languages,
    sorting: SearchReducer.sorting,
    isSearching: SearchReducer.isSearching,
  };
}

interface DispatchProps {
  attemptSetType: (data: string) => void;
  attemptSetFilters: (filters: Filters) => void;
  getFilters: () => void;
  setSorting: (sorting: string) => void;
}

type SearchControllesActions = (
  SetSearchTypeAction | SetSearchFiltersAction | FetchFiltersAction | SetSearchSortingAction | SetMessage
);

function mapDispatchToProps(dispatch: Dispatch<SearchControllesActions>): DispatchProps {
  return {
    attemptSetType: (data: string) => attemptSetSearchTypes(data)(dispatch),
    attemptSetFilters: (filters: Filters) => attemptSetSearchFilters(filters)(dispatch),
    getFilters: () => attemptFetchFilters()(dispatch),
    setSorting: (sorting: string) => attemptSetSearchSorting(sorting)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchControlles);
