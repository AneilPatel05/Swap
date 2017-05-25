import { connect } from 'react-redux';
import { Dispatch } from 'react-redux';
import { IUser, IStoreState } from 'common/interfaces';
import Dashboard from './component';
import { fetchBookmarks, deleteBookmark } from './actions';

interface StateProps {
  user : IUser;
  dashboard: any; // TODO: update
}

interface DispatchProps {
  fetchBookmarks: (accessToken: string) => void;
  deleteBookmarks: (id: number, accessToken: string) => void;
}

const mapStateToProps = (state: IStoreState, ownProp?: any): StateProps => ({
  user: state.user,
  dashboard: state.dashboard
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchProps => ({
  fetchBookmarks: accessToken => dispatch(fetchBookmarks(accessToken))
  deleteBookmark: (id, accessToken) => dispatch(deleteBookmark(id, accessToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);