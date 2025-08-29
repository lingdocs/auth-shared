const baseUrl = {
    account: "https://account.lingdocs.com/api/",
    // clean up redundancy in call, put it all in api?
    submissions: "https://account.lingdocs.com/",
    functions: "https://functions.lingdocs.com/",
};
export async function publishDictionary() {
    return (await myFetch("functions", "publish", "GET"));
}
export async function postSubmissions(submissions) {
    return (await myFetch("submissions", "submissions", "POST", submissions));
}
// ACCOUNT CALLS
export async function upgradeAccount(password) {
    const response = await myFetch("account", "user/upgrade", "PUT", {
        password,
    });
    return response;
}
export async function upgradeToStudentRequest() {
    return (await myFetch("account", "user/upgradeToStudentRequest", "POST"));
}
export async function postTestResults(tests) {
    const response = (await myFetch("account", "user/tests", "PUT", {
        tests,
    }));
    return response;
}
export async function signOut() {
    try {
        await myFetch("account", "sign-out", "POST");
    }
    catch (e) {
        return;
    }
}
export async function getUser() {
    try {
        const response = await myFetch("account", "user", "GET");
        if ("user" in response) {
            return response.user;
        }
        return undefined;
    }
    catch (e) {
        console.error(e);
        return "offline";
    }
}
export async function myFetch(service, url, method, 
// better typing and safety of all this
body) {
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
    }
    catch (e) {
        return {
            ok: false,
            error: `error parsing json for: ${text}`,
        };
    }
}
