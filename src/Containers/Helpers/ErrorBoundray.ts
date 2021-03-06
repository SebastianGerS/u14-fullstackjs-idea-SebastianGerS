import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { attemptSetMessage, SetMessage } from '../../Actions/Message';
import ErrorBoundray from '../../Helpers/ErrorBoundary';
import { Message } from '../../Models/Message';

interface DispatchProps {
  setMessage: (data: Message) => void;
}
function mapDispatchToProps(dispatch: Dispatch<SetMessage>): DispatchProps {
  return {
    setMessage: (data: Message) => attemptSetMessage(data)(dispatch),
  };
}

export default connect(null, mapDispatchToProps)(ErrorBoundray);
