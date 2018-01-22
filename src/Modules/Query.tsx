import { GraphQLEnumType, GraphQLScalarType, Kind } from 'graphql';

export * from '../Server/Query';

import * as GraphQL from './Query';
import * as Error from './Error';
import * as Validator from './Validator';

export let orderEnum = new GraphQLEnumType({
  name: 'OrderEnum',
  values: {
    desc: { value: 'DESC' },
    asc: { value: 'ASC' },
  }
});

export const uploadType = new GraphQLScalarType({
  name: 'Upload',
  serialize: value => {
    return value;
  },
  parseValue: value => {
    return value;
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new Error.UnexpectedInput('Upload can only parse strings got a: ' + ast.kind);
    }

  let errors = Validator.stringValidator(ast.value, {
    min: 3,
    max: 100,
    nullable: true
  });

  if (errors.length) {
    throw new Error.ValidationError(errors.map(i => ({
      key: 'Upload',
      message: i
    })));
  }

    return ast.value;
  }
});

export const colorType = new GraphQLScalarType({
  name: 'Color',
  serialize: value => {
    return value;
  },
  parseValue: value => {
    return value;
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new Error.UnexpectedInput('Color can only parse strings got a: ' + ast.kind);
    }

  let errors = Validator.colorValidator(ast.value, {
    nullable: true
  });

  if (errors.length) {
    throw new Error.ValidationError(errors.map(i => ({
      key: 'Color',
      message: i
    })));
  }

    return ast.value;
  }
});

export const dateType = new GraphQLScalarType({
  name: 'Date',

  serialize: (value: Date) => value.toUTCString(),

  parseValue: value => {
    return Date.parse(value);
  },

  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new Error.UnexpectedInput('Date can only parse strings got a: ' + ast.kind);
    }

    let errors = Validator.dateValidator(ast.value, {
      nullable: true
    });

    if (errors.length) {
      throw new Error.ValidationError(errors.map(i => ({
        key: 'Date',
        message: i
      })));
    }

    return ast.value;
  }
});