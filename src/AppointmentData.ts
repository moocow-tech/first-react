const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export interface AppointmentData {
  appointmentId: number;
  studentId: number;
  stuName: string;
  email: string;
  courseId: string;
  description: string;
  start: Date;
  finish: Date;
  shown: number;
}

export interface PostAppointmentData {
  studentId: number;
  stuName: string;
  email: string;
  courseId: string;
  description: string;
  start: Date;
}

//set appointment start and finish
const startAppt = new Date();
const endAppt = new Date(startAppt);
endAppt.setHours(endAppt.getHours() + 1);

const appointments: AppointmentData[] = [
  {
    appointmentId: 15,
    studentId: 900556112,
    stuName: 'John Williams',
    email: 'jwilliams56@bristolcc.edu',
    courseId: 'CIS122',
    description: 'trouble with javascript',
    start: startAppt,
    finish: endAppt,
    shown: 0,
  },
  {
    appointmentId: 16,
    studentId: 900154871,
    stuName: 'Jimmy Neutron',
    email: 'jneutron22@bristolcc.edu',
    courseId: 'CIS120',
    description: 'trouble with visual basic',
    start: startAppt,
    finish: endAppt,
    shown: 0,
  },
  {
    appointmentId: 17,
    studentId: 900476584,
    stuName: 'Ilda Schnalick',
    email: 'ischnalick32@bristolcc.edu',
    courseId: 'CIS156',
    description:
      'i was curious whether or not you could help me work through assignment 6 for week 5',
    start: startAppt,
    finish: endAppt,
    shown: 1,
  },
];

export const postAppointment = async (
  appt: PostAppointmentData,
): Promise<AppointmentData | undefined> => {
  await wait(500);
  const appointmentId =
    Math.max(...appointments.map((a) => a.appointmentId)) + 1;
  const finish = new Date(appt.start);
  finish.setHours(endAppt.getHours() + 1);
  const shown = 0;
  const newAppointment: AppointmentData = {
    appointmentId,
    ...appt,
    finish,
    shown,
  };
  appointments.push(newAppointment);
  return newAppointment;
};

export const getUnshownAppointments = async (): Promise<AppointmentData[]> => {
  await wait(500);
  return appointments.filter((a) => a.shown === 0);
};
