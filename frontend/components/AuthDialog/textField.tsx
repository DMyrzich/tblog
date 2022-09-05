import { TextField } from '@material-ui/core';
import { useFormContext } from "react-hook-form";

interface LoginFormProps {
    label: string;
    name: string;
    className?: string;
    type?: 'password';
}

const TextFormField: React.FC<LoginFormProps> = ({ label, name, className = "mb-20" }) => {

    const { register, formState: { errors } } = useFormContext();

    const st = {
        helper: {
            margin: 0
        }
    }

    return (
        <TextField
            className={className}
            size="small"
            label={label}
            variant="outlined"
            fullWidth
            error={!!errors[name]?.message}
            FormHelperTextProps={{ style: st.helper }}
            helperText={errors[name]?.message}
            {...register(name)}
        />)
}

export default TextFormField;
