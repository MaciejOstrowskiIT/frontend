import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, string } from 'yup';
import * as yup from 'yup';

// const peselOrNipRegex = /^(?:[0-9]{11}|[0-9]{10})$/;

export const personalizationSchema = object({
  address: string().required('Address is required'),
  fullName: string().required('Full Name is required'),
  gender: string().required('Gender is required'),
  motherName: string().required("Mother's Name is required"),
  identificationType: string().oneOf(['NIP', 'PESEL']).required(),
  identification: string().when('identificationType', {
    is: 'PESEL',
    then: string().required('pesel is required'),
    otherwise: string().required('nip is required'),
  }),
  //   identification: string().when('identificationType', {
  //     is: 'PESEL',
  //     then: (schema) => {
  //       return schema.required('Pesel is required');
  //     },
  //     otherwise: (schema) => {
  //       return schema.required('NIP is required');
  //     },
  //   }),
  isCompanyAccount: boolean().required(),
});

// poczytaj sobie o condition validation w yupie
