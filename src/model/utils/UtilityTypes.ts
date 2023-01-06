//ObjectPaths and ObjectLeaves are based on this StackOverflow answer - https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object/58436959#58436959

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

export type ObjectPaths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, ObjectPaths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

export type ObjectLeaves<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, ObjectLeaves<T[K], Prev[D]>> }[keyof T]
  : "";

export type ObjectLeavesOrUnion<T, N extends number = 5> = T extends object
  ? ObjectLeaves<T, N>
  : T;
export type MayBe<T> = T | undefined | null;

/** Stricter version of omit to suggest omitted props. */
export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = OmitStrict<T, K> &
  Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = OmitStrict<T, K> &
  Required<Pick<T, K>>;

/**
 * Nested recursive partial.
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/** Union of all string keys of type T. (Numeric keys are filtered out) */
export type StringKeyOf<T extends object> = keyof T extends string
  ? keyof T
  : never;

export type KeysOf<T extends object> = (keyof T)[];

export type TreeOf<ItemType> = {
  children?: TreeOf<ItemType>[];
} & ItemType;

/**
 * Given object type it makes all properties non-nullable but keeps optional flags.
 */
type NoNulls<T extends object> = {
  [P in keyof T]: NonNullable<T[P]>;
};

/**
 * Given object type it makes all properties non-nullable and not optional (removes null and undefined).
 */
export type RequiredNoNulls<T extends object> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

/** Returns union of all optional keys of interface T. */
export type OptionalKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key in keyof T]-?: {} extends Pick<T, key> ? key : never;
}[keyof T];

export type NonOptionalKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key in keyof T]-?: {} extends Pick<T, key> ? never : key;
}[keyof T];

/** Returns true if T (T can be union of types) contains null. */
type ExtendsNull<T> = null extends T & null ? true : false;

/** Returns union of all keys of T which values (unions) do not contain null. */
type NonNullableKeys<T> = {
  [key in keyof T]-?: true extends ExtendsNull<T[key]> ? never : key;
}[keyof T];

/**
 * Makes optional non-nullable props required.
 * Will use this to wrap ApiService outputs.
 *
 * Given type
 * {
 *   name?: string | null,
 *   count?: number
 * }
 * returns
 * {
 *   name?: string|null,
 *   count: number
 * }
 */
export type OptionalNonNullableRequired<T extends object> = RequiredBy<
  T,
  NonNullableKeys<T>
>;

/**
 * Helper: Given a union type it returns
 * a tuple of the same length as the length of the union where each item in the tuple has the TupleItemType type.
 * Because of TS recursion limits it works for small unions only (up to 10 items)
 * */
type TupleOfSmallUnionItemsWithLengthOfUnion<
  Union,
  TupleItemType,
  C = Union
> = [Union] extends [never]
  ? []
  : C extends infer U
  ? [
      TupleItemType,
      ...TupleOfSmallUnionItemsWithLengthOfUnion<
        Exclude<Union, U>,
        TupleItemType
      >
    ]
  : [];

type NotStartsWith<T, S extends string> = T extends `${S}${string}` ? never : T;
type UnionStartingWith<U, S extends string> = Exclude<U, NotStartsWith<U, S>>;

// this is how we can reduce the size of unions for TupleOfSmallUnionItemsWithLengthOfUnion type
// not ideal, but works
type TupleOfUnionItemsWithLengthOfUnion<U> = [
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "a">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "b">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "c">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "d">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "e">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "f">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "g">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "h">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "i">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "j">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "k">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "l">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "m">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "n">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "o">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "p">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "q">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "r">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "s">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "t">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "u">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "v">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "w">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "x">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "y">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "z">, U>,
  ...TupleOfSmallUnionItemsWithLengthOfUnion<UnionStartingWith<U, "_">, U>
];

/**
 * Given an object type it returns a tuple type with length equal to count of object props and items being keys of object.
 * Used to type-check arrays listing props of object.
 *
 * Notice!: Items uniqueness is not checked. Only the length of the array and that items are keys of the object type.
 * However items are suggested by autocomplete.
 *
 * Example:
 * type SomePropsType = {
 *   id: string;
 *   name: string;
 *   description: string;
 * };
 *
 * const SomePropsTypeKeys: RequiredAllKeysOf<SomePropsType> = [
 *   "id", "name", "description",
 * ];
 *
 * Or - with Readonly<> if declared as const.
 *
 * const ReadonlySomePropsTypeKeys: RequiredReadonlyAllKeysOf<SomePropsType> = [
 *   "id", "name", "description",
 * ] as const;
 *
 */
export type RequiredAllKeysOf<T extends object> =
  TupleOfUnionItemsWithLengthOfUnion<keyof T>;
export type RequiredReadonlyAllKeysOf<T extends object> = Readonly<
  RequiredAllKeysOf<T>
>;
