import { Typography as MuiTypography, styled } from "@mui/material"


// to jest zle, bo dla nowego dewelopera nie istnieje cost takiego jak FontSize.BIG w MUi;
// varianty tekstu w MUI to np: h1, h2, body1, body2
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
    shouldForwardProp: (prop) => prop !== 'size'
})<Pick<TextType, 'size'>>(({ size, theme }) => ({
    fontSize: size
}))

export const Text = ({ text, size }: TextType): JSX.Element => {
    return (
        <Typography size={size}>
            {text}
        </Typography>
    )
}