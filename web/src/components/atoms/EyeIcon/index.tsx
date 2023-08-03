import React, { useCallback } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface EyeIconProp {
	setShowPassword: (val: boolean) => void;
	showPassword: boolean;
}
export const EyeIcon: React.FC<EyeIconProp> = ({
	setShowPassword,
	showPassword,
}) => {
	const Icon = showPassword ? AiFillEyeInvisible : AiFillEye;

	const handleClick = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	return (
		<div onClick={handleClick}>
			<Icon size={15} />
		</div>
	);
};
