/* eslint-disable */
'use client';
import RecentOrder from '@/components/domain/recentorder/RecentOrder';
import { DeleteUserdata, GetUserData } from '@/utils/redisSubscribe';
import { register } from '@/utils/register';
import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const getUserdetail = async () => {
  const res = await axios.get('/api/users');
  return res.data;
};
const Page = () => {
  const [userdata, setUserdata] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    async function list() {
      const data = await GetUserData();
      setUserdata(data);
    }
    list();
  }, [buttonClicked]);

  const { data, isError, isLoading } = useQuery(['users'], getUserdetail);

  return (
    <Suspense fallback={<div>loading....</div>}>
      <div>
        <p className="subtext">Admin Role Approval</p>
        <p className="font-semibold text-blue-700">New sign ups</p>
        <table className="mt-5">
          <thead className="text-xs text-blue-700 bg-sky-200 uppercase">
            <tr>
              <td>Firstname</td>
              <td>lastname</td>
              <td>Email</td>
              <td>Decide</td>
            </tr>
          </thead>
          {userdata.length === 0 ? (
            <tbody className="subtext text-sm no-underline">
              <tr>
                <td>No User Pending</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {userdata.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => {
                          register({
                            firstname: item.firstname,
                            lastname: item.lastname,
                            email: item.email,
                            password: item.password,
                          }).then(() => {
                            const array = userdata.filter(
                              (_, i) => i !== index
                            );
                            DeleteUserdata(array);
                            window.location.reload();
                          });
                        }}
                        className="button-sm bg-blue-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          const array = userdata.filter((_, i) => i !== index);
                          DeleteUserdata(array);
                        }}
                        className="button-sm bg-red-700"
                      >
                        Ignore
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        <div>
          <RecentOrder
            title="All Users"
            thead={['S.no', 'firstname', 'lastname', 'email', 'action']}
            body={data?.data}
            page="users"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
