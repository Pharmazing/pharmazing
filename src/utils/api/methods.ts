import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useApiQuery = (key: any, fn: (params: any) => any, options: any) =>
  useQuery({
    queryKey: key,
    queryFn: fn,
    ...options,
  });

export const useApiMutation = (
  fn: (params: any) => any,
  success: any,
  error: any,
  invalidateKey: any,
  options: any,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      invalidateKey &&
        invalidateKey.forEach((key: any) => {
          queryClient.invalidateQueries(key);
        });
      success && success(data);
    },
    onError: error,
    retry: 2,
    ...options,
  });
};
