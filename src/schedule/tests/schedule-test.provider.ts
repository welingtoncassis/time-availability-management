import { getModelToken } from '@nestjs/mongoose';
import { Schedule } from '../schedule.schema';

const scheduleModel = (model: any) => {
  return {
    findOne: () => {
      return {
        populate: () => {
          return {
            _id: model._id,
            professional: model.professional,
            customer: model.customer,
            date: model.date,
          };
        },
      };
    },
    findAll: () => {
      return [
        {
          _id: model._id,
          professional: model.professional,
          customer: model.customer,
          date: model.date,
        },
      ];
    },
    create: () => {
      return {
        _id: model._id,
        professional: model.professional,
        customer: model.customer,
        date: model.date,
      };
    },
    update: () => {
      return {
        _id: model._id,
        professional: model.professional,
        customer: model.customer,
        date: model.date,
      };
    },
    deleteById: () => [],
    populate: () => {
      return {
        _id: model._id,
        professional: model.professional,
        customer: model.customer,
        date: model.date,
      };
    },
  };
};

export const ScheduleModelProvider = (model: any) => {
  return {
    provide: getModelToken(Schedule.name),
    useValue: scheduleModel(model),
  };
};
