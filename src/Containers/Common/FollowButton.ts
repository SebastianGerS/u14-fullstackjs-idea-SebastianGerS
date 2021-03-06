import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FollowButton from '../../Components/Common/FollowButton';
import { attemptToggleFollows, CreateUserEventActions } from '../../Actions/Event';
import { User } from '../../Models/User';
import { AuthState } from '../../Reducers/AuthReducer';
import { EventState } from '../../Reducers/EventReducer';
import { toggleLoginModal, ToggleLoginModal } from '../../Actions/Modal';

interface State {
  AuthReducer: AuthState;
  EventReducer: EventState;
}

interface StateProps {
  isCreatingUserEvent: boolean;
  eventTargetUserId: string;
  currentUser: User;
  isLogedIn: boolean;
}

function mapStateToProps({ EventReducer, AuthReducer }: State): StateProps {
  return {
    isCreatingUserEvent: EventReducer.isCreatingUserEvent,
    eventTargetUserId: EventReducer.eventTargetUserId,
    currentUser: AuthReducer.user,
    isLogedIn: AuthReducer.isLogedIn,
  };
}

interface DispatchProps {
  toggleFollows: (targetUserId: string) => void;
  toggleLoginModal: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<CreateUserEventActions|ToggleLoginModal>): DispatchProps {
  return {
    toggleFollows: (
      targetUserId: string,
    ) => attemptToggleFollows(targetUserId)(dispatch),
    toggleLoginModal: () => dispatch(toggleLoginModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
