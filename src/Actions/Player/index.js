import downloadjs from 'downloadjs';
import actionTypes from './types';
import { setMessage } from '../Message';
import { saveToListOfDownloads } from '../../Helpers/Downloads';
import Config from '../../Config/config';

export const play = () => ({
  type: actionTypes.START_PLAYBACK,
});

export const stop = () => ({
  type: actionTypes.STOP_PLAYBACK,
});

export const selectEpisode = (episode, src) => ({
  type: actionTypes.SET_EPISODE,
  episode,
  src,
});

export const setAudio = episode => async (dispatch) => {
  const src = `${Config.API_BASE_URL}/audio/${episode.id}`;
  dispatch(selectEpisode(episode, src));
};
export const startDownloading = episodeId => ({
  type: actionTypes.DOWNLOAD_EPISODE_START,
  episodeId,

});

export const downloaded = () => ({
  type: actionTypes.DOWNLOAD_EPISODE_SUCCESS,

});

export const failedDownload = () => ({
  type: actionTypes.DOWNLOAD_EPISODE_FAILURE,

});

export const download = episode => (dispatch) => {
  dispatch(startDownloading(episode.id));
  caches.open('thru-the-ether').then(async (cache) => {
    const path = `${Config.API_BASE_URL}/audio/${episode.id}`;
    dispatch(downloaded());
    await fetch(path)
      .then(async (res) => {
        cache.put(path, res.clone());
        const blob = await res.blob();
        downloadjs(blob, `${episode.title_original}.mp3`, 'application/octet-stream');
        saveToListOfDownloads(episode.id);
      }).catch(() => {
        dispatch(failedDownload());
        dispatch(setMessage({ text: 'failed to download the episode', type: 'error' }));
      });
  });
};
