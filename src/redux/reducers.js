import {
  ADD_ATTENDING,
  ADD_USER,
  CLEAR_STATE,
  REMOVE_ATTENDING,
  UPDATE_ATTENDING,
} from "./actions";

const initialState = {
  user: null,
  attending: [],
  drafts: [],
  lastKnowLocation: null,
};

const gigRadarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case ADD_ATTENDING: {
      return {
        ...state,
        attending: [...state.attending, action.payload],
      };
    }
    case REMOVE_ATTENDING: {
      return {
        ...state,
        attending: state.attending.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }
    case UPDATE_ATTENDING: {
      return {
        ...state,
        attending: action.payload,
      };
    }
    case CLEAR_STATE: {
      return {
        user: null,
        attending: [],
        drafts: [],
        lastKnowLocation: null,
      };
    }
    default:
      return state;
  }
};

export default gigRadarReducer;
