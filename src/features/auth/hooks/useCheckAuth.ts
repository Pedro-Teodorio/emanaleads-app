import { useAuthStore } from '@/store/auth.store';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../services/user';
import axios from 'axios';
import { useEffect } from 'react';

export enum AuthKey {
	CHECK_AUTH = 'check-auth',
}

export function useCheckAuth() {
	const zustandStatus = useAuthStore((state) => state.status);
	const setUser = useAuthStore((state) => state.setUser);
	const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

	const { data, isSuccess, isError } = useQuery({
		queryKey: [AuthKey.CHECK_AUTH],
		queryFn: fetchUser,
		retry: (failureCount, error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				return false;
			}
			return failureCount < 3;
		},
		refetchOnWindowFocus: false,
		enabled: zustandStatus === 'pending',
	});

	useEffect(() => {
		if (zustandStatus !== 'pending') {
			return;
		}
		if (isSuccess) {
			setUser(data);
		}

		if (isError) {
			setUnauthenticated();
		}
	}, [isSuccess, isError, data, setUser, setUnauthenticated, zustandStatus]);

	return { status: zustandStatus };
}
