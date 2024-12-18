// <T> estará se referindo aos agregados
export default interface RepositoryInterface<T> {
    craete(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>
};