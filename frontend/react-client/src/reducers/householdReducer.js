import {
    HOUSEHOLD_LIST_REQUEST,
    HOUSEHOLD_LIST_SUCCESS,
    HOUSEHOLD_LIST_FAILURE,
    HOUSEHOLD_DETAILS_REQUEST,
    HOUSEHOLD_DETAILS_SUCCESS,
    HOUSEHOLD_DETAILS_FAILURE,
    HOUSEHOLD_ADD_ORDER_REQUEST,
    HOUSEHOLD_ADD_ORDER_SUCCESS,
    HOUSEHOLD_ADD_ORDER_FAILURE,
    HOUSEHOLD_ORDERS_REQUEST,
    HOUSEHOLD_ORDERS_SUCCESS,
    HOUSEHOLD_ORDERS_FAILURE,
} from "../constants/householdConstants";

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

export const householdDetailsReducer = (state = { household: {} }, action) => {
    switch (action.type) {
        case HOUSEHOLD_DETAILS_REQUEST:
            return { loading: true, ...state };
        case HOUSEHOLD_DETAILS_SUCCESS:
            return { loading: false, household: action.payload };
        case HOUSEHOLD_DETAILS_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const householdAddOrderReducer = (state = { household: {} }, action) => {
    switch (action.type) {
        case HOUSEHOLD_ADD_ORDER_REQUEST:
            return { loading: true, ...state };
        case HOUSEHOLD_ADD_ORDER_SUCCESS:
            return { loading: false, household: action.payload };
        case HOUSEHOLD_ADD_ORDER_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const householdOrdersListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case HOUSEHOLD_ORDERS_REQUEST:
            return { loading: true, orders: [] };
        case HOUSEHOLD_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload };
        case HOUSEHOLD_ORDERS_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
