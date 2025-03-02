import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import { type ComputedRef, toValue } from 'vue'

import type { UserDetail } from '@/models/user/detail/user.model'
import type { UserUuid } from '@/models/user/userUuid.model'
import { UserService } from '@/modules/user/api/services/user.service'

export function useUserDetailQuery(userUuid: ComputedRef<UserUuid>): UseQueryReturnType<UserDetail> {
  return useQuery<UserDetail>({
    queryFn: () => UserService.getByUuid(toValue(userUuid)),
    queryKey: {
      userDetail: {
        userUuid,
      },
    },
  })
}
