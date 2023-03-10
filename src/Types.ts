// not used, just to see different impl of ObjectLeaves and Paths
type Primitive = string | number | symbol;

type GenericObject = Record<Primitive, unknown>;

type Join<
  L extends Primitive | undefined,
  R extends Primitive | undefined
> = L extends string | number
  ? R extends string | number
    ? `${L}.${R}`
    : L
  : R extends string | number
  ? R
  : undefined;

type Union<
  L extends unknown | undefined,
  R extends unknown | undefined
> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R;

/**
 * NestedPaths
 * Get all the possible paths of an object
 * @example
 * type Keys = NestedPaths<{ a: { b: { c: string } }>
 * // 'a' | 'a.b' | 'a.b.c'
 */
export type ObjectPaths<
  T extends GenericObject,
  Prev extends Primitive | undefined = undefined,
  Path extends Primitive | undefined = undefined
> = {
  [K in keyof T]: T[K] extends GenericObject
    ? ObjectPaths<T[K], Union<Prev, Path>, Join<Path, K>>
    : // : Join<Path, K>;
      Union<Union<Prev, Path>, Join<Path, K>>;
}[keyof T];

export type ObjectLeaves<
  T extends GenericObject,
  Prev extends Primitive | undefined = undefined,
  Path extends Primitive | undefined = undefined
> = {
  [K in keyof T]: T[K] extends GenericObject
    ? ObjectLeaves<T[K], Union<Prev, Path>, Join<Path, K>>
    : Join<Path, K>;
}[keyof T];
