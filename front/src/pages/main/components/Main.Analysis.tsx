import React, { FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { instance } from '../../../api/instance';
import styles from './index.module.scss';

const Anaysis: React.FC = () => {

  const mutation = useMutation(
    async (userSigninInfos: { email: string; password: string }) => {
      const response = await instance.post('http://localhost:5001/anaysis', userSigninInfos);
      return response.data;
    },
    {
      // 로그인 성공
      onSuccess: (data) => {
        console.log('성공', data);
      },
      // 로그인 실패
      onError: (error) => {
        console.log('실패', error);
      }
    }
  );

  return (
    <>
      <div></div>
    </>
  );
};