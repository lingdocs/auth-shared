import * as AT from "./types";
import { getTimestamp } from "./time-utils";
import { userObjIsEqual, objIsEqual } from "./misc-helpers";
import {
  myFetch,
  signOut,
  upgradeAccount,
  upgradeToStudentRequest,
  getUser,
  postTestResults,
  postSubmissions,
  publishDictionary,
} from "./backend-calls";
export {
  // FUNCTIONS
  getTimestamp,
  objIsEqual,
  userObjIsEqual,
  // fetching
  myFetch,
  signOut,
  upgradeAccount,
  upgradeToStudentRequest,
  getUser,
  postTestResults,
  postSubmissions,
  publishDictionary,
  // TYPES
  type AT,
};
