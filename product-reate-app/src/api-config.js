let backendHost;

const hostname = window && window.location && window.location.hostname;

//http://loaclhost:10000
//hostname -> localhost
if(hostname == "localhost"){
    backendHost = "http://localhost:30000";
}

export const API_BASE_URL = `${backendHost}`




