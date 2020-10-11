import { HEADER_TEXT } from '../constants/constants';
import Service from '../services/fb-service';

const getInitialState = () => ({
  displayModal: false,
  currentUser: `DM - ${HEADER_TEXT.user}`,
  companies: [],
  invoices: [],
  api: new Service(),
});

export default getInitialState;
