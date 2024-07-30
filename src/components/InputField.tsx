import React, { FC } from "react";
import { InputFieldProps } from "../types/InputFieldProps";



export const InputField: FC<InputFieldProps> = ({ label, name, type, register, errors }) => {
	return (
		<label>
			{label}:
			<input
				type={type}
				{...register(name)}
				aria-invalid={!!errors[name]}
			/>
			{errors[name] && (
				<p role="alert" style={{ color: "red" }}>
					{errors[name].message}
				</p>
			)}
		</label>
	);
};
