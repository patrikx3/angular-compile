export interface StateInterface {
    NotFound: boolean,
    RequestPath: string,
}

let State: StateInterface = {
    NotFound: false,
    RequestPath: location.pathname + location.search + location.hash
}

export {State};
