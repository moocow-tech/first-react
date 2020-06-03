// eslint-disable-next-line
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUnshownAppointmentsActionCreator, AppState } from './Store';
import { Backimage } from './Backimage';
import { PrimaryButton } from './Styles';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
/**@jsx jsx*/
import { css, jsx } from '@emotion/core';
import { AppointmentList } from './AppointmentList';
import { AppointmentData } from './AppointmentData';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  getUnshownAppointments: () => Promise<void>;
  appointments: AppointmentData[] | null;
  appointmentsLoading: boolean;
}

const mapStateToProps = (store: AppState) => {
  return {
    appointments: store.appointments.unshown,
    appointmentsLoading: store.appointments.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnshownAppointments: () =>
      dispatch(getUnshownAppointmentsActionCreator()),
  };
};

const HomePage: FC<Props> = ({
  history,
  appointments,
  appointmentsLoading,
  getUnshownAppointments,
}) => {
  useEffect(() => {
    if (appointments === null) {
      getUnshownAppointments();
    }
  }, [appointments, getUnshownAppointments]);
  const handleAddAppointmentClick = () => {
    history.push('/add');
  };
  return (
    <div>
      <Backimage />
      <Page>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <PageTitle>Current Appointments</PageTitle>
          <PrimaryButton onClick={handleAddAppointmentClick}>
            Set an Appointment
          </PrimaryButton>
        </div>
        {appointmentsLoading ? (
          <div
            css={css`
              font-size: 16px;
              font-style: italic;
            `}
          >
            Loading...
          </div>
        ) : (
          <AppointmentList data={appointments || []} />
        )}
      </Page>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
