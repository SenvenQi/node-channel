export interface Event<T> {
    (listener: (e: T) => any, thisArgs?: any, disposables?: IDisposable[]): IDisposable;
}

export interface IDisposable {
	dispose(): void;
}
