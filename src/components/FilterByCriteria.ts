
export type FilterByOperator = "=" | "!=" | ">" | ">=" | "<" | "<=" | "like" | "between" | "startsWith" | "endsWith" | "in";

export interface FilterSortAttribute {
  order: 'asc' | 'desc'
  active: boolean
}

export interface FilterColumnAttribute {
  visible: boolean
}

export interface FilterAttribute {
  match?: {
    operator: FilterByOperator
    value?: any
  }
  sort?: FilterSortAttribute
  columnControl?: FilterColumnAttribute
  associate?: {
    modelName: string
    fieldName: string
  }
}

export type FilterAttributes<T> = {[K in keyof T]: FilterAttribute}

export function buildFilterByCriteria<T>(filters: FilterAttributes<T>, offset?: number, limit?: number): string {
  let criteria = ''
  const associate = new Set()
  const filterBy = []
  const sortBy = []
  for (let key of Object.keys(filters)) {
    const attr = filters[key as keyof T]

    const sort = attr.sort;
    if (sort) {
      if (sort.active) {
        sortBy.push(`${key} ${sort.order}`)
      }
    }

    // resolve match

    if (!attr.match) {
      continue;
      // throw new Error(`match of ${key} is needed`);
    }

    let fieldName = key

    // resolve associate
    if (attr.associate) {
      associate.add(attr.associate.modelName)
      fieldName = `${attr.associate.modelName}.${attr.associate.fieldName}`
    }

    const operator = attr.match.operator;
    let value = attr.match.value;
    if (typeof(value) === 'object') {
      if (operator !== 'between') {
        throw new Error("array value only support between operator")
      }

      if (!value[0]() && !value[1]()) {
        continue;
      }
      filterBy.push(`${fieldName} ${operator} ${`[${wrapValue(value[0]())},${wrapValue(value[1]())}]`}`)
    } else {
      const v = value();
      if (v && v !== 'none') {
        filterBy.push(`${fieldName} ${operator} ${wrapValue(v)}`)
      }
    }
  }

  if (associate.size > 0) {
    criteria += `associate ${Array.from(associate).join(',')} `
  }

  criteria += `filter by (${filterBy.join(' and ')})`
  if (sortBy.length > 0) {
    criteria += ` sort by ${sortBy.join(', ')}`
  }

  if (offset != undefined) {
    criteria += ` offset ${offset}`
  }
  if (limit != undefined) {
    criteria += ` limit ${limit}`
  }
  return encodeURIComponent(criteria)
}

function wrapValue(v: any) {
  if (v === undefined) {
    return ''
  }
  switch (typeof(v)) {
    case "string":
      return '"' + v + '"';
    case "number":
    case "bigint":
    case "boolean":
      return v;
    case "symbol":
    case "undefined":
    case "object":
    case "function":
      throw new Error(`unsupported type: ${v}`)
  }
}