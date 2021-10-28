import { getModelToken } from '@nestjs/mongoose';
import { Customer } from '../customer.schema';

const customerModel = (model: any) => {
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
          email: model.email,
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

export const CustomerModelProvider = (model: any) => {
  return {
    provide: getModelToken(Customer.name),
    useValue: customerModel(model),
  };
};
