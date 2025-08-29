export function objIsEqual(obj1, obj2) {
    if (!obj1 || !obj2)
        return false;
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
export function userObjIsEqual(u1, u2) {
    if (!u1 || !u2)
        return false;
    function removeFrills(u) {
        if (!("_rev" in u))
            return u;
        const { lastActive, _rev, ...rest } = u;
        return rest;
    }
    return objIsEqual(removeFrills(u1), removeFrills(u2));
}
