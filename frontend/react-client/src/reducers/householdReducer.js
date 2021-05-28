import {
    HOUSEHOLD_LIST_REQUEST,
    HOUSEHOLD_LIST_SUCCESS,
    HOUSEHOLD_LIST_FAILURE

} from "../constants/householeConstants";

export const householdListReducer = (state = { storeLocations: [] }, action) => {
    switch (action.type) {
        case HOUSEHOLD_LIST_REQUEST:
            return { loading: true, storeLocations: [] };
        case HOUSEHOLD_LIST_SUCCESS:
            return { loading: false, storeLocations: action.payload };
        case HOUSEHOLD_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};