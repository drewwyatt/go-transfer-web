export type IFetchStatus = 'NOT_FETCHED' | 'FETCHING' | 'SUCCESS' | 'ERROR' ;

export const FetchStatus = {
    NOT_FETCHED: 'NOT_FETCHED' as 'NOT_FETCHED',
    FETCHING: 'FETCHING' as 'FETCHING',
    SUCCESS: 'SUCCESS' as 'SUCCESS',
    ERROR: 'ERROR' as 'ERROR'
}