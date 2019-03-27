import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Episodes from '../../Components/Podcasts/Episodes';
import { attemptGetPodcastEpisodes, GetPodcastEpisodesAction, EpisodesSearchData } from '../../Actions/Podcast';
import { PodcastState } from '../../Reducers/PodcastReducer';
import { Episode } from '../../Models/Episode';

interface State {
  PodcastReducer: PodcastState;
}

interface StateProps {
  episodes: Episode[];
  isFetchingEpisodes: boolean;
  isFetchingPodcast: boolean;
  offset: number;
  morePages: boolean;
}

function mapStateToProps({ PodcastReducer }: State): StateProps {
  return {
    episodes: PodcastReducer.episodes,
    isFetchingEpisodes: PodcastReducer.isFetchingEpisodes,
    isFetchingPodcast: PodcastReducer.isFetchingPodcast,
    offset: PodcastReducer.offset,
    morePages: PodcastReducer.morePages,
  };
}

interface DispatchProps {
  getEpisodes: (data: EpisodesSearchData) => void;
}

type EpisodesActions = GetPodcastEpisodesAction;

function mapDispatchToProps(dispatch: Dispatch<EpisodesActions>): DispatchProps {
  return {
    getEpisodes: (data: EpisodesSearchData) => attemptGetPodcastEpisodes(data)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);