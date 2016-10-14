import * as NeDBDataStore from "NeDB";

export class AsyncNeDBDataStore extends NeDBDataStore {
    /**
     * コンストラクタ1
     */
    constructor();
    constructor(path: string);
    constructor(options: any);
    constructor(args?: any) {
        super(args);
    }

    // 後で、戻り値を考え直す

    public loadDatabaseAsync(): Promise<void> {
        return new Promise((resolve, reject) => super.loadDatabase((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }));
    }

    public ensureIndexAsync(options: Object): Promise<void> {
        return new Promise((resolve, reject) => super.ensureIndex(<any>options, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }));
    }

    public removeIndexAsync(fieldName: string): Promise<void> {
        return new Promise((resolve, reject) => super.removeIndex(fieldName, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }));
    }

    public insertAsync<T>(newDoc: T): Promise<T> {
        return new Promise((resolve, reject) => super.insert(newDoc, (err, document) => {
            if (err) {
                reject(err);
            } else {
                resolve(document);
            }
        }));
    }

    public countAsync(query: any): Promise<number> {
        return new Promise((resolve, reject) => super.count(query, (err, n) => {
            if (err) {
                reject(err);
            } else {
                resolve(n);
            }
        }));
    }

    public findAsync<T>(query: any): Promise<Array<T>>;
    public findAsync<T>(query: any, projection: T): Promise<Array<T>>;
    public findAsync<T>(query: any, projection?: T): Promise<Array<T>> {
        if (projection) {
            return new Promise((resolve, reject) => super.find(query, projection, (err, documents) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(documents);
                }
            }));
        } else {
            return new Promise((resolve, reject) => super.find(query, (err, documents) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(documents);
                }
            }));
        }
    }


    public findOneAsync<T>(query: any): Promise<T>;
    public findOneAsync<T>(query: any, projection: T): Promise<T>;
    public findOneAsync<T>(query: any, projection?: T): Promise<T> {
        if (projection) {
            return new Promise((resolve, reject) => super.findOne(query, projection, (err, document) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(document);
                }
            }));
        } else {
            return new Promise((resolve, reject) => super.findOne(query, (err, document) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(document);
                }
            }));
        }
    }


    public updateAsync<T>(query: any, updateQuery: any, options: any): Promise<{ numberOfUpdated: number, affectedDocuments: any, upsert: boolean }> {
        return new Promise((resolve, reject) => super.update(query, updateQuery, options, (err, numberOfUpdated, affectedDocuments, upsert) => {
            if (err) {
                reject(err);
            } else {
                resolve({ numberOfUpdated, affectedDocuments, upsert });
            }
        }));
    }

    public removeAsync<T>(query: any): Promise<number>;
    public removeAsync<T>(query: any, options: any): Promise<number>;
    public removeAsync<T>(query: any, options?: any): Promise<number> {
        if (options) {
            return new Promise((resolve, reject) => super.remove(query, options, (err, n) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(n);
                }
            }));
        } else {
            return new Promise((resolve, reject) => super.remove(query, (err, n) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(n);
                }
            }));
        }
    }
}