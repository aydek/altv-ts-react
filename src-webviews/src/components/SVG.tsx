import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
    size?: number;
}

export const ArrowRight: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z" />
        </svg>
    );
};

export const ArrowLeft: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>
    );
};

export const Check: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
    );
};

export const Camera: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
        </svg>
    );
};

export const Eye: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12A2.5,2.5 0 0,0 12,9.5M12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13M12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12A2.5,2.5 0 0,0 12,9.5M12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,16C9.37,16 7,14.43 6,12C7.38,8.69 11.19,7.12 14.5,8.5C16.08,9.16 17.34,10.42 18,12C17,14.43 14.63,16 12,16M12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12A2.5,2.5 0 0,0 12,9.5M12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13Z" />
        </svg>
    );
};

export const AccountPlus: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4M15,5.9C16.16,5.9 17.1,6.84 17.1,8C17.1,9.16 16.16,10.1 15,10.1A2.1,2.1 0 0,1 12.9,8A2.1,2.1 0 0,1 15,5.9M4,7V10H1V12H4V15H6V12H9V10H6V7H4M15,13C12.33,13 7,14.33 7,17V20H23V17C23,14.33 17.67,13 15,13M15,14.9C17.97,14.9 21.1,16.36 21.1,17V18.1H8.9V17C8.9,16.36 12,14.9 15,14.9Z" />
        </svg>
    );
};

export const IconClose: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
    );
};

export const IconShuffle: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M17,3L22.25,7.5L17,12L22.25,16.5L17,21V18H14.26L11.44,15.18L13.56,13.06L15.5,15H17V12L17,9H15.5L6.5,18H2V15H5.26L14.26,6H17V3M2,6H6.5L9.32,8.82L7.2,10.94L5.26,9H2V6Z" />
        </svg>
    );
};

export const ChevronLeft: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
    );
};

export const ChevronRight: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
    );
};

export const LightsIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 15.9,17.1 13.1,17.2M8,10.5C8,11 7.9,11.5 7.9,12C7.9,12.2 7.9,12.4 7.9,12.6L2.4,14L1.9,12.1L8,10.5M2,7L9.4,5.1C9.2,5.4 9,5.8 8.9,6.3C8.8,6.6 8.7,7 8.6,7.4L2.5,8.9L2,7M8.2,15.5C8.3,16.2 8.5,16.9 8.7,17.4L2.4,19L1.9,17.1L8.2,15.5Z" />
        </svg>
    );
};

export const HighBeamIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 16,17.1 13.1,17.2M2,5H9.5C9.3,5.4 9,5.8 8.9,6.4C8.8,6.6 8.8,6.8 8.7,7H2V5M8,11H2V9H8.2C8.1,9.6 8.1,10.3 8,11M8.7,17C8.9,17.8 9.2,18.4 9.6,19H2.1V17H8.7M8.2,15H2V13H8C8.1,13.7 8.1,14.4 8.2,15Z" />
        </svg>
    );
};

export const FuelIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z" />
        </svg>
    );
};

export const SeatBeltIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M12,2C13.11,2 14,2.9 14,4C14,5.11 13.11,6 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M12.39,14.79C14.03,14.79 15.46,14.89 16.64,15.04C16.7,12.32 16.46,9.92 16,9C15.87,8.73 15.69,8.5 15.5,8.3L7.43,15.22C8.79,15 10.5,14.79 12.39,14.79M7.46,17C7.59,18.74 7.85,20.5 8.27,22H10.34C10.05,21.12 9.84,20.09 9.68,19C9.68,19 12,18.56 14.32,19C14.16,20.09 13.95,21.12 13.66,22H15.73C16.17,20.45 16.43,18.61 16.56,16.79C15.41,16.65 14,16.54 12.39,16.54C10.46,16.54 8.78,16.75 7.46,17M12,7C12,7 9,7 8,9C7.66,9.68 7.44,11.15 7.37,12.96L13.92,7.34C12.93,7 12,7 12,7M18.57,5.67L17.43,4.34L13.92,7.35C14.47,7.54 15.05,7.84 15.5,8.3L18.57,5.67M20.67,15.83C20.58,15.8 19.14,15.33 16.64,15.04C16.63,15.61 16.6,16.2 16.56,16.79C18.81,17.07 20.1,17.5 20.12,17.5L20.67,15.83M7.37,12.96L3.43,16.34L4.32,17.82C4.34,17.81 5.5,17.36 7.46,17C7.35,15.59 7.32,14.2 7.37,12.96Z" />
        </svg>
    );
};

