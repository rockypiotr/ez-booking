export interface Client{
    clientId: string
    createdAt: Date
    updatedAt: Date
    businessId: string
    name: string
    phoneNumber: string
}

export type ClientAddRequest = Pick<
  Client,
  'businessId' | 'name' | 'phoneNumber'
>;

export type ClientAddForm = Omit<ClientAddRequest, 'businessId'>;