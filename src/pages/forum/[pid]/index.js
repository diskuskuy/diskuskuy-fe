import React, { useState, useEffect } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "@/styles/Forum.module.css";
import DiscussionAnalytics from "@/components/Forum/DiscussionAnalytics";
import DiscussionSummary from "@/components/Forum/DiscussionSummary";
import DiscussionGuide from "@/components/Forum/DiscussionGuide";
import PostComponent from "@/components/Forum/postComponent";
import References from "@/components/Forum/References";
import Onboarding from "@/components/Forum/Onboarding";
import { dataObd1, dataObd2, dataObd3, dataObd4 } from "@/constants/OnboardingConstants";
import {
  fetchThreadDataById,
  fetchReplyDataById,
  fetchSummary,
  fetchNestedReply,
  fetchReferences,
  fetchAnalytics,
  fetchBreadcrumbByThreadId,
} from "@/api/forum";
import { initialPost, replyPost, fase } from "@/api/dummy/forum";
import CircularProgress from "@mui/material/CircularProgress";
import { isObjectEmpty } from "@/utils/util";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { getCookie } from 'cookies-next'

export default function Forum() {
  const router = useRouter();
  const { pid } = router.query;

  const [forumData, setForumData] = useState({});
  const [initialPost, setInitialPost] = useState({});
  const [initialSummary, setInitialSummary] = useState({});
  const [initialNested, setInitialNested] = useState([]);
  const [references, setReferences] = useState([]);
  const [onboardingData, setOnboardingData] = useState([]);
  const [isLecturer, setIsLecture] = useState(false)
  const [analytics , setAnalytics] = useState({})
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [breadcrumb, setBreadcrumb] = useState("");

  const handleNestedReply = () => {
    router.push("/create-post");
  };

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split("/");
    const threadId = pathArray[pathArray.length - 1];

    fetchAnalytics(threadId).then((data) => {
      setAnalytics(data);
      console.log(data)
    }); 


    setIsLecture(getCookie("auth") ? JSON.parse(getCookie("auth"))?.role === "lecturer" : false)

    fetchThreadDataById(threadId).then((data) => {
      setForumData(data);
      setOnboardingData(
        data?.discussion_guide?.state == 1
          ? dataObd1
          : data?.discussion_guide?.state == 2
          ? dataObd2
          : data?.discussion_guide?.state == 3
          ? dataObd3
          : dataObd4
      );
      if (data?.discussion_guide?.state > 4) {
        setShowOnboarding(false)
      }
      setReferences(data?.reference_file ?? []);
      setInitialSummary(data?.summary?.content ?? "");

      fetchReplyDataById(data?.initial_post?.id).then((data) => {
        setInitialPost(data);
      });
    });
    fetchNestedReply().then((data) => {
      setInitialNested(data);
    });

    fetchBreadcrumbByThreadId(threadId).then(data => {
      setBreadcrumb(data)
      console.log(data)
    })
  }, [pid]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {isObjectEmpty(forumData) && (
          <div className="flex flex-row justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}
        {!isObjectEmpty(forumData) && (
          <>
            <div className="flex flex-row items-center text-xs pb-10">
              <a className="cursor-pointer" href="/">
                Home
              </a>
              <ChevronRightIcon />
              {/* TODO: replace #{num} pake week keberapa & nama week*/}
              <a className="cursor-pointer" href={"/#"+forumData.week}>
                Forum Diskusi {breadcrumb.week_name}
              </a>
              <ChevronRightIcon />
              <a className="font-bold">Thread: {forumData.title}</a>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex flex-col basis-2/3 gap-5">
                <PostComponent
                  parent
                  parentId={pid}
                  post={forumData.initial_post?.post}
                  threadId={forumData?.initial_post?.id}
                  type="initial"
                />
                {initialPost?.reply_post
                  ?.sort((prev, next) => next?.id - prev?.id)
                  .map((object, i) => (
                    <React.Fragment key={i}>
                      <PostComponent
                        post={object.post}
                        parent
                        parentId={object?.id}
                        threadId={pid}
                        type="reply"
                      />

                      {initialNested
                        ?.filter((_res) => _res?.reply_post === object?.id)
                        ?.map((_res, key) => (
                          <PostComponent
                            key={key}
                            post={{ ...object.post, ..._res.post }}
                            parent
                            parentId={_res?.id}
                            type="nestedReply"
                            threadId={pid}
                          />
                        ))}
                    </React.Fragment>
                  ))}
              </div>
              <div className="flex flex-col basis-1/3 gap-5">
                {forumData.discussion_guide &&
                  <DiscussionGuide
                    data={forumData.discussion_guide}
                    onSeeDiscussionGuide={() =>
                      router.push(forumData.id + "/discussion-guide")
                    }
                    isLecturer={isLecturer}
                  />
                }
                <References
                  references={references}
                  pid={pid}
                  refresh={() => {
                    fetchReferences().then((data) => {
                      setReferences(
                        (data ?? [])?.filter((res) => res.thread == pid)
                      );
                    });
                  }}
                />
                <DiscussionAnalytics
                  analytics={analytics}
                  reply={initialPost}
                  nestedReply={initialNested}
                />
                <DiscussionSummary
                  content={initialSummary?.content ?? ""}
                  id={initialSummary?.id ?? ""}
                />
              </div>
            </div>
            {showOnboarding &&
              <Onboarding data={onboardingData} deadline={forumData?.discussion_guide?.deadline} />
            }
          </>
        )}
      </main>
    </>
  );
}
