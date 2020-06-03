import {
  AppointmentData,
  getUnshownAppointments,
  postAppointment,
  PostAppointmentData,
} from './AppointmentData';
import {
  Action,
  ActionCreator,
  Dispatch,
  Reducer,
  combineReducers,
  Store,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

interface AppointmentState {
  readonly loading: boolean;
  readonly unshown: AppointmentData[] | null;
  readonly postedResult?: AppointmentData;
}

export interface AppState {
  readonly appointments: AppointmentState;
}

const initialAppointmentState: AppointmentState = {
  loading: false,
  unshown: null,
};

interface GettingUnshownAppointmentsAction
  extends Action<'GettingUnshownAppointments'> {
  type: 'GettingUnshownAppointments';
}

export interface GotUnshownAppointmentsAction
  extends Action<'GotUnshownAppointments'> {
  appointments: AppointmentData[];
}

export interface PostedAppointmentsAction extends Action<'PostedAppointment'> {
  result: AppointmentData | undefined;
}

type AppointmentActions =
  | GettingUnshownAppointmentsAction
  | GotUnshownAppointmentsAction
  | PostedAppointmentsAction;

export const getUnshownAppointmentsActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  AppointmentData[],
  null,
  GotUnshownAppointmentsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const gettingUnshownAppointmentsAction: GettingUnshownAppointmentsAction = {
      type: 'GettingUnshownAppointments',
    };
    dispatch(gettingUnshownAppointmentsAction);
    const appointments = await getUnshownAppointments();
    const gotUnshownAppointmentsAction: GotUnshownAppointmentsAction = {
      appointments,
      type: 'GotUnshownAppointments',
    };
    dispatch(gotUnshownAppointmentsAction);
  };
};

export const postAppointmentActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  AppointmentData,
  PostAppointmentData,
  PostedAppointmentsAction
>> = (appointment: PostAppointmentData) => {
  return async (dispatch: Dispatch) => {
    const result = await postAppointment(appointment);
    const postedAppointmentsAction: PostedAppointmentsAction = {
      type: 'PostedAppointment',
      result,
    };
    dispatch(postedAppointmentsAction);
  };
};

export const clearPostedAppointmentActionCreator: ActionCreator<PostedAppointmentsAction> = () => {
  const postedAppointmentsAction: PostedAppointmentsAction = {
    type: 'PostedAppointment',
    result: undefined,
  };
  return postedAppointmentsAction;
};

const appointmentsReducer: Reducer<AppointmentState, AppointmentActions> = (
  state = initialAppointmentState,
  action,
) => {
  switch (action.type) {
    case 'GettingUnshownAppointments': {
      return {
        ...state,
        unshown: null,
        loading: true,
      };
    }
    case 'GotUnshownAppointments': {
      return {
        ...state,
        unshown: action.appointments,
        loading: false,
      };
    }
    case 'PostedAppointment': {
      return {
        ...state,
        unshown: action.result
          ? (state.unshown || []).concat(action.result)
          : state.unshown,
        postedResult: action.result,
      };
    }
    default:
      neverReached(action);
  }
  return state;
};

const neverReached = (never: never) => {};
const rootReducer = combineReducers<AppState>({
  appointments: appointmentsReducer,
});

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
