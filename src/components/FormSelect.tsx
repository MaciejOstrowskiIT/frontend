import React from 'react';
import {FieldPath, FieldValues, UseControllerProps, useController} from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'

export type SelectOption = {
    label: string
    value: string
}

type FormSelectProps<
TextFieldValues extends FieldValues = FieldValues,
TextFieldName extends FieldPath<TextFieldValues> = FieldPath<TextFieldValues>> = UseControllerProps<TextFieldValues, TextFieldName> 
& SelectProps & {
    label?: string
    options: Readonly<SelectOption[]>
    helperText?: string
}

export const FormSelect = <TextFieldValues extends FieldValues = FieldValues,
TextFieldName extends FieldPath<TextFieldValues> = FieldPath<TextFieldValues>>({
    helperText,
    control, 
    name,
    id,
    label,
    options,
    ...rest
}:FormSelectProps<TextFieldValues, TextFieldName>) => {
    
    const {
        field: {value, onBlur, onChange},
        fieldState: {invalid, error}
    } = useController({control, name})

    return (
        <FormControl variant='filled' fullWidth error={invalid}>
            {label && <InputLabel id={id}>{label}</InputLabel>}
            <Select
            {...rest}
            onBlur={onBlur}
            labelId={id}
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
            >
                {options.map(({value, label}) => (
                    <MenuItem value={value} key={value}>
                    {label}
                    </MenuItem>
                ))}

                
            </Select>
            {invalid && error?.message ? <p style={{color: 'red'}}>{error.message}</p> : <p>{helperText}</p>}
        </FormControl>
    )
}
