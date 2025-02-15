export interface CreateAppointmentRequest {
  serviceType: 'strzyzenie' | 'paznokcie';
  appointmentStart: string;
  appointmentEnd: string;
  notes: string;
}

export interface CreateAppointmentResponse {
  id: string;
  serviceType: 'strzyzenie' | 'paznokcie';
  appointmentStart: string;
  appointmentEnd: string;
  notes: string;
  createdAt: string;
  status: 'scheduled' | 'ended';
}

export interface UpdateAppointmentRequest {}

export interface UpdateAppointmentResponse {}

export interface AvailableAppointmentsRequest {
  appointmentDate: string;
  employeeId: string;
}

export type AvailableAppointmentsResponse = string[];
