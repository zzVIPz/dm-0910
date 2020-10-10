import { HEADER_TEXT } from '../constants/constants';
import Service from '../services/fb-service';

const getInitialState = () => ({
  isSideMenuActive: true,
  currentUser: `DM - ${HEADER_TEXT.user}`,
  api: new Service(),
});

export default getInitialState;
