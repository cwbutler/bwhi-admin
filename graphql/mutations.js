/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFacts = /* GraphQL */ `
  mutation CreateFacts(
    $input: CreateFactsInput!
    $condition: ModelFactsConditionInput
  ) {
    createFacts(input: $input, condition: $condition) {
      id
      title
      description
      image
      createdAt
      modifiedAt
      createdBy
      modifiedBy
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateFacts = /* GraphQL */ `
  mutation UpdateFacts(
    $input: UpdateFactsInput!
    $condition: ModelFactsConditionInput
  ) {
    updateFacts(input: $input, condition: $condition) {
      id
      title
      description
      image
      createdAt
      modifiedAt
      createdBy
      modifiedBy
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteFacts = /* GraphQL */ `
  mutation DeleteFacts(
    $input: DeleteFactsInput!
    $condition: ModelFactsConditionInput
  ) {
    deleteFacts(input: $input, condition: $condition) {
      id
      title
      description
      image
      createdAt
      modifiedAt
      createdBy
      modifiedBy
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createReminder = /* GraphQL */ `
  mutation CreateReminder(
    $input: CreateReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    createReminder(input: $input, condition: $condition) {
      id
      cognito_id
      title
      description
      createdAt
      modifiedAt
      createdBy
      modifiedBy
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateReminder = /* GraphQL */ `
  mutation UpdateReminder(
    $input: UpdateReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    updateReminder(input: $input, condition: $condition) {
      id
      cognito_id
      title
      description
      createdAt
      modifiedAt
      createdBy
      modifiedBy
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteReminder = /* GraphQL */ `
  mutation DeleteReminder(
    $input: DeleteReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    deleteReminder(input: $input, condition: $condition) {
      id
      cognito_id
      title
      description
      createdAt
      modifiedAt
      createdBy
      modifiedBy
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createAlert = /* GraphQL */ `
  mutation CreateAlert(
    $input: CreateAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    createAlert(input: $input, condition: $condition) {
      id
      datetime
      title
      description
      image
      createdAt
      updatedAt
      createdBy
      modifiedBy
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateAlert = /* GraphQL */ `
  mutation UpdateAlert(
    $input: UpdateAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    updateAlert(input: $input, condition: $condition) {
      id
      datetime
      title
      description
      image
      createdAt
      updatedAt
      createdBy
      modifiedBy
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteAlert = /* GraphQL */ `
  mutation DeleteAlert(
    $input: DeleteAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    deleteAlert(input: $input, condition: $condition) {
      id
      datetime
      title
      description
      image
      createdAt
      updatedAt
      createdBy
      modifiedBy
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSchool = /* GraphQL */ `
  mutation CreateSchool(
    $input: CreateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    createSchool(input: $input, condition: $condition) {
      id
      school_name
      health_name
      health_address
      health_hours
      health_phone
      health_website
      health_sexual_services
      health_physical_services
      counseling_name
      counseling_location
      counseling_url
      counseling_hours
      counseling_phone
      counseling_crisis_phone
      counseling_crisis_text
      counseling_website
      counseling_services
      createdAt
      updatedAt
      createdBy
      modifiedBy
      school_address
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSchool = /* GraphQL */ `
  mutation UpdateSchool(
    $input: UpdateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    updateSchool(input: $input, condition: $condition) {
      id
      school_name
      health_name
      health_address
      health_hours
      health_phone
      health_website
      health_sexual_services
      health_physical_services
      counseling_name
      counseling_location
      counseling_url
      counseling_hours
      counseling_phone
      counseling_crisis_phone
      counseling_crisis_text
      counseling_website
      counseling_services
      createdAt
      updatedAt
      createdBy
      modifiedBy
      school_address
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSchool = /* GraphQL */ `
  mutation DeleteSchool(
    $input: DeleteSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    deleteSchool(input: $input, condition: $condition) {
      id
      school_name
      health_name
      health_address
      health_hours
      health_phone
      health_website
      health_sexual_services
      health_physical_services
      counseling_name
      counseling_location
      counseling_url
      counseling_hours
      counseling_phone
      counseling_crisis_phone
      counseling_crisis_text
      counseling_website
      counseling_services
      createdAt
      updatedAt
      createdBy
      modifiedBy
      school_address
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
