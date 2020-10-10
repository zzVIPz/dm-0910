import { HEADER_TEXT } from '../constants/constants';

const getInitialState = () => ({
  isSideMenuActive: true,
  currentUser: `DM - ${HEADER_TEXT.user}`,
});

export default getInitialState;
