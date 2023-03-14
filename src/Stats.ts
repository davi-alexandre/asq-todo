interface ProgressionRecord {
  count?: number;
  hours?: number;
  isComplete?: true;
}

export default class ActivityRecord
extends Map<Date, ProgressionRecord> {}

export type { ProgressionRecord }