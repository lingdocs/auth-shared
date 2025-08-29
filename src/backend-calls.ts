import {
  APIResponse,
  FunctionError,
  LingdocsUser,
  PostTestResultsBody,
  PostTestResultsResponse,
  PublishDictionaryResponse,
  SubmissionsRequest,
  SubmissionsResponse,
  TestResult,
  UpdateUserTextOptionsRecordBody,
  UpgradeUserResponse,
} from "./types";

type Service = "account" | "submissions" | "functions";

const baseUrl: Record<Service, string> = {
  account: "https://account.lingdocs.com/api/",
  // clean up redundancy in call, put it all in api?
  submissions: "https://account.lingdocs.com/",
  functions: "https://functions.lingdocs.com/",
};

export async function publishDictionary(): Promise<
  PublishDictionaryResponse | FunctionError
> {
  return (await myFetch("functions", "publish", "GET")) as
    | PublishDictionaryResponse
    | FunctionError;
}

export async function postSubmissions(
  submissions: SubmissionsRequest,
): Promise<SubmissionsResponse> {
  return (await myFetch(
    "submissions",
    "submissions",
    "POST",
    submissions,
  )) as SubmissionsResponse;
}

// ACCOUNT CALLS
export async function upgradeAccount(
  password: string,
): Promise<UpgradeUserResponse> {
  const response = await myFetch("account", "user/upgrade", "PUT", {
    password,
  });
  return response as UpgradeUserResponse;
}

export async function upgradeToStudentRequest(): Promise<APIResponse> {
  return (await myFetch(
    "account",
    "user/upgradeToStudentRequest",
    "POST",
  )) as APIResponse;
}

export async function postTestResults(
  tests: TestResult[],
): Promise<PostTestResultsResponse> {
  const response = (await myFetch("account", "user/tests", "PUT", {
    tests,
  })) as PostTestResultsResponse;
  return response;
}

export async function signOut() {
  try {
    await myFetch("account", "sign-out", "POST");
  } catch (e) {
    return;
  }
}

export async function getUser(): Promise<undefined | LingdocsUser | "offline"> {
  try {
    const response = await myFetch("account", "user", "GET");
    if ("user" in response) {
      return response.user;
    }
    return undefined;
  } catch (e) {
    console.error(e);
    return "offline";
  }
}

export async function myFetch(
  service: Service,
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  // better typing and safety of all this
  body?:
    | SubmissionsRequest
    | { password: string }
    | UpdateUserTextOptionsRecordBody
    | PostTestResultsBody,
): Promise<APIResponse> {
  const response = await fetch(baseUrl[service] + url, {
    method,
    credentials: "include",
    ...(body
      ? {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      : {}),
  });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return {
      ok: false,
      error: `error parsing json for: ${text}`,
    };
  }
}
