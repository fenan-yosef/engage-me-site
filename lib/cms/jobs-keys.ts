export const JOBS_KEYS = {
  heroImage: "jobs.hero.image",
  applyButtonLabel: "jobs.apply.button_label",

  jobTitle: (i: number) => `jobs.list.${i}.title`,
  jobColor: (i: number) => `jobs.list.${i}.color`,
  fieldLabel: (jobIdx: number, fieldIdx: number) => `jobs.list.${jobIdx}.fields.${fieldIdx}.label`,
  fieldValue: (jobIdx: number, fieldIdx: number) => `jobs.list.${jobIdx}.fields.${fieldIdx}.value`,
} as const

