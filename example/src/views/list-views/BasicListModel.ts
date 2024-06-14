import { FilterAttributes } from "../../../../src"

export interface IModel {
  id?: string
  name?: string
  job?: string
  company?: string
  location?: string
  lastLogin?: string
  favoriteColor?: string
}

export const model = <FilterAttributes<IModel>>{
  id: {
    match: {
      operator: "=",
    },
    sort: {
      order: "asc",
      active: true
    },
    columnControl: {
      visible: true
    }
  },
  name: {},
  job: {
    match: {
      operator: "like",
    },
    sort: {
      order: "asc",
      active: true
    },
    columnControl: {
      visible: true
    },
    associate: {
      modelName: "externalView",
      fieldName: "externalView.fieldName"
    }
  },
  company: {
    sort: {
      order: "asc",
      active: true
    },
    columnControl: {
      visible: true
    },
  },
  location: {
    sort: {
      order: "asc",
      active: true
    },
    columnControl: {
      visible: true
    },
  },
  lastLogin: {
    sort: {
      order: "asc",
      active: true
    },
    columnControl: {
      visible: true
    },
  },
  favoriteColor: {
    sort: {
      order: "asc",
      active: true
    },
    columnControl: {
      visible: true
    },
  }
}