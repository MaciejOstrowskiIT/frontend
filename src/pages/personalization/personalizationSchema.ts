import { boolean, object, string } from 'yup';

const PESELValidate = (pesel: string): boolean => {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  let controlNumber = parseInt(pesel.substring(10, 11));

  for (let i = 0; i < weights.length; i++) {
    sum += parseInt(pesel.substring(i, i + 1)) * weights[i];
  }
  sum = sum % 10;
  return (10 - sum) % 10 === controlNumber;
};

const ValidateNIP = (nip: string): boolean => {
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  nip = nip.replace(/[\s-]/g, '');

  if (nip.length === 10 && !isNaN(Number(nip))) {
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += Number(nip[i]) * weights[i];
    }

    return sum % 11 === Number(nip[9]);
  }

  return false;
};

export const personalizationSchema = object({
  address: string().required('Address is required'),
  fullName: string().required('Full Name is required'),
  gender: string().required('Gender is required'),
  motherName: string().required("Mother's Name is required"),
  identificationType: string().oneOf(['NIP', 'PESEL']).required(),
  identification: string().when('identificationType', {
    is: 'PESEL',
    then: () =>
      string()
        .required('PESEL is required')
        .test('is-valid-pesel', 'Invalid PESEL', (value) => !!value && PESELValidate(value)),
    otherwise: () =>
      string()
        .required('NIP is required')
        .test('is-valid-nip', 'Invalid NIP', (value) => !!value && ValidateNIP(value)),
  }),
  isCompanyAccount: boolean().required(),
});

// poczytaj sobie o condition validation w yupie
