import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type FactsMetaData = {
  readOnlyFields: 'updatedAt';
}

type ReminderMetaData = {
  readOnlyFields: 'updatedAt';
}

type AlertMetaData = {
  readOnlyFields;
}

type SchoolMetaData = {
  readOnlyFields;
}

export declare class Facts {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly modifiedAt?: string | null;
  readonly createdBy?: string | null;
  readonly modifiedBy?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Facts, FactsMetaData>);
  static copyOf(source: Facts, mutator: (draft: MutableModel<Facts, FactsMetaData>) => MutableModel<Facts, FactsMetaData> | void): Facts;
}

export declare class Reminder {
  readonly id: string;
  readonly cognito_id?: string | null;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly modifiedAt?: string | null;
  readonly createdBy?: string | null;
  readonly modifiedBy?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Reminder, ReminderMetaData>);
  static copyOf(source: Reminder, mutator: (draft: MutableModel<Reminder, ReminderMetaData>) => MutableModel<Reminder, ReminderMetaData> | void): Reminder;
}

export declare class Alert {
  readonly id: string;
  readonly datetime?: string | null;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly createdBy?: string | null;
  readonly modifiedBy?: string | null;
  constructor(init: ModelInit<Alert>);
  static copyOf(source: Alert, mutator: (draft: MutableModel<Alert>) => MutableModel<Alert> | void): Alert;
}

export declare class School {
  readonly id: string;
  readonly school_name?: string | null;
  readonly health_name?: string | null;
  readonly health_address?: string | null;
  readonly health_hours?: string | null;
  readonly health_phone?: string | null;
  readonly health_website?: string | null;
  readonly health_sexual_services?: (string | null)[] | null;
  readonly health_physical_services?: (string | null)[] | null;
  readonly counseling_name?: string | null;
  readonly counseling_location?: string | null;
  readonly counseling_url?: string | null;
  readonly counseling_hours?: string | null;
  readonly counseling_phone?: string | null;
  readonly counseling_crisis_phone?: string | null;
  readonly counseling_crisis_text?: string | null;
  readonly counseling_website?: string | null;
  readonly counseling_services?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly createdBy?: string | null;
  readonly modifiedBy?: string | null;
  readonly school_address?: string | null;
  constructor(init: ModelInit<School>);
  static copyOf(source: School, mutator: (draft: MutableModel<School>) => MutableModel<School> | void): School;
}