export const ChevronDown: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
    );
};

export const ResizeIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z" />
        </svg>
    );
};

export const BellIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
        >
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
        </svg>
    );
};

export const InfoIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
        >
            <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
        </svg>
    );
};

export const SuccessIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
        >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
    );
};

export const WarningIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 512"
        >
            <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
        </svg>
    );
};

export const ErrorIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
        >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
    );
};

export const PencilBoxIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M19,3A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M16.7,9.35C16.92,9.14 16.92,8.79 16.7,8.58L15.42,7.3C15.21,7.08 14.86,7.08 14.65,7.3L13.65,8.3L15.7,10.35L16.7,9.35M7,14.94V17H9.06L15.12,10.94L13.06,8.88L7,14.94Z" />{' '}
        </svg>
    );
};

export const TrashCanIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            {...props}
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
        </svg>
    );
};

export const MouseLeftIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 356 511.91"
        >
            <path
                fillRule="nonzero"
                d="M227.59 511.91h-34.5c-35.29 0-67.38-14.46-90.66-37.72l-.07-.07c-23.25-23.27-37.68-55.36-37.68-90.63V192.93c0-35.3 14.44-67.4 37.7-90.67 23.31-23.3 55.4-37.74 90.71-37.74h34.5c35.3 0 67.39 14.44 90.66 37.7 23.3 23.31 37.75 55.41 37.75 90.71v190.56c0 35.29-14.46 67.4-37.73 90.68-23.24 23.28-55.36 37.74-90.68 37.74zm109.45-245.53H83.63v117.11c0 30.12 12.31 57.49 32.12 77.29 19.85 19.86 47.22 32.17 77.34 32.17h34.5c30.08 0 57.45-12.33 77.29-32.17 19.85-19.8 32.16-47.17 32.16-77.29V266.38zM83.63 247.42h117.23v-33.43c-9.87-3.84-16.97-13.51-16.97-24.66v-38.27c0-11.16 7.07-20.81 16.97-24.66V83.48h-7.77c-30.1 0-57.48 12.31-77.32 32.13-19.82 19.84-32.14 47.22-32.14 77.32v54.49zm136.19 0h117.22v-54.49c0-30.1-12.31-57.48-32.14-77.32-19.84-19.82-47.21-32.13-77.31-32.13h-7.77v42.91c9.9 3.84 16.96 13.47 16.96 24.67v38.27c0 11.2-7.09 20.84-16.96 24.67v33.42zM88.3 67.39 49.44 28.54c-5.01-5.02-13.17-5.01-18.19 0-5.01 5.02-5.01 13.16 0 18.19l38.38 38.36a127.65 127.65 0 0 1 18.67-17.7zm58.5-24.95L129.81 6.69c-3.4-6.22-11.18-8.51-17.4-5.12-6.22 3.39-8.51 11.18-5.11 17.4l15.18 29.61c7.78-2.81 15.91-4.89 24.32-6.14zm-97.19 74.45-30.64-16.61c-6.22-3.4-14.01-1.11-17.4 5.1-3.39 6.21-1.11 14.02 5.1 17.4l35.21 18.06a125.23 125.23 0 0 1 7.73-23.95z"
            />
        </svg>
    );
};

