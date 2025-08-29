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
import {
  deleteEntry,
  getEntriesFromSheet,
  addDictionaryEntries,
  updateDictionaryFields,
  updateDictionaryEntries,
  type Sheets,
} from "./spreadsheet-tools";
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
  // spreadsheet utils
  deleteEntry,
  getEntriesFromSheet,
  addDictionaryEntries,
  updateDictionaryFields,
  updateDictionaryEntries,
  // TYPES
  type Sheets,
  type AT,
};
