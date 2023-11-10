import axios, { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from 'axios';

const url = import.meta.env.VITE_API_URL || 'http://localhost:3550/';
const url2 = import.meta.env.VITE_LOGGER_URL || 'http://localhost:3660/';
const config: AxiosRequestConfig = {
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
  // withCredentials: true,
}

function buildRoute(route: string) {
  return `${route.startsWith('api') ? url : url2}${route}`;
}

/**
 * Use axios to make a GET request to the API with the given route
 * @param route The route to use **without the API url** (eg : `api/ping`)
 * @param onProgress Callback triggered on upload
 * @returns the promise for the request
 */
function GetRequest(route: string,
  onProgress: (((ProgressEvent: AxiosProgressEvent) => void) | undefined) = undefined): Promise<AxiosResponse<any, any>> {
  if (onProgress) config.onUploadProgress = onProgress;
  return axios.get(buildRoute(route), config);
}

/**
 * Use axios to make a POST request to the API with the given route
 * @param route The route to use **without the API url** (eg : `api/ping`)
 * @param onProgress Callback triggered on upload
 * @returns the promise for the request
 */
function PostRequest(route: string, data: any,
  onProgress: (((ProgressEvent: AxiosProgressEvent) => void) | undefined) = undefined): Promise<AxiosResponse<any, any>> {
  if (onProgress) config.onUploadProgress = onProgress;
  return axios.post(buildRoute(route), data, config);
}

/**
 * Use axios to make a DELETE request to the API with the given route
 * @param route The route to use **without the API url** (eg : `api/ping`)
 * @param onProgress Callback triggered on upload
 * @returns the promise for the request
 */
function DeleteRequest(route: string,
  onProgress: (((ProgressEvent: AxiosProgressEvent) => void) | undefined) = undefined): Promise<AxiosResponse<any, any>> {
  if (onProgress) config.onUploadProgress = onProgress;
  return axios.delete(buildRoute(route), config);
}

/**
 * Use axios to make a PUT request to the API with the given route
 * @param route The route to use **without the API url** (eg : `api/ping`)
 * @param onProgress Callback triggered on upload
 * @returns the promise for the request
 */
function PutRequest(route: string, data: any,
  onProgress: (((ProgressEvent: AxiosProgressEvent) => void) | undefined) = undefined): Promise<AxiosResponse<any, any>> {
  if (onProgress) config.onUploadProgress = onProgress;
  return axios.put(buildRoute(route), data, config);
}

export { GetRequest, PostRequest, DeleteRequest, PutRequest };