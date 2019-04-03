import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { openSocket } from '../../../Helpers/Sockets';
import { AddNewNotification } from '../../Notifications';

export interface CreateSocket {
  type: ActionTypes.CREATE_SOCKET;
  socket: any;
}

const createSocket = (socket: any): CreateSocket => ({
  type: ActionTypes.CREATE_SOCKET,
  socket,
});

type AttemptCreateSocketAction = (dispatch: Dispatch<CreateSocket | AddNewNotification>) => void;
export const attemptCreateSocket = (userId: string): AttemptCreateSocketAction => (
  dispatch: Dispatch<CreateSocket | AddNewNotification>,
): void => {
  const socket = openSocket(userId, dispatch);
  dispatch(createSocket(socket));
};