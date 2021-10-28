import { getModelToken } from '@nestjs/mongoose';
import { Professional } from '../professional.schema';

const professionalModel = (model: any) => {
  return {
    findOne: () => {
      return {
        populate: () => {
          return {
            _id: model._id,
            name: model.name,
            email: model.email,
          };
        },
      };
    },
    findAll: () => {
      return [
        {
          _id: model._id,
          name: model.name,
          parent: model.parent,
          header: model.header,
          body: model.body,
          footer: model.footer,
          isAvailable: model.isAvailable,
          isTemplate: model.isTemplate,
        },
      ];
    },
    create: () => {
      return {
        _id: model._id,
        name: model.name,
        email: model.email,
      };
    },
    update: () => {
      return {
        _id: model._id,
        name: model.name,
        email: model.email,
      };
    },
    deleteById: () => [],
    populate: () => {
      return {
        _id: model._id,
        name: model.name,
        email: model.email,
      };
    },
  };
};

export const ProfessionalModelProvider = (model: any) => {
  return {
    provide: getModelToken(Professional.name),
    useValue: professionalModel(model),
  };
};
