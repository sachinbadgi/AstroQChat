import { useRecoilValue } from 'recoil';
import { QueryKeys, dataService } from 'librechat-data-provider';
import { useQuery } from '@tanstack/react-query';
import type { QueryObserverResult, UseQueryOptions } from '@tanstack/react-query';
import type t from 'librechat-data-provider';
import type { TUser } from 'librechat-data-provider';
import store from '~/store';

export const useGetUserQuery = (
  config?: UseQueryOptions<t.TUser>,
): QueryObserverResult<t.TUser> => {
  const queriesEnabled = useRecoilValue<boolean>(store.queriesEnabled);
  return useQuery<t.TUser>([QueryKeys.user], () => dataService.getUser(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    ...config,
    enabled: (config?.enabled ?? true) === true && queriesEnabled,
  });
};

export const useFetchAstroProfile = (): QueryObserverResult<{
  dateOfBirth?: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
}> => {
  const queriesEnabled = useRecoilValue<boolean>(store.queriesEnabled);
  return useQuery<{
    dateOfBirth?: string;
    timeOfBirth?: string;
    placeOfBirth?: string;
  }>(
    [QueryKeys.user, 'astroProfile'],
    async () => dataService.getUser().then((user: TUser) => ({ dateOfBirth: user.dateOfBirth, timeOfBirth: user.timeOfBirth, placeOfBirth: user.placeOfBirth })),
    { enabled: queriesEnabled },
  );
};
