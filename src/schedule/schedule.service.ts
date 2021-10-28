import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../common/services/base.service';
import { ScheduleDocument, Schedule } from './schedule.schema';
import * as moment from 'moment';
import { SessionService } from '../session/session.service';
import { AvailableTimesDTO } from './dtos/available-times.dto';
import { CreateScheduleDTO } from './dtos/create-schedule.dto';
import { UpdateScheduleDTO } from './dtos/update-schedule.dto';

const DURATION_SESSION = 60;
const DURATION_SLOT = 30;
const SLOTS_SESSION = 2;
@Injectable()
export class ScheduleService extends BaseService<ScheduleDocument> {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
    private sessionService: SessionService,
  ) {
    super(scheduleModel);
  }

  public async verifySchedule(
    scheduleDTO: CreateScheduleDTO | UpdateScheduleDTO,
  ) {
    const scheduleDay = moment(scheduleDTO.date);

    const schedules = await this.findAll({
      filter: {
        professional: scheduleDTO.professional,
        date: {
          $gte: moment(scheduleDay).startOf('day'),
          $lte: moment(scheduleDay).endOf('day'),
        },
      },
    });

    const busyTimes = this.getBusyTimes(
      schedules,
      DURATION_SESSION,
      DURATION_SLOT,
    );

    if (busyTimes.includes(scheduleDay.format('HH:mm'))) {
      throw new ConflictException('Horário indisponível');
    }

    return;
  }

  public async availableTimes(availableTimesDTO: AvailableTimesDTO) {
    const agenda = [];
    const initDay = moment(availableTimesDTO.initDate);
    const endDay = moment(availableTimesDTO.endDate);
    const diff = endDay.diff(initDay, 'days');

    const sessionsProfessional = await this.sessionService.findAll({
      filter: { professional: availableTimesDTO.idProfessional },
    });

    let currentDay = initDay;

    for (let index = 0; index <= diff; index++) {
      const sessionsValid = sessionsProfessional.filter((session) => {
        const dayWeekAvailable = session.days.includes(
          moment(currentDay).day(),
        );
        return dayWeekAvailable;
      });

      if (sessionsValid.length > 0) {
        let allTimesOfDay = [];

        for (const session of sessionsValid) {
          allTimesOfDay = [
            ...this.sliceMinutes(
              this.mergeDateTime(currentDay, session.start),
              this.mergeDateTime(currentDay, session.end),
              DURATION_SLOT,
            ),
          ];
        }

        const schedules = await this.findAll({
          filter: {
            professional: availableTimesDTO.idProfessional,
            date: {
              $gte: moment(currentDay).startOf('day'),
              $lte: moment(currentDay).endOf('day'),
            },
          },
        });

        const busyTimes = this.getBusyTimes(
          schedules,
          DURATION_SESSION,
          DURATION_SLOT,
        );

        const freeHours = this.splitByValue(
          allTimesOfDay.map((freeTime) => {
            return busyTimes.includes(freeTime) ? '-' : freeTime;
          }),
          '-',
        )
          .filter((space) => space.length > 0)
          .filter((hour) => hour.length >= SLOTS_SESSION);

        agenda.push({
          [currentDay.format('YYYY-MM-DD')]: freeHours,
        });
      }

      currentDay = moment(currentDay).add(1, 'day');
    }

    return agenda;
  }

  private getBusyTimes(
    schedules: ScheduleDocument[],
    durationSession: number,
    durationSlot: number,
  ) {
    const busyTimes = schedules
      .map((schedule) => ({
        start: moment(schedule.date),
        end: moment(schedule.date).add(durationSession, 'minutes'),
      }))
      .map((hour) => this.sliceMinutes(hour.start, hour.end, durationSlot))
      .flat();

    return busyTimes;
  }

  private sliceMinutes(start, end, duration, validation = true) {
    const slices = [];

    const now = moment();
    start = moment(start);
    end = moment(end);

    while (end > start) {
      if (
        start.format('YYYY-MM-DD') === now.format('YYYY-MM-DD') &&
        validation
      ) {
        if (start.isAfter(now)) {
          slices.push(start.format('HH:mm'));
        }
      } else {
        slices.push(start.format('HH:mm'));
      }

      start = start.add(duration, 'minutes');
    }
    return slices;
  }

  private mergeDateTime(date, time) {
    const merged = `${moment(date).format('YYYY-MM-DD')}T${moment(time).format(
      'HH:mm',
    )}`;
    return merged;
  }

  private splitByValue(array: Array<any>, value) {
    const newArray = [[]];
    array.forEach((item) => {
      if (item !== value) {
        newArray[newArray.length - 1].push(item);
      } else {
        newArray.push([]);
      }
    });
    return newArray;
  }
}
