// send request to /api/data/types/all
// send request to /api/individual/preferences
// collate results into list
// initialize validVisualizations to [] for all datatypes
export const LOAD_PREFERENCES = "LOAD_PREFERENCES";
export const LOAD_PREFERENCES_SUCCESS = "LOAD_PREFERENCES_SUCCESS";
export const LOAD_PREFERENCES_ERROR = "LOAD_PREFERENCES_ERROR";

// if validVisualizations for datatype is [], send request
export const LOAD_VISUALIZATIONS_FOR = "LOAD_VISUALIZATIONS_FOR";
export const LOAD_VISUALIZATIONS_FOR_SUCCESS = "LOAD_VISUALIZATIONS_FOR_SUCCESS";
export const LOAD_VISUALIZATIONS_FOR_ERROR = "LOAD_VISUALIZATIONS_FOR_ERROR";

// send request, add to list
export const ADD_VISUALIZATION = "ADD_VISUALIZATION";
export const ADD_VISUALIZATION_SUCCESS = "ADD_VISUALIZATION_SUCCESS";
export const ADD_VISUALIZATION_ERROR = "ADD_VISUALIZATION_ERROR";

// send request, remove from list
export const REMOVE_VISUALIZATION = "REMOVE_VISUALIZATION";
export const REMOVE_VISUALIZATION_SUCCESS = "REMOVE_VISUALIZATION_SUCCESS";
export const REMOVE_VISUALIZATION_ERROR = "REMOVE_VISUALIZATION_ERROR";

// send request, update list
export const UPDATE_COLOUR = "UPDATE_COLOUR";
export const UPDATE_COLOUR_SUCCESS = "UPDATE_COLOUR_SUCCESS";
export const UPDATE_COLOUR_ERROR = "UPDATE_COLOUR_ERROR";


// Load colours
export const LOAD_COLOURS = "LOAD_COLOURS";
export const LOAD_COLOURS_SUCCESS = "LOAD_COLOURS_SUCCESS";
export const LOAD_COLOURS_ERROR = "LOAD_COLOURS_ERROR";
