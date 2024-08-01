import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const employeesSchema = z.object({
  temp_id: z.number(),
  firstname: z.string(),
  recruited_for: z.string(),
  employment_type: z.string(),
  unit: z.string(),
  contact_no: z.string(),
})

export type EmployeesType = z.infer<typeof employeesSchema>
