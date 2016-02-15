import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import schemaEntryInputType from '../../types/schema-entry-input';
import schemaEntryType from '../../types/schema-entry';
import RevisionModel from '../../../models/revision';
import SchemaEntryModel from '../../../models/schema-entry';

const parsableFields = ['data', 'properties'];

export default {
  type: schemaEntryType,
  args: {
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(schemaEntryInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const Model = await SchemaEntryModel(params.schemaId);
    const schemaEntry = await Model.findById(params.data._id);

    const revision = new RevisionModel({
      _id: {
        _id: schemaEntry._id,
        __v: schemaEntry.__v
      },
      date: schemaEntry.updatedDate,
      user: schemaEntry.updatedBy,
      doc: schemaEntry
    });

    await revision.save();

    const schemaEntryChanges = parseFields(Object.assign({}, params.data, {
      __v: schemaEntry.__v + 1,
      updatedDate: new Date()
    }), parsableFields);

    const resultSchemaEntry = await Model.findByIdAndUpdate(
      params.data._id,
      schemaEntryChanges,
      {upsert: true, new: true}
    ).select(projection).exec();

    if (!resultSchemaEntry) {
      throw new Error('Error updating schemaEntry');
    }
    return resultSchemaEntry;
  }
};
