function isNullOrUndefined<T>(arg: T) : boolean
{
    if(arg === undefined || arg === null)
        return true;
    return false;
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}


export default isNullOrUndefined;