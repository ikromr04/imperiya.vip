import { ID } from '@/types';
import { ScheduleId } from '@/types/schedules';
import { UserId } from '@/types/users';

export type EvaluationsStoreDTO = {
  value: string;
  user_id: UserId;
  schedule_id: ScheduleId;
};

export type EvaluationsUpdateDTO = {
  id: ID;
  value: string;
};