export const MouseRightIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 356 511.91"
        >
            <path
                fillRule="nonzero"
                d="M128.41 492.95h34.5c30.09 0 57.45-12.33 77.29-32.17l.5-.46c19.55-19.77 31.67-46.95 31.67-76.83V266.38H18.96v117.11c0 30.12 12.31 57.49 32.12 77.29 19.85 19.86 47.22 32.17 77.33 32.17zm143.96-245.53v-54.49c0-30.1-12.32-57.48-32.14-77.32-19.84-19.82-47.22-32.13-77.32-32.13h-7.77v42.92c9.9 3.85 16.96 13.5 16.96 24.66v38.27c0 11.15-7.09 20.82-16.96 24.66v33.43h117.23zm-136.19 0V214c-9.87-3.83-16.96-13.47-16.96-24.67v-38.27c0-11.2 7.06-20.83 16.96-24.67V83.48h-7.77c-30.1 0-57.48 12.31-77.32 32.13-19.82 19.84-32.13 47.22-32.13 77.32v54.49h117.22zM267.7 67.39l38.86-38.85c5.01-5.02 13.17-5.01 18.19 0 5.01 5.02 5.01 13.16 0 18.19l-38.38 38.36a127.65 127.65 0 0 0-18.67-17.7zm-58.5-24.95 16.99-35.75c3.4-6.22 11.18-8.51 17.4-5.12 6.21 3.39 8.51 11.18 5.11 17.4l-15.18 29.61c-7.78-2.81-15.91-4.89-24.32-6.14zm97.19 74.45 30.63-16.61c6.23-3.4 14.02-1.11 17.41 5.1 3.39 6.21 1.1 14.02-5.1 17.4l-35.21 18.06c-1.8-8.32-4.39-16.33-7.73-23.95zM162.91 511.91h-34.5c-35.27 0-67.36-14.44-90.63-37.69l-.07-.07C14.45 450.87 0 418.78 0 383.49V192.93c0-35.3 14.45-67.4 37.71-90.67 23.3-23.3 55.4-37.74 90.7-37.74h34.5c35.3 0 67.4 14.44 90.67 37.7 23.3 23.31 37.74 55.41 37.74 90.71v190.56c0 35.01-14.23 66.88-37.17 90.12l-.54.58c-23.26 23.26-55.38 37.72-90.7 37.72z"
            />
        </svg>
    );
};

export const CtrlIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 122.88 108.95"
        >
            <g>
                <path d="M23.01,0h76.87c6.33,0,12.08,2.59,16.25,6.76c4.17,4.17,6.76,9.92,6.76,16.25v62.93c0,6.33-2.59,12.08-6.76,16.25 c-4.17,4.17-9.92,6.76-16.25,6.76H23.01c-6.33,0-12.08-2.59-16.25-6.76C2.59,98.02,0,92.27,0,85.94V23.01 c0-6.33,2.59-12.08,6.76-16.25C10.92,2.59,16.68,0,23.01,0L23.01,0z M43.42,51.16l7.42,2.37c-0.5,2.2-1.28,4.04-2.36,5.51 c-1.07,1.48-2.4,2.59-3.99,3.34c-1.59,0.75-3.61,1.13-6.06,1.13c-2.98,0-5.41-0.46-7.31-1.37c-1.89-0.92-3.51-2.53-4.88-4.83 c-1.37-2.3-2.06-5.25-2.06-8.84c0-4.79,1.21-8.47,3.62-11.05c2.42-2.57,5.83-3.86,10.24-3.86c3.45,0,6.17,0.74,8.14,2.21 c1.97,1.48,3.44,3.74,4.4,6.8l-7.46,1.75c-0.26-0.88-0.54-1.52-0.82-1.92c-0.48-0.68-1.06-1.21-1.74-1.57 c-0.69-0.37-1.45-0.55-2.3-0.55c-1.93,0-3.4,0.82-4.42,2.44c-0.77,1.21-1.16,3.11-1.16,5.69c0,3.21,0.46,5.4,1.38,6.6 c0.92,1.19,2.22,1.78,3.89,1.78c1.62,0,2.84-0.48,3.67-1.44C42.45,54.38,43.05,52.99,43.42,51.16L43.42,51.16z M4.95,77.43 c0.85,3.18,2.52,6.03,4.76,8.3l0.1,0.09c3.39,3.39,8.06,5.49,13.19,5.49h76.86l0.18,0l1.98-0.12c4.23-0.49,8.04-2.41,10.94-5.26 l0.09-0.1c2.3-2.3,4.01-5.19,4.86-8.42v-54.4c0-4.96-2.03-9.47-5.31-12.75c-3.27-3.27-7.79-5.31-12.75-5.31H23.01 c-4.96,0-9.48,2.03-12.75,5.3c-3.27,3.27-5.3,7.79-5.3,12.75V77.43L4.95,77.43z M64,34.04v7.97h4.17v5.91H64v7.43 c0,0.89,0.08,1.48,0.24,1.77c0.25,0.45,0.69,0.67,1.31,0.67c0.56,0,1.35-0.17,2.36-0.51l0.56,5.56c-1.88,0.44-3.63,0.65-5.27,0.65 c-1.89,0-3.29-0.26-4.19-0.77c-0.89-0.51-1.56-1.29-1.99-2.34c-0.43-1.05-0.64-2.74-0.64-5.08v-7.38H53.6v-5.91h2.79v-3.85 L64,34.04L64,34.04z M72.26,42.01h7.13v3.43c0.69-1.49,1.4-2.52,2.12-3.08c0.73-0.56,1.63-0.84,2.7-0.84 c1.13,0,2.36,0.37,3.69,1.11l-2.36,5.71c-0.9-0.4-1.61-0.59-2.14-0.59c-0.99,0-1.77,0.44-2.32,1.31c-0.78,1.23-1.18,3.53-1.18,6.89 v7.05h-7.65V42.01L72.26,42.01z M91.09,34.04h7.61v28.97h-7.61V34.04L91.09,34.04z" />
            </g>
        </svg>
    );
};

