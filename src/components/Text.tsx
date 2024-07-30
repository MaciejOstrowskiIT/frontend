import { Typography as MuiTypography, styled } from "@mui/material"


export enum FontSize {
    'BIG' = 20,
    'MID' = 16,
    'SMALL' = 12
}

interface TextType {
    text: string
    size: FontSize
}


const Typography = styled(MuiTypography, {
    shouldForwardProp: (prop) => prop !== 'size'})<Pick<TextType, 'size'>>(({size, theme}) => ({
    fontSize: size
}))

export const Text = ({text, size}: TextType):JSX.Element => {
    return (
        <Typography size={size}>
            {text}
        </Typography>
    )
}