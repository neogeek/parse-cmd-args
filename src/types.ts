export interface Options {
    requireUserInput?: boolean;
}

export type Flags = {
    [key in string]: string | boolean;
};

export type RawFlags = [string, string | boolean][];
