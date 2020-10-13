import { HEADER_TEXT, VIEW_MODES } from '../constants/constants';
import Service from '../services/fb-service';

const getInitialState = () => ({
  viewMode: VIEW_MODES.organizationsView,
  currentUser: `DM - ${HEADER_TEXT.user}`,
  companies: [],
  invoices: [],
  api: new Service(),
});

export default getInitialState;
