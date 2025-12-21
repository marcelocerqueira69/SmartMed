export interface Medication {
  id: number
  name: string
  category: string
  quantity: number
  timesPerDay: number
  userCreated: string
  dateCreated: string
  userUpdated: string | null
  dateUpdated: string | null
}

