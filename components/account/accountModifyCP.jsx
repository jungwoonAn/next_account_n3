'use client'

import { putAccount } from "@/actions/accountActions";
import { useSession, signIn, signOut } from "next-auth/react";
import { useActionState, useEffect } from "react";

export default function AccountModifyCP() {
    const { data, status, update } = useSession()

    const [state, action, isPending] = useActionState(putAccount, { message: '', result: '' })

    useEffect(() => {
        if (state.result === 'success') {
            alert('다시 로그인 필요')
            signOut({ callbackUrl: '/' })  // 강제 로그아웃 후 '/'경로로 이동
        }
    }, [state])

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    const { email, name } = data?.user

    return (
        <div>
            <div>Account Modify Component</div>
            <form action={action}>
                <div>
                    Email <input type="text" name="email" defaultValue={email} readOnly></input>
                </div>
                <div>
                    Nickname <input type="text" name="nickname" defaultValue={name}></input>
                </div>
                <div>
                    Password <input type="password" name="password"></input>
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? '저장 중...' : '저장하기'}
                </button>
            </form>
        </div>
    )
}