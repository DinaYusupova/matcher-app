import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import '../UI/UserCard.css'

type LoaderProps = {
  children: React.ReactElement;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
  if (isLoading)
    return (
      <div className="centered-container">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#e5646e"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible
        />
      </div>
    );
  return children;
}
