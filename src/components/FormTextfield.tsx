import React from 'react';
import {FieldPath, FieldValues, UseControllerProps, useController} from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material'

type FormTextfieldProps<
TextFieldValues extends FieldValues = FieldValues,
TextFieldName extends FieldPath<TextFieldValues> = FieldPath<TextFieldValues>> = UseControllerProps<TextFieldValues, TextFieldName> 
& TextFieldProps

export const FormTextfield = <TextFieldValues extends FieldValues = FieldValues,
TextFieldName extends FieldPath<TextFieldValues> = FieldPath<TextFieldValues>>({
    helperText,
    control, 
    name,
    ...rest
}:FormTextfieldProps<TextFieldValues, TextFieldName>) => {
    
    const {
        field: {value, onBlur, onChange},
        fieldState: {invalid, error}
    } = useController({control, name})

    return (
        <TextField
        {...rest}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ''}
        helperText={invalid && error?.message ? error.message : helperText}
        error={invalid}
        />
    )
}
