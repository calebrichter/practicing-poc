// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields'

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document'
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types'

export const lists = {

  User: list({

    access: allowAll,


    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      // we can use this field to see what Posts this User has authored
      //   more on that in the Post list below
      sermons: relationship({ ref: 'Sermon.speaker', many: true }),
      church: relationship({ ref: 'Church', many: false }),
      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Church: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      city: text({ validation: { isRequired: true } }),
      state: text({ validation: { isRequired: true } }),
      sermons: relationship({ ref: 'Sermon.church', many: true }),
      website: text({ validation: { isRequired: false },}),
    },
  }),

  Sermon: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      date: timestamp({ validation: { isRequired: true } }),
      church: relationship({ ref: 'Church.sermons', many: false }),
      speaker: relationship({ ref: 'User.sermons', many: false }),
      transcript: document(
        {
          formatting: true,
          links: true,
        },
      ),
      outline: document(
        {
          formatting: true,
          links: true,
        },
      ),
      summary: text(),
      link: text(),
    },
  }),
} satisfies Lists