export const AltIcon: React.FC<Props> = ({ size = 25, ...props }: Props) => {
    return (
        <svg
            className={twMerge('fill-whitesmoke', props.className)}
            width={size}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 122.88 108.95"
        >
            <g>
                <path d="M53.2,53.36h-8.82l-1.27,4.39h-7.95l9.49-26.65h8.52l9.44,26.65h-8.15L53.2,53.36L53.2,53.36z M21.17,0h80.55 c5.82,0,11.12,2.38,14.95,6.22c3.84,3.84,6.22,9.13,6.22,14.95v57.9c0,5.82-2.38,11.11-6.22,14.95c-3.84,3.84-9.13,6.22-14.95,6.22 H21.17c-5.82,0-11.11-2.38-14.95-6.22C2.38,90.18,0,84.89,0,79.07v-57.9c0-5.82,2.38-11.12,6.22-14.95C10.05,2.38,15.34,0,21.17,0 L21.17,0z M101.71,4.56H21.17c-4.57,0-8.72,1.87-11.73,4.88c-3.01,3.01-4.88,7.16-4.88,11.73v50.05c0.79,2.97,2.36,5.63,4.47,7.74 c3.11,3.11,7.41,5.05,12.13,5.05h80.55c0.19,0,0.38,0,0.56-0.01l1.17-0.08c4.03-0.41,7.67-2.23,10.4-4.96 c2.11-2.11,3.68-4.77,4.47-7.74V21.17c0-4.56-1.87-8.72-4.88-11.73C110.43,6.43,106.28,4.56,101.71,4.56L101.71,4.56z M83.6,31.1 v7.33h3.84v5.43H83.6v6.84c0,0.82,0.08,1.36,0.22,1.63c0.23,0.41,0.63,0.61,1.21,0.61c0.52,0,1.24-0.16,2.17-0.47l0.52,5.12 c-1.73,0.4-3.34,0.6-4.85,0.6c-1.74,0-3.03-0.24-3.85-0.71c-0.82-0.47-1.43-1.19-1.83-2.15c-0.39-0.96-0.59-2.53-0.59-4.68v-6.79 h-2.57v-5.43h2.57v-3.54L83.6,31.1L83.6,31.1z M64.27,31.1h7v26.65h-7V31.1L64.27,31.1z M51.55,47.59l-2.75-9.58l-2.76,9.58H51.55 L51.55,47.59z" />
            </g>
        </svg>
    );
};
