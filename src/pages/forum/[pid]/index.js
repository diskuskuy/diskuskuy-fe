import React, { useState, useEffect } from 'react'

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from '@/styles/Forum.module.css'
import DiscussionAnalytics from '@/components/Forum/DiscussionAnalytics'
import DiscussionSummary from '@/components/Forum/DiscussionSummary'
import DiscussionGuide from '@/components/Forum/DiscussionGuide';
import PostComponent from '@/components/Forum/postComponent';
import References from '@/components/Forum/References';
import Onboarding from '@/components/Forum/Onboarding';
import dataObd1 from '@/constants/obd-1';
import dataObd2 from '@/constants/obd-2';
import dataObd3 from '@/constants/obd-3';
import dataObd4 from '@/constants/obd-4';
import { fetchThreadDataById } from '@/api/forum';
import { initialPost, replyPost, fase } from '@/api/dummy/forum';
import CircularProgress from '@mui/material/CircularProgress';
import { isObjectEmpty } from '@/utils/util';
import { useRouter } from "next/router";

export default function Forum() {

  const router = useRouter();

  const inquiry = fase == 1 ? dataObd1 : fase == 2 ? dataObd2 : fase == 3 ? dataObd3 : dataObd4; 

  const [forumData, setForumData] = useState({});

  useEffect(() => {
    fetchThreadDataById()
    .then(data => {
      console.log(data)
      setForumData(data)})
  }, [])

  
  return (
    <>
      <main className={styles.main}>
        { isObjectEmpty(forumData) && 
          <div className='flex flex-row justify-center'>
            <CircularProgress color="inherit"/>
          </div>
        }
        { !isObjectEmpty(forumData) &&
        <>
        <div className='flex flex-row items-center text-xs pb-10'>
          <a className='cursor-pointer' href='/'>Sistem Interaksi - Gasal 2020/2021</a>
          <ChevronRightIcon />
          {/* TODO: replace #{num} pake week keberapa & nama week*/}
          <a className='cursor-pointer' href='/#4'>Forum Diskusi Minggu ke-1</a>
          <ChevronRightIcon />
          <a className='font-bold'>Thread: {forumData.title}</a>
        </div>
        <div className='flex flex-row gap-5'>
          <div className='flex flex-col basis-2/3 gap-5'>
            <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2">
            <PostComponent post={forumData.initial_post}/>
            </div>
            <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2 ml-10">
              {replyPost.map((object, i) => 
                <PostComponent post={object} key={i}/>
              )}
            </div>
          </div>
          <div className="flex flex-col basis-1/3 gap-5">
            <DiscussionGuide data={forumData.discussion_guide} onSeeDiscussionGuide={() => router.push(forumData.id+'/discussion-guide')}/>
            <References />
            <DiscussionAnalytics />
            <DiscussionSummary content={forumData.summary ? forumData.summary.content : null} />
          </div>
        </div>
        <Onboarding data={inquiry} />
        </>
        }
      </main>
    </>
  )
}
