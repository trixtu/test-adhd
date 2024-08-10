import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'

const PageAbout = async () => {
  const { getUser } = getKindeServerSession();
	const user = await getUser();

  console.log(user)
  return (
    <div>PageAbout</div>
  )
}

export default PageAbout