import React, { useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, FormControlLabel, Grid, Switch, Typography, Divider } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthResponse } from 'types';
import { useAuthorizedRequest } from 'hooks';
import { useAlertContext, useLoginContext } from 'providers';
import { FormTextfield } from 'components';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalizationSchema } from './personalizationSchema';

type PersonalizationFormDataValues = {
	address: string;
	fullName: string;
	gender: string;
	motherName: string;
	identification?: string;
	identificationType: 'NIP' | 'PESEL';
	isCompanyAccount: boolean;
};

const defaultValues: PersonalizationFormDataValues = {
	address: '',
	fullName: '',
	gender: '',
	motherName: '',
	identification: '',
	identificationType: 'PESEL',
	isCompanyAccount: false,
};

export const Personalization: React.FC = () => {
	const { userData } = useLoginContext();
	const { setMessage } = useAlertContext();
	const { postRequest, getRequest } = useAuthorizedRequest();
	const { handleSubmit, control, setValue, getValues, watch } = useForm<PersonalizationFormDataValues>({
		resolver: yupResolver(personalizationSchema),
		mode: 'all',
		defaultValues,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getRequest<PersonalizationFormDataValues[]>(`api/get-user-data/${userData?._id}`);
				console.log(res);
			} catch (err) {
				console.error('Error fetching user data:', err);
			}
		};
		fetchData();
	}, [getRequest, userData]);

	const onSubmit: SubmitHandler<PersonalizationFormDataValues> = async (data) => {
		try {
			await postRequest<AuthResponse>('api/edit-data', data);
			setMessage({ alertType: 'success', content: 'Edit done successfully!' });
		} catch {
			setMessage({ alertType: 'error', content: 'Something went wrong' });
		}
	};

	const handleSwitchChange = () => {
		const newType = getValues('identificationType') === 'PESEL' ? 'NIP' : 'PESEL';
		setValue('identificationType', newType);
		setValue('identification', '');
	};


	const fields: Array<keyof PersonalizationFormDataValues> = ['address', 'fullName', 'gender'];

	const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Card sx={{ padding: 2, mt: 2, mb: 2, maxWidth: 1000, width: '100%' }}>
				<Typography variant="h5" gutterBottom>Personalization</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Divider />
					<CardContent>
						<Grid container spacing={3}>
							{fields.map((field) => (
								<Grid key={field} item xs={12} sm={6}>
									<FormTextfield control={control} name={field} fullWidth id={field} label={capitalizeFirstLetter(field)} sx={{ mt: 1 }} />
								</Grid>
							))}
							<Grid item xs={12} sm={6}>
								<FormTextfield control={control} name="motherName" fullWidth id="motherName" label="Mother's Name" sx={{ mt: 1 }} />
								<FormControlLabel control={<Switch onChange={handleSwitchChange} />} label="Company" />
								<FormTextfield control={control} name="identification" fullWidth id="identification" label={watch('identificationType')} sx={{ mt: 1, mb: 1 }} />
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<CardActions sx={{ justifyContent: 'flex-end' }}>
						<Button type="submit" variant="contained" color="primary">Save Changes</Button>
					</CardActions>
				</form>
			</Card>
		</Box>
	);
};

