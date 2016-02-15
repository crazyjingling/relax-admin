import React from 'react';

import {Types} from '../../../data-types';

export default [
  {
    label: 'Action',
    type: Types.Select,
    id: 'action',
    props: {
      labels: ['Send e-mail', 'Schema entry', 'Custom endpoint'],
      values: ['email', 'schema', 'custom']
    },
    unlocks: {
      schema: [
        {
          label: 'Schema',
          type: Types.SelectEntry,
          id: 'schema',
          props: {
            // store: schemasStore
          }
        }
      ],
      custom: [
        {
          label: 'Custom url',
          type: Types.String,
          id: 'custom'
        }
      ]
    }
  },
  {
    label: false,
    id: 'linkDataButton',
    type: Types.Button,
    props: {
      label: (
        <div>
          <i className='material-icons'>radio_button_checked</i>
          <span>Link data</span>
        </div>
      ),
      action: 'linkFormData'
    }
  }
];
