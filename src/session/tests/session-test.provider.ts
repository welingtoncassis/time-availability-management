import { getModelToken } from '@nestjs/mongoose';
import { Session } from '../session.schema';

const sessionModel = (model: any) => {
  return {
    findOne: () => {
      return {
        populate: () => {
          return {
            _id: model._id,
            professional: model.professional,
            days: model.days,
            start: model.start,
            end: model.end,
          };
        },
      };
    },
    findAll: () => {
      return [
        {
          _id: model._id,
          professional: model.professional,
          days: model.days,
          start: model.start,
          end: model.end,
        },
      ];
    },
    create: () => {
      return {
        _id: model._id,
        professional: model.professional,
        days: model.days,
        start: model.start,
        end: model.end,
      };
    },
    update: () => {
      return {
        _id: model._id,
        professional: model.professional,
        days: model.days,
        start: model.start,
        end: model.end,
      };
    },
    deleteById: () => [],
    populate: () => {
      return {
        _id: model._id,
        professional: model.professional,
        days: model.days,
        start: model.start,
        end: model.end,
      };
    },
  };
};

export const SessionModelProvider = (model: any) => {
  return {
    provide: getModelToken(Session.name),
    useValue: sessionModel(model),
  };
};
