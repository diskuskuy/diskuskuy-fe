import React, { useState, useEffect } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "@/styles/Forum.module.css";
import DiscussionAnalytics from "@/components/Forum/DiscussionAnalytics";
import DiscussionSummary from "@/components/Forum/DiscussionSummary";
import DiscussionGuide from "@/components/Forum/DiscussionGuide";
import PostComponent from "@/components/Forum/postComponent";
import References from "@/components/Forum/References";
import Onboarding from "@/components/Forum/Onboarding";
import dataObd1 from "@/constants/obd-1";
import dataObd2 from "@/constants/obd-2";
import dataObd3 from "@/constants/obd-3";
import dataObd4 from "@/constants/obd-4";
import {
  fetchThreadDataById,
  fetchReplyDataById,
  fetchSummary,
  fetchNestedReply,
  fetchReferences,
} from "@/api/forum";
import { initialPost, replyPost, fase } from "@/api/dummy/forum";
import CircularProgress from "@mui/material/CircularProgress";
import { isObjectEmpty } from "@/utils/util";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Forum() {
  const router = useRouter();
  const { pid } = router.query;

  const inquiry =
    fase == 1
      ? dataObd1
      : fase == 2
      ? dataObd2
      : fase == 3
      ? dataObd3
      : dataObd4;

  const [forumData, setForumData] = useState({});
  const [initialPost, setInitialPost] = useState({});
  const [initialSummary, setInitialSummary] = useState({});
  const [initialNested, setInitialNested] = useState([]);
  const [references, setReferences] = useState([]);

  const handleNestedReply = () => {
    router.push("/create-post");
  };

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split("/");
    const threadId = pathArray[pathArray.length - 1];

    fetchThreadDataById(threadId).then((data) => {
      setForumData(data);
      setReferences(data?.reference_file ?? []);
      setInitialSummary(data?.summary ?? {});

      fetchReplyDataById(data?.initial_post?.id).then((data) => {
        setInitialPost(data);
      });
    });
    fetchNestedReply().then((data) => {
      setInitialNested(data);
    });
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
                Sistem Interaksi - Gasal 2020/2021
              </a>
              <ChevronRightIcon />
              {/* TODO: replace #{num} pake week keberapa & nama week*/}
              <a className="cursor-pointer" href="/#4">
                Forum Diskusi Minggu ke-1
              </a>
              <ChevronRightIcon />
              <a className="font-bold">Thread: {forumData.title}</a>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex flex-col basis-2/3 gap-5">
                <PostComponent
                  parent
                  parentId={pid}
                  post={forumData.initial_post}
                  threadId={forumData?.initial_post?.id}
                  type="initial"
                />
                {initialPost?.reply_post
                  ?.sort((prev, next) => next?.id - prev?.id)
                  .map((object, i) => (
                    <React.Fragment key={i}>
                      <PostComponent
                        post={object}
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
                            post={{ ...object, ..._res }}
                            parent
                            parentId={_res?.id}
                            type="nestedReply"
                          />
                        ))}
                    </React.Fragment>
                  ))}
              </div>
              <div className="flex flex-col basis-1/3 gap-5">
                <DiscussionGuide
                  data={forumData.discussion_guide}
                  onSeeDiscussionGuide={() =>
                    router.push(forumData.id + "/discussion-guide")
                  }
                />
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
                  reply={initialPost}
                  nestedReply={initialNested}
                />
                <DiscussionSummary
                  content={initialSummary?.content ?? ""}
                  id={initialSummary?.id ?? ""}
                />
              </div>
            </div>
            <Onboarding data={inquiry} />
          </>
        )}
      </main>
    </>
  );
}
