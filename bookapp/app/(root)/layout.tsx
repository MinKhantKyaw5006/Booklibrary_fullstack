// import React, { ReactNode } from 'react'
// import Header from '@/components/Header'
// import { redirect } from 'next/navigation';
// import { auth } from '@/auth';

// const layout =async ({children}:{children: ReactNode}) => {
//     const session  = await auth();
    
//     if(!session) redirect("/sign-in");
//   return (
//     <main className='root-container'>
//         <div className='mx-auto max-w-7xl'>
//             <Header session={session}/>
//             <div className='mt-20 pb-20'>
//                 {children}
//             </div>
//         </div>
//     </main>
//   )
// }

// export default layout

// app/layout.tsx
// import React, { ReactNode } from 'react'
// import Header from '@/components/Header'
// import { redirect } from 'next/navigation'
// import { auth } from '@/auth'
// import { db } from '@/database/drizzle'
// import { eq } from 'drizzle-orm'
// import { users } from '@/database/schema'
// import {after} from "next/server"

// export default async function Layout({ children }: { children: ReactNode }) {
//   const session = await auth()

//   if (!session) {
//     redirect('/sign-in')
//   }

//   after(async()=>{
//     if(!session?.user?.id) return;

//     await db
//     .update(users)
//     .set({lastActivityDate: new Date().toISOString().slice(0,10)})
//     .where(eq(users.id, session?.user?.id));
//   })

//   return (
//     <main className="root-container">
//       <div className="mx-auto max-w-7xl">
//         <Header session={session} />
//         <div className="mt-20 pb-20">{children}</div>
//       </div>
//     </main>
//   )
// }


// app/layout.tsx
// app/layout.tsx
import React, { ReactNode } from 'react'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { db } from '@/database/drizzle'
import { eq } from 'drizzle-orm'
import { users } from '@/database/schema'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/sign-in')
  }

  // ✅ Run activity update without blocking rendering
  if (session?.user?.id) {
    const userId = session.user.id
    const today = new Date().toISOString().slice(0, 10)

    ;(async () => {
      try {
        const user = await db
          .select({ lastActivityDate: users.lastActivityDate })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1)

        if (user[0]?.lastActivityDate !== today) {
          await db
            .update(users)
            .set({ lastActivityDate: today })
            .where(eq(users.id, userId))
        }
      } catch (error) {
        console.error('Error updating last activity date:', error)
      }
    })()
  }

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        {/* <Header session={session} /> */}
        <Header/>
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  )
}
