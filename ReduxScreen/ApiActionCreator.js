import axios from 'axios';
import {fetchData, fetchLoginSuccess, fetchLoginError} from './ApiAction';

const apiActionCreator = (url) => (dispatch) => {
  dispatch(fetchData());
  return new Promise(() => {
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchLoginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchLoginError(error));
        console.log(error);
      });
  });
};

// const apiActionCreator2 = (url) => (dispatch) => {
//     dispatch(fetchData());
//     return new Promise(() => {
//       axios
//         .get(url)
//         .then((response) => {
//           dispatch(fetchSuccess(response.data));
//         })
//         .catch((error) => {
//           dispatch(fetchError(error));
//           console.log(error);
//         });
//     });
//   };

export default {apiActionCreator}
