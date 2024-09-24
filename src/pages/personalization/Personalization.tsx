import React, { useEffect, useState } from 'react';
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
	identification: string;
	identificationType: 'NIP' | 'PESEL';
	isCompanyAccount: boolean
}

export const Personalization: React.FC = () => {
	const { userData } = useLoginContext();
	const { setMessage } = useAlertContext();
	const { postRequest, getRequest } = useAuthorizedRequest();
	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		watch
	} = useForm<PersonalizationFormDataValues>({
		resolver: yupResolver(personalizationSchema),
		mode: 'all',
		defaultValues: {
			address: '',
			fullName: '',
			gender: '',
			motherName: '',
			identification: '',
			identificationType: 'PESEL',
			isCompanyAccount: false,
		},
	});


	const fetchDataWithHook = async () => {
		await getRequest<PersonalizationFormDataValues[]>(`api/get-user-data/${userData?._id}`)
			.then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log('Error fetching user data:', err);
			});
	};

	useEffect(() => {
		fetchDataWithHook();
	}, []);


	const onSubmit: SubmitHandler<PersonalizationFormDataValues> = async (data) => {
		await postRequest<AuthResponse>('api/edit-data', data).then(() => {
			setMessage({ alertType: 'success', content: 'Edit done successfully!' });
			// fetchDataWithHook()
		}).catch(() => setMessage({ alertType: 'error', content: 'Something went wrong' }));
	};

	const handleSwitchChange = () => {
		const identificationType = getValues('identificationType')
		setValue('identificationType', identificationType === 'PESEL' ? 'NIP' : 'PESEL')
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Card sx={{ padding: 2, marginTop: 2, marginBottom: 2, maxWidth: 1000, width: '100%' }}>
				<Typography variant="h5"
					gutterBottom>
					Personalization
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Divider variant="fullWidth" />
					<CardContent>
						<Grid container
							spacing={3}>
							<Grid item
								xs={12}
								sm={6}
								md={6}
								sx={{ display: 'flex', flexDirection: 'column' }}>
								<FormTextfield
									control={control}
									name={'address'}
									fullWidth
									id="address"
									label="Address"
									autoComplete="address"
									sx={{ marginTop: '10px' }}
								/>
								<FormTextfield
									control={control}
									name={'fullName'}
									fullWidth
									id="fullName"
									label="Full Name"
									autoComplete="name"
									sx={{ marginTop: '10px' }}
								/>
								<FormTextfield
									control={control}
									name={'gender'}
									fullWidth
									id="gender"
									label="Gender"
									autoComplete="gender"
									sx={{ marginTop: '10px' }}
								/>
							</Grid>
							<Grid item
								xs={12}
								sm={6}
								md={6}
								sx={{ display: 'flex', flexDirection: 'column' }}>
								<FormTextfield
									control={control}
									name={'motherName'}
									fullWidth
									id="motherName"
									label="Mother's Name"
									autoComplete="motherName"
									sx={{ marginTop: '10px' }}
								/>
								<FormControlLabel
									control={<Switch
										onChange={() => handleSwitchChange()}
									/>}
									label="Company" />
								<FormTextfield
									control={control}
									name={'identification'}
									fullWidth
									id={'identification'}
									label={watch('identificationType')}
									sx={{ marginTop: '10px', marginBottom: '10px' }}
								/>
							</Grid>
						</Grid>
					</CardContent>
					<Divider variant="fullWidth" />
					<CardActions sx={{ justifyContent: 'flex-end' }}>
						<Button
							type="submit"
							variant="contained"
							color="primary">
							Save Changes
						</Button>
					</CardActions>
				</form>
			</Card>
		</Box>


	);
};
