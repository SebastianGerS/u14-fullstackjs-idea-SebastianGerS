import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SiteRoute from '../../Helpers/SiteRoute';
import {
  checkIfLogedIn, UserLogoutSuccess, IsLogedIn, createSocket, SetSocket,
} from '../../Actions/Auth';
import { checkIfResized, setHeight, SetHeight } from '../../Actions/Modal';
import { AuthState } from '../../Reducers/AuthReducer';
import { ModalState } from '../../Reducers/ModalReducer';
import { UnsetRedirect, unsetRedirect } from '../../Actions/Redirect';
import {
  GetNotificationsAction, attemptGetNotifications, AddNotificationActions, addNotification,
} from '../../Actions/Notifications';
import { NotificationState } from '../../Reducers/NotificationReducer';
import { Notification } from '../../Models/Notification';
import {
  attemptGetFollows, GetFollowsAction, updateOnlineStatuses, UpdateOnlineStatuses,
  SetOnlineStatuses, setOnlineStatuses, getFollowsSuccess, GetFollowsSuccess, Follows,
} from '../../Actions/User';
import {
  attemptGetFollowingEvents, GetFollowingEventsAction, setEvent, SetEvent,
} from '../../Actions/Event';
import { Event } from '../../Models/Event';
import { OnlineStatus } from '../../Models/OnlineStatus';

interface State {
  AuthReducer: AuthState;
  ModalReducer: ModalState;
  NotificationReducer: NotificationState;
}

interface StateProps {
  isLogedIn: boolean;
  isAdmin: boolean;
  height: number;
  notifications: Notification[];
  socket: any;
  userId: string | StringConstructor;
}

function mapStateToProps({ AuthReducer, ModalReducer, NotificationReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    isAdmin: AuthReducer.isAdmin,
    height: ModalReducer.height,
    notifications: NotificationReducer.notifications,
    socket: AuthReducer.socket,
    userId: AuthReducer.user._id,
  };
}

type SiteRouteActions = (
  UserLogoutSuccess | IsLogedIn | SetHeight | UnsetRedirect | GetFollowsAction | SetEvent | UpdateOnlineStatuses
  | GetNotificationsAction | SetSocket | AddNotificationActions | GetFollowingEventsAction
  | SetOnlineStatuses | GetFollowsSuccess
);

interface DispatchProps {
  checkIfLogedIn: () => void;
  checkIfResized: () => void;
  setHeight: (height: number) => void;
  unsetRedirect: () => void;
  getNotifications: (offset: number) => void;
  createSocket: () => void;
  getFollows: () => void;
  addNotification: (notification: Notification) => void;
  getFollowingEvents: (offset: number) => void;
  setEvent: (event: Event) => void;
  updateOnlineStatuses: (status: OnlineStatus) => void;
  setOnlineStatuses: (status: string[]) => void;
  updateFollows: (follows: Follows) => void;
}

function mapDispatchToProps(dispatch: Dispatch<SiteRouteActions>): DispatchProps {
  return {
    checkIfLogedIn: () => checkIfLogedIn()(dispatch),
    checkIfResized: () => checkIfResized()(dispatch),
    setHeight: (height: number) => dispatch(setHeight(height)),
    unsetRedirect: () => dispatch(unsetRedirect()),
    getNotifications: (offset: number) => attemptGetNotifications(offset)(dispatch),
    createSocket: () => createSocket()(dispatch),
    getFollows: () => attemptGetFollows()(dispatch),
    addNotification: (notification: Notification) => addNotification(notification)(dispatch),
    getFollowingEvents: (offset: number) => attemptGetFollowingEvents(offset)(dispatch),
    setEvent: (event: Event) => dispatch(setEvent(event)),
    updateOnlineStatuses: (status: OnlineStatus) => dispatch(updateOnlineStatuses(status)),
    setOnlineStatuses: (userIds: string[]) => dispatch(setOnlineStatuses(userIds)),
    updateFollows: (follows: Follows) => dispatch(getFollowsSuccess(follows)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteRoute);
