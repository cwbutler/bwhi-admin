/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFacts = /* GraphQL */ `
  query GetFacts($id: ID!) {
    getFacts(id: $id) {
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
export const listFacts = /* GraphQL */ `
  query ListFacts(
    $filter: ModelFactsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncFacts = /* GraphQL */ `
  query SyncFacts(
    $filter: ModelFactsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFacts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getReminder = /* GraphQL */ `
  query GetReminder($id: ID!) {
    getReminder(id: $id) {
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
export const listReminders = /* GraphQL */ `
  query ListReminders(
    $filter: ModelReminderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReminders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncReminders = /* GraphQL */ `
  query SyncReminders(
    $filter: ModelReminderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReminders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getAlert = /* GraphQL */ `
  query GetAlert($id: ID!) {
    getAlert(id: $id) {
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
export const listAlerts = /* GraphQL */ `
  query ListAlerts(
    $filter: ModelAlertFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlerts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAlerts = /* GraphQL */ `
  query SyncAlerts(
    $filter: ModelAlertFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAlerts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getSchool = /* GraphQL */ `
  query GetSchool($id: ID!) {
    getSchool(id: $id) {
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
export const listSchools = /* GraphQL */ `
  query ListSchools(
    $filter: ModelSchoolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSchools = /* GraphQL */ `
  query SyncSchools(
    $filter: ModelSchoolFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSchools(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
