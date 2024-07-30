import { TextField as MuiTextField, styled } from "@mui/material";
import React from "react";

export enum MarginType {
	"NORMAL" = "normal",
	"DENSE" = "dense",
	"NONE" = "none",
}

interface Input {
	text: string;
	label: string;
	required: boolean;
	fullWidth: boolean;
}


const TextField = styled( MuiTextField, {
	shouldForwardProp: (prop) => prop !== "margin"
} )<MarginType>( ({ margin }) => ({
	border: '1px solid red',
	margin: margin === MarginType.NORMAL ? 40 : 0
}) );

//https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#param-and-returns
/**
 * @param {Object} FormInput - Custom styled TextField from MUI
 * @param {string} FormInput.text - input text
 * @param {string} FormInput.label - input label
 * @param {boolean} FormInput.required - is input required
 * @param {boolean} FormInput.fullWidth - is input fullWidth
 */
export const FormInput = ({ text, label, required, fullWidth }: Input, margin: MarginType): JSX.Element => {
	return (
		// <TextField 
	
		// 	margin={margin}/>
		<></>
	);

};