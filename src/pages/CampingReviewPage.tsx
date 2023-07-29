import { initializeApp } from 'firebase/app';
import {
  DataSnapshot,
  get,
  getDatabase,
  off,
  push,
  ref,
  set,
} from 'firebase/database';
import { throttle } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useSelectedDataContext } from '../store/SelectedItemsContext';
import UserContext from '../store/UserContext';
import styles from './CampingReviewPage.module.css';

interface Comment {
  nickname: string;
  content: string;
  date: string;
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseUrl: process.env.REACT_APP_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

export default function CampingReviewPage() {
  const [commentInput, setCommentInput] = useState('');
  const { user } = useContext(UserContext);
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');

  const commentsPerPage = 5;

  const { selectedData } = useSelectedDataContext();

  const addComment = (comment: string, userDisplayName: string | undefined) => {
    if (userDisplayName && selectedData?.contentId) {
      const newCommentRef = push(
        ref(database, `comments/${selectedData.contentId}`),
      );
      set(newCommentRef, {
        nickname: userDisplayName,
        content: comment,
        date: new Date().toISOString(),
      });
    }
  };

  // 댓글을 가져오는 함수
  const getComments = async (
    startIndex: number,
    commentsPerPage: number,
    setVisibleComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  ) => {
    if (selectedData?.contentId) {
      const snapshot = await get(
        ref(database, `comments/${selectedData.contentId}`),
      );
      const comments: Comment[] = [];
      snapshot.forEach((childSnapshot: DataSnapshot) => {
        const comment = childSnapshot.val() as Comment;
        comments.push(comment);
      });

      // 댓글을 날짜 기준으로 내림차순으로 정렬
      comments.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      // startIndex와 commentsPerPage를 사용하여 보여줄 댓글을 slice
      const visibleCommentsSlice = comments.slice(
        startIndex,
        startIndex + commentsPerPage,
      );

      // 가져온 댓글을 visibleComments 상태에 업데이트
      setVisibleComments((prevComments) => {
        const existingComments = prevComments.filter(
          (comment) =>
            !visibleCommentsSlice.find((c) => c.date === comment.date),
        );
        return [...existingComments, ...visibleCommentsSlice];
      });
    }
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const convertDateToValidPath = (date: string) => {
    return date.replace(/[.:]/g, '_');
  };

  useEffect(() => {
    // 페이지 로드 시 댓글 데이터를 가져와서 설정
    getComments(0, commentsPerPage, setVisibleComments);

    return () => {
      // 컴포넌트가 언마운트 될 때 이벤트 리스너를 해제
      if (selectedData?.contentId) {
        const commentsRef = ref(database, `comments/${selectedData.contentId}`);
        off(commentsRef);
      }
    };
  }, [selectedData, commentsPerPage]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim() !== '') {
      addComment(commentInput, user?.displayName);
      setCommentInput('');

      // 새로운 댓글을 추가하고 실시간으로 화면에 표시
      const newComment: Comment = {
        nickname: user?.displayName || '',
        content: commentInput,
        date: new Date().toISOString(),
      };
      setVisibleComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const handleEditComment = (commentId: string, content: string) => {
    // 수정할 댓글 아이디와 내용을 상태로 설정하여 수정 폼을 렌더링
    setEditCommentId(commentId);
    setEditedComment(content);
  };

  const handleCancelEdit = () => {
    // 수정 취소 시 상태 초기화
    setEditCommentId(null);
    setEditedComment('');
  };

  const handleSaveEdit = (commentId: string) => {
    if (editedComment.trim() !== '') {
      // 수정된 댓글을 저장하고 상태 초기화
      const convertedCommentId = convertDateToValidPath(commentId);
      const commentRef = ref(database, `comments/${convertedCommentId}`);
      set(commentRef, {
        ...visibleComments.find((comment) => comment.date === commentId),
        content: editedComment,
      });

      // 상태에 있는 댓글 목록도 업데이트
      setVisibleComments((prevComments) =>
        prevComments.map((comment) =>
          comment.date === commentId
            ? { ...comment, content: editedComment }
            : comment,
        ),
      );

      handleCancelEdit();
    }
  };

  const handleDeleteComment = (commentId: string) => {
    // commentId를 유효한 경로로 변환
    const convertedCommentId = convertDateToValidPath(commentId);

    // Firebase에서 댓글을 삭제
    const commentRef = ref(database, `comments/${convertedCommentId}`);
    set(commentRef, null).then(() => {
      // 삭제한 댓글을 클라이언트 상태에서도 삭제
      setVisibleComments((prevComments) =>
        prevComments.filter((comment) => comment.date !== commentId),
      );
    });

    // 추가 댓글을 불러오도록 handleScroll 함수 호출
    handleScroll();
  };

  const handleScroll = throttle(() => {
    // 스크롤을 감지하여 하단에 도달하면 추가 댓글을 불러옴
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight * 0.95
    ) {
      getComments(startIndex, commentsPerPage, setVisibleComments);
      setStartIndex((prevStartIndex) => prevStartIndex + commentsPerPage);
    }
  }, 1000);

  useEffect(() => {
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 컴포넌트가 언마운트 될 때 이벤트 리스너를 해제
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startIndex, handleScroll]);

  return (
    <div className={`${styles.reviewContainer} rounded mb-5`}>
      <h5 className="mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-signpost bg-warning rounded"
          viewBox="0 0 16 16"
        >
          <path d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0zM12.532 5l1.666 2-1.666 2H2V5h10.532z" />
        </svg>{' '}
        캠핑장 후기를 남겨주세요!
      </h5>
      <div className="form-floating">
        <textarea
          style={{ height: '200px' }}
          className={`form-control`}
          placeholder="여기에 후기를 작성해주세요."
          id="floatingTextarea"
          value={commentInput}
          onChange={handleCommentChange}
          disabled={!user}
        ></textarea>
        <label htmlFor="floatingTextarea">
          {user
            ? '여기에 후기를 작성해주세요.'
            : '후기 작성을 위해 로그인을 해주세요.'}
        </label>
      </div>
      <div className={styles.commentBtnWrapper}>
        <button
          type="button"
          className={`btn btn-secondary btn-lg mt-3 fw-bold`}
          onClick={handleCommentSubmit}
          disabled={!user}
        >
          등록하기
        </button>
      </div>

      <hr />

      {/* 등록된 댓글 화면에 뿌려주기 */}
      {visibleComments.map((comment) => (
        <div key={comment.date}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat-heart me-2"
              viewBox="0 0 16 16"
            >
              {/* ... */}
            </svg>
            <span>
              닉네임 :{' '}
              <span className="fw-semibold fs-5">{comment.nickname}</span> 님
            </span>

            <span className="ms-3">작성일 : {formatDate(comment.date)}</span>

            {/* 댓글 작성자 본인인 경우 수정과 삭제 버튼 보이기 */}
            {user?.displayName === comment.nickname && (
              <div className="ms-3 d-inline-block">
                <button
                  type="button"
                  className="btn btn-sm btn-link text-secondary"
                  onClick={() =>
                    handleEditComment(comment.date, comment.content)
                  }
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-link text-danger"
                  onClick={() => handleDeleteComment(comment.date)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <div
            key={comment.date}
            className={`${styles.facilityListContainer} mb-4 mt-3 bg-white rounded border border-secondary p-2`}
          >
            {/* 댓글 수정 폼 렌더링 */}
            {editCommentId === comment.date ? (
              <>
                <textarea
                  style={{ height: '100px' }}
                  className={`form-control mb-2`}
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                ></textarea>
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary me-2 fw-semibold"
                    onClick={() => handleSaveEdit(comment.date)}
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary fw-semibold"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <p className="m-0 p-2">{comment.content}</p>
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
