import { FETCH_TABLES, FETCH_TABLES_COMPLETE, ASYNC_ERROR } from '../actions/types';
import { ROOT_URL, AUTH_KEY, getTables, setTables } from '../actions/index';
import { Observable } from 'rxjs';

//epic
export const fetchTablesEpic = action$ =>
  action$.ofType(FETCH_TABLES).mergeMap(({ payload }) =>
    Observable.ajax({
      method: 'GET',
      url: ROOT_URL + '/tables',
      crossDomain: true,
      headers: {
        Authorization: AUTH_KEY,
      },
      body: JSON.stringify(payload),
    })
      .map(promise => setTables(promise))
      .catch(error =>
        Observable.of({
          type: ASYNC_ERROR,
        })
      )
  );
