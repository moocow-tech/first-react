import React, { FC, useEffect } from 'react';
import { Page } from './Page';
import { Form, required, minLength, Values, SubmitResult } from './Form';
import { Field } from './Field';
import { PostAppointmentData, AppointmentData } from './AppointmentData';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  postAppointmentActionCreator,
  AppState,
  clearPostedAppointmentActionCreator,
} from './Store';
import { AnyAction } from 'redux';

interface Props {
  postAppointment: (appointment: PostAppointmentData) => Promise<void>;
  postedAppointmentResult?: AppointmentData;
  clearPostedAppointment: () => void;
}
const AddAppointmentPage: FC<Props> = ({
  postAppointment,
  postedAppointmentResult,
  clearPostedAppointment,
}) => {
  useEffect(() => {
    return function cleanUp() {
      clearPostedAppointment();
    };
  }, [clearPostedAppointment]);
  const handleSubmit = (values: Values) => {
    postAppointment({
      studentId: values.studentId,
      stuName: values.stuName,
      email: values.email,
      courseId: values.courseId,
      description: values.description,
      start: values.start,
    });
  };
  let submitResult: SubmitResult | undefined;
  if (postedAppointmentResult) {
    submitResult = { success: postedAppointmentResult !== undefined };
  }
  return (
    <Page title="Add an Appointment">
      <Form
        submitCaption="Add an Appointment"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        submitResult={submitResult}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
      >
        <Field name="studentId" label="Student ID" type="Text" />
        <Field name="stuName" label="Student Name" type="Text" />
        <Field name="email" label="Email" type="Text" />
        <Field name="courseId" label="Course ID" type="Text" />
        <Field name="start" label="Appointment Time/Date" />
        <Field name="description" label="Area(s) of Concern" type="TextArea" />
      </Form>
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    postedAppointmentResult: store.appointments.postedResult,
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postAppointment: (appointment: PostAppointmentData) =>
      dispatch(postAppointmentActionCreator(appointment)),
    clearPostedAppointment: () =>
      dispatch(clearPostedAppointmentActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAppointmentPage);
