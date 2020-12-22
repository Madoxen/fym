function isNullOrUndefined<T>(arg: T) : boolean
{
    if(arg === undefined || arg === null)
        return true;
    return false;
}